import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

/**
 * 请求配置选项接口，提供了更细粒度的控制
 */
export interface RequestOptions {
  // 是否显示loading，默认：true
  showLoading?: boolean
  // loading的文本，默认：'加载中...'
  loadingText?: string
  // loading的配置
  loadingOptions?: {
    lock?: boolean
    background?: string
    fullscreen?: boolean
  }
  // 是否允许取消重复请求，默认：true
  cancelRepeatRequest?: boolean
  // 是否自动刷新token，默认：true
  autoRefreshToken?: boolean
  // 是否需要处理状态码，默认：true
  handleErrorStatus?: boolean
  // 是否显示错误提示，默认：true
  showErrorMessage?: boolean
  // 下载文件时的文件名
  fileName?: string
  // 自定义错误处理函数
  errorHandler?: (error: any) => void
  // 请求超时时间(ms)，默认：15000
  timeout?: number
  // 是否在断网时加入请求队列，默认：true
  queueWhenOffline?: boolean
  // 在断网恢复后是否自动重试，默认：true
  retryWhenOnline?: boolean
  // 失败自动重试次数，默认：0（不重试）
  retryCount?: number
  // 重试间隔(ms)，默认：1000
  retryDelay?: number
}

/**
 * 扩展AxiosRequestConfig，添加自定义配置
 */
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions
}

/**
 * 扩展InternalAxiosRequestConfig，添加内部使用的字段
 */
export interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requestOptions?: RequestOptions
  requestId?: string // 用于标识请求，取消重复请求时使用
  retryCount?: number // 当前已重试次数
}

/**
 * 基础响应格式
 */
export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

/**
 * 网络状态类型
 */
export type NetworkStatus = 'online' | 'offline' | 'unknown'

/**
 * 待处理的离线请求
 */
export interface PendingRequest {
  config: CustomAxiosRequestConfig
  resolve: (value: any) => void
  reject: (reason?: any) => void
}

// 请求选项类型
export interface RequestOptions {
  showLoading?: boolean
  loadingText?: string
  cancelRepeatRequest?: boolean
  autoRefreshToken?: boolean
  handleErrorStatus?: boolean
  showErrorMessage?: boolean
  queueWhenOffline?: boolean
  retryWhenOnline?: boolean
  retryCount?: number
  retryDelay?: number
  fileName?: string
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * 自定义请求选项
     */
    requestOptions?: RequestOptions
  }
}
