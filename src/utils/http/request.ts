import axios from 'axios'

import axiosCanceler from './cancel'
import loadingManager from './loading'
import errorHandler from './error-handler'
import tokenManager from './token-manage'
import toastManager from './toast'
import networkManager from './network'

import type {
  BaseResponse,
  CustomAxiosRequestConfig,
  CustomInternalAxiosRequestConfig,
  PendingRequest,
  RequestOptions,
} from './types'

import type { AxiosError, AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios'

/**
 * HTTP请求类
 * 企业级axios二次封装
 */
class Request {
  private axiosInstance: AxiosInstance

  // 使用正确的类型定义
  private defaultConfig: CreateAxiosDefaults & {
    requestOptions?: RequestOptions
  } = {
      baseURL: import.meta.env.VITE_GLOB_API_URL || '/api',
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      requestOptions: {
        showLoading: true,
        loadingText: '加载中...',
        cancelRepeatRequest: true,
        autoRefreshToken: true,
        handleErrorStatus: true,
        showErrorMessage: true,
        queueWhenOffline: true,
        retryWhenOnline: true,
        retryCount: 0,
        retryDelay: 1000,
      },
    }

  /**
   * 创建HTTP请求实例
   * @param config 自定义配置，会与默认配置合并
   */
  constructor(config: CustomAxiosRequestConfig = {}) {
    // 创建axios实例并合并配置
    this.axiosInstance = axios.create({
      ...this.defaultConfig,
      ...config,
      headers: {
        ...this.defaultConfig.headers,
        ...config.headers,
      },
      requestOptions: {
        ...this.defaultConfig.requestOptions,
        ...config.requestOptions,
      },
    } as CreateAxiosDefaults)

    // 初始化拦截器
    this.setupInterceptors()

    // 监听网络状态变化
    this.setupNetworkListener()
  }

  /**
   * 设置网络状态监听
   */
  private setupNetworkListener(): void {
    networkManager.addStatusChangeListener((status) => {
      if (status === 'online') {
        // 网络恢复时可以执行一些操作，比如重试失败的请求
        console.log('Network is back online')
      }
      else if (status === 'offline') {
        // 网络断开时可以执行一些操作
        console.log('Network is offline')
        // 可以选择是否关闭所有loading
        loadingManager.forceHide()
      }
    })
  }

  /**
   * 设置请求和响应拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: CustomInternalAxiosRequestConfig) => {
        const requestOptions = config.requestOptions || this.defaultConfig.requestOptions

        // 检查网络状态，如果离线且配置了离线队列，则加入队列
        if (networkManager.getStatus() === 'offline' && requestOptions?.queueWhenOffline) {
          // 返回一个新的Promise，将请求放入离线队列
          return new Promise((resolve, reject) => {
            const pendingRequest: PendingRequest = {
              config,
              resolve,
              reject,
            }
            networkManager.addToOfflineQueue(pendingRequest)
          }) as any
        }

        // 显示loading
        if (requestOptions?.showLoading) {
          loadingManager.show(requestOptions)
        }

        // 取消重复请求
        if (requestOptions?.cancelRepeatRequest) {
          axiosCanceler.addPending(config)
        }

        // 添加token到请求头
        const token = tokenManager.getAccessToken()
        if (token) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token}`
        }

        // 禁用浏览器缓存
        if (config.method?.toUpperCase() === 'GET') {
          config.params = {
            ...config.params,
            _t: new Date().getTime(),
          }
        }

        // 如果token即将过期，尝试刷新
        if (tokenManager.isTokenExpiringSoon() && requestOptions?.autoRefreshToken) {
          // 这里不等待，让刷新token在后台进行
          this.refreshTokenInBackground()
        }

        return config
      },
      (error: AxiosError) => {
        loadingManager.forceHide()
        return Promise.reject(error)
      },
    )

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const config = response.config as CustomInternalAxiosRequestConfig
        const requestOptions = config.requestOptions || this.defaultConfig.requestOptions

        // 在响应处理完成后，移除pending中的请求
        if (requestOptions?.cancelRepeatRequest) {
          axiosCanceler.removePending(config)
        }

        // 请求完成，隐藏loading
        if (requestOptions?.showLoading) {
          loadingManager.hide()
        }

        // 处理文件下载
        const contentType = response.headers['content-type']
        if (
          contentType?.includes('application/octet-stream')
          || contentType?.includes('application/vnd.ms-excel')
          || contentType?.includes('application/vnd.openxmlformats-officedocument')
          || contentType?.includes('application/pdf')
        ) {
          return response
        }

        // 业务状态码处理
        if (response.data && requestOptions?.handleErrorStatus) {
          const { code, message } = response.data as BaseResponse
          // 假设业务状态码200代表成功
          if (code !== 200 && code !== 0) {
            errorHandler.handleBusinessError(
              code,
              message,
              requestOptions.showErrorMessage,
            )
            return Promise.reject(new Error(message))
          }
        }

        return response.data
      },
      async (error: AxiosError) => {
        const config = error.config as CustomInternalAxiosRequestConfig

        // 如果没有config，说明请求没有发出去
        if (!config) {
          loadingManager.forceHide()
          return Promise.reject(error)
        }

        const requestOptions = config.requestOptions || this.defaultConfig.requestOptions

        // 移除pending中的请求
        if (config && requestOptions?.cancelRepeatRequest) {
          axiosCanceler.removePending(config)
        }

        // 隐藏loading
        if (requestOptions?.showLoading) {
          loadingManager.hide()
        }

        // 处理请求重试逻辑
        const retryCount = config.retryCount || 0
        const maxRetries = requestOptions?.retryCount || 0

        // 如果配置了重试且未达到最大重试次数
        if (maxRetries > 0 && retryCount < maxRetries) {
          // 增加重试计数
          const newConfig = {
            ...config,
            retryCount: retryCount + 1,
          }

          // 延迟指定时间后重试
          const delay = requestOptions?.retryDelay || 1000
          await new Promise(resolve => setTimeout(resolve, delay))
          // @ts-ignore
          console.log(`Retrying request (${retryCount + 1}/${maxRetries}): ${config.url}`)
          return this.axiosInstance(newConfig)
        }

        // 处理401错误，尝试刷新Token
        if (
          error.response?.status === 401
          && requestOptions?.autoRefreshToken
          && tokenManager.getRefreshToken()
        ) {
          // 尝试刷新token并重试请求
          try {
            const newToken = await this.refreshToken()
            if (newToken && config) {
              config.headers = config.headers || {}
              config.headers.Authorization = `Bearer ${newToken}`
              // 重新发送请求
              return this.axiosInstance(config)
            }
          }
          catch (refreshError) {
            return Promise.reject(refreshError)
          }
        }

        if (error.response && requestOptions?.handleErrorStatus) {
          // HTTP状态码错误处理
          errorHandler.handleStatusError(
            error.response.status,
            (error.response.data as any)?.message || error.message,
            requestOptions.showErrorMessage,
          )
        }
        else if (error.request) {
          // 请求已发送但没有收到响应
          errorHandler.handleNetworkError(error, requestOptions?.showErrorMessage)
        }
        else {
          // 其他错误
          if (requestOptions?.showErrorMessage) {
            toastManager.error(error.message || '发生未知错误')
          }
          console.error('[Request Error]:', error)
        }

        return Promise.reject(error)
      },
    )
  }

  /**
   * 在后台刷新token，不影响当前请求
   */
  private async refreshTokenInBackground(): Promise<void> {
    try {
      await this.refreshToken()
    }
    catch (error) {
      console.error('Background token refresh failed:', error)
    }
  }

  /**
   * 刷新token的实现
   */
  private async refreshToken(): Promise<string> {
    return tokenManager.refreshToken(async (refreshToken) => {
      // 使用axios直接发送请求，而不是通过this.axiosInstance
      // 避免触发拦截器导致的死循环
      const response = await axios.post<BaseResponse<any>>(
        '/api/auth/refresh-token',
        { refreshToken },
        {
          baseURL: this.defaultConfig.baseURL,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response.data
    })
  }

  /**
   * 发送请求的通用方法
   * @param config 请求配置
   */
  public async request<T = any>(config: CustomAxiosRequestConfig): Promise<T> {
    return this.axiosInstance.request<any, T>(config)
  }

  /**
   * GET请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 其他配置
   */
  public async get<T = any>(
    url: string,
    params?: any,
    config?: CustomAxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url,
      params,
      ...config,
    })
  }

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 其他配置
   */
  public async post<T = any>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
      ...config,
    })
  }

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 其他配置
   */
  public async put<T = any>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
      ...config,
    })
  }

  /**
   * DELETE请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 其他配置
   */
  public async delete<T = any>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      url,
      data,
      params: config?.params,
      ...config,
    })
  }

  /**
   * 上传文件
   * @param url 上传地址
   * @param file 文件对象或FormData
   * @param config 其他配置
   */
  public async upload<T = any>(
    url: string,
    file: File | FormData,
    config?: CustomAxiosRequestConfig,
  ): Promise<T> {
    let formData: FormData

    if (file instanceof FormData) {
      formData = file
    }
    else {
      formData = new FormData()
      formData.append('file', file)
    }

    return this.request<T>({
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    })
  }

  /**
   * 批量上传文件
   * @param url 上传地址
   * @param files 文件数组
   * @param fileField 文件字段名
   * @param config 其他配置
   */
  public async uploadMultiple<T = any>(
    url: string,
    files: File[],
    fileField: string = 'files',
    config?: CustomAxiosRequestConfig,
  ): Promise<T> {
    const formData = new FormData()

    files.forEach((file, index) => {
      formData.append(`${fileField}[${index}]`, file)
    })

    return this.upload<T>(url, formData, config)
  }

  /**
   * 下载文件
   * @param url 下载地址
   * @param params 请求参数
   * @param config 其他配置
   */
  public async download(
    url: string,
    params?: any,
    config?: CustomAxiosRequestConfig,
  ): Promise<Blob> {
    const fileName = config?.requestOptions?.fileName

    const response = await this.axiosInstance.request({
      method: 'GET',
      url,
      params,
      responseType: 'blob',
      ...config,
    })

    const blob = new Blob([response.data])

    // 获取文件名
    let downloadFileName = fileName
    if (!downloadFileName) {
      const contentDisposition = response.headers['content-disposition']
      if (contentDisposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        const matches = filenameRegex.exec(contentDisposition)
        if (matches != null && matches[1]) {
          downloadFileName = matches[1].replace(/['"]/g, '')
          // 解码文件名
          try {
            downloadFileName = decodeURIComponent(downloadFileName)
          }
          catch (e) {
            console.warn('文件名解码失败', e)
            // 解码失败时使用原始文件名
          }
        }
      }
      downloadFileName = downloadFileName || 'download'
    }

    // 创建下载链接
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = downloadFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 释放URL对象
    setTimeout(() => {
      window.URL.revokeObjectURL(downloadUrl)
    }, 100)

    return blob
  }

  /**
   * 直接导出Excel文件
   * @param url 导出地址
   * @param params 请求参数
   * @param fileName 文件名
   */
  public async exportExcel(
    url: string,
    params?: any,
    fileName: string = 'export.xlsx',
  ): Promise<Blob> {
    return this.download(url, params, {
      requestOptions: {
        fileName,
        showLoading: true,
        loadingText: '正在导出数据，请稍候...',
      },
    })
  }

  /**
   * 取消所有请求
   * @param message 取消原因
   */
  public cancelAllRequests(message: string = 'Request canceled'): void {
    console.log('取消所有请求', message)
    axiosCanceler.clearPending()
  }

  /**
   * 清空离线请求队列
   */
  public clearOfflineQueue(): void {
    networkManager.clearOfflineQueue()
  }
}

export default Request
