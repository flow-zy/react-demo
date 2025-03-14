import axios from 'axios'

import toastManager from './toast'
import networkManager from './network'

import type { AxiosError } from 'axios'

/**
 * 错误处理类
 * 统一处理各种HTTP错误、业务错误和网络错误
 */
class ErrorHandler {
  /**
   * 处理HTTP状态码错误
   * @param status HTTP状态码
   * @param message 错误消息
   * @param showErrorMessage 是否显示错误提示
   */
  public handleStatusError(
    status: number,
    message: string,
    showErrorMessage: boolean = true,
  ): void {
    // HTTP状态码对应的默认错误消息
    const statusMap: Record<number, string> = {
      400: '请求参数错误',
      401: '未授权，请重新登录',
      403: '拒绝访问',
      404: '请求地址不存在',
      405: '请求方法不允许',
      408: '请求超时',
      409: '资源冲突',
      410: '资源已删除',
      413: '请求实体过大',
      429: '请求过于频繁',
      500: '服务器内部错误',
      501: '服务未实现',
      502: '网关错误',
      503: '服务不可用',
      504: '网关超时',
    }

    const errorMessage = statusMap[status] || message || `Unknown error (${status})`

    // 根据配置决定是否显示错误提示
    if (showErrorMessage) {
      toastManager.error(errorMessage)
    }

    // 记录错误到控制台
    console.error(`[HTTP Error ${status}]: ${errorMessage}`)
  }

  /**
   * 处理业务错误码
   * @param code 业务错误码
   * @param message 错误消息
   * @param showErrorMessage 是否显示错误提示
   */
  public handleBusinessError(
    code: number,
    message: string,
    showErrorMessage: boolean = true,
  ): void {
    // 业务错误码处理
    const businessErrorMap: Record<number, string> = {
      10001: '用户不存在',
      10002: '密码错误',
      10003: '账号已被禁用',
      10004: '权限不足',
      20001: '数据不存在',
      20002: '操作失败',
      30001: '系统繁忙，请稍后再试',
      // ... 其他业务错误码
    }

    const errorMessage = businessErrorMap[code] || message || `未知业务错误 (${code})`

    if (showErrorMessage) {
      toastManager.error(errorMessage)
    }

    console.error(`[Business Error ${code}]: ${errorMessage}`)
  }

  /**
   * 处理网络错误
   * @param error Axios错误对象
   * @param showErrorMessage 是否显示错误提示
   */
  public handleNetworkError(
    error: AxiosError,
    showErrorMessage: boolean = true,
  ): void {
    // 如果已知网络离线，不再显示错误
    if (networkManager.getStatus() === 'offline') {
      return
    }

    let message = '网络连接异常，请检查您的网络'

    if (error.message.includes('timeout')) {
      message = '网络请求超时，请稍后重试'
    }
    else if (error.message.includes('Network Error')) {
      message = '网络连接异常，请检查您的网络'
    }
    else if (error.message.includes('canceled')) {
      // 请求被取消，通常不需要提示用户
      return
    }
    else if (error.message.includes('aborted')) {
      // 请求被中止，通常不需要提示用户
      return
    }

    if (showErrorMessage) {
      toastManager.error(message)
    }

    console.error('[Network Error]:', error)
  }

  /**
   * 全局错误处理函数
   * @param error 任何类型的错误
   * @param showErrorMessage 是否显示错误提示
   */
  public handleError(error: any, showErrorMessage: boolean = true): void {
    if (axios.isAxiosError(error)) {
      // Axios错误
      if (error.response) {
        // 服务器返回了错误状态码
        this.handleStatusError(
          error.response.status,
          (error.response.data as any)?.message || error.message,
          showErrorMessage,
        )
      }
      else {
        // 网络错误
        this.handleNetworkError(error, showErrorMessage)
      }
    }
    else {
      // 普通JS错误
      const message = error?.message || '发生未知错误'
      if (showErrorMessage) {
        toastManager.error(message)
      }
      console.error('[Error]:', error)
    }
  }
}

export default new ErrorHandler()
