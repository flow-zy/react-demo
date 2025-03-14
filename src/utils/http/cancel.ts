import type { CustomInternalAxiosRequestConfig } from './types'

/**
 * 请求取消控制器类
 * 用于管理和取消重复或未完成的请求
 */
class AxiosCanceler {
  // 存储请求与取消令牌的Map
  private pendingMap = new Map<string, AbortController>()

  /**
   * 生成请求的唯一标识
   * @param config 请求配置
   * @returns 唯一标识字符串
   */
  private generateRequestKey(config: CustomInternalAxiosRequestConfig): string {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  /**
   * 添加请求到pendingMap
   * @param config 请求配置
   */
  public addPending(config: CustomInternalAxiosRequestConfig): void {
    // 先尝试移除同样的请求
    this.removePending(config)
    const requestKey = this.generateRequestKey(config)
    const controller = new AbortController()

    config.signal = controller.signal
    config.requestId = requestKey

    if (!this.pendingMap.has(requestKey)) {
      this.pendingMap.set(requestKey, controller)
    }
  }

  /**
   * 移除请求从pendingMap
   * @param config 请求配置
   */
  public removePending(config: CustomInternalAxiosRequestConfig): void {
    const requestKey = this.generateRequestKey(config)
    if (this.pendingMap.has(requestKey)) {
      const controller = this.pendingMap.get(requestKey)
      controller?.abort('Request canceled due to duplicate request')
      this.pendingMap.delete(requestKey)
    }
  }

  /**
   * 清除所有pending请求
   */
  public clearPending(): void {
    this.pendingMap.forEach((controller) => {
      controller.abort('Request canceled due to application state change')
    })
    this.pendingMap.clear()
  }

  /**
   * 获取当前pending请求数量
   */
  public getPendingCount(): number {
    return this.pendingMap.size
  }
}

export default new AxiosCanceler()
