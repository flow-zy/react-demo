import toastManager from './toast'

import type { NetworkStatus, PendingRequest } from './types'

/**
 * 网络状态管理类
 * 用于监测网络状态变化，管理离线请求队列
 */
class NetworkManager {
  // 当前网络状态
  private status: NetworkStatus = navigator.onLine ? 'online' : 'offline'
  // 离线请求队列
  private offlineQueue: PendingRequest[] = []
  // 网络状态变化监听器集合
  private listeners: Set<(status: NetworkStatus) => void> = new Set()
  // 是否已初始化
  private initialized = false

  constructor() {
    this.init()
  }

  /**
   * 初始化网络监听
   */
  private init(): void {
    if (this.initialized)
      return

    // 添加网络状态监听
    window.addEventListener('online', this.handleOnline.bind(this))
    window.addEventListener('offline', this.handleOffline.bind(this))

    this.initialized = true
  }

  /**
   * 处理网络恢复在线
   */
  private handleOnline(): void {
    const prevStatus = this.status
    this.status = 'online'

    // 网络状态变化时通知订阅者
    if (prevStatus !== this.status) {
      this.notifyStatusChange()

      // 恢复在线后，处理离线请求队列
      if (this.offlineQueue.length > 0) {
        toastManager.info(`网络已恢复，正在处理 ${this.offlineQueue.length} 个待处理请求...`)
        this.processOfflineQueue()
      }
      else {
        toastManager.success('网络已恢复连接')
      }
    }
  }

  /**
   * 处理网络离线
   */
  private handleOffline(): void {
    const prevStatus = this.status
    this.status = 'offline'

    // 网络状态变化时通知订阅者
    if (prevStatus !== this.status) {
      this.notifyStatusChange()
      toastManager.error('网络已断开，请检查您的网络连接', {
        duration: 0, // 不自动关闭
      })
    }
  }

  /**
   * 通知所有状态变化监听器
   */
  private notifyStatusChange(): void {
    this.listeners.forEach((listener) => {
      listener(this.status)
    })
  }

  /**
   * 处理离线请求队列
   */
  private async processOfflineQueue(): Promise<void> {
    if (this.status !== 'online' || this.offlineQueue.length === 0)
      return

    const queue = [...this.offlineQueue]
    this.offlineQueue = []

    // 逐个处理队列中的请求
    for (const item of queue) {
      try {
        // 这里不直接使用axios，而是通过resolve回调将控制权还给原请求处理流程
        const response = await fetch(item.config.url || '', {
          method: item.config.method,
          headers: item.config.headers as any,
          body: item.config.data ? JSON.stringify(item.config.data) : undefined,
        }).then(res => res.json())

        item.resolve(response)
      }
      catch (error) {
        item.reject(error)
      }
    }
  }

  /**
   * 添加网络状态变化监听器
   * @param listener 状态变化回调函数
   */
  public addStatusChangeListener(listener: (status: NetworkStatus) => void): void {
    this.listeners.add(listener)
  }

  /**
   * 移除网络状态变化监听器
   * @param listener 要移除的监听器
   */
  public removeStatusChangeListener(listener: (status: NetworkStatus) => void): void {
    this.listeners.delete(listener)
  }

  /**
   * 获取当前网络状态
   */
  public getStatus(): NetworkStatus {
    return this.status
  }

  /**
   * 添加请求到离线队列
   * @param request 请求对象
   */
  public addToOfflineQueue(request: PendingRequest): void {
    this.offlineQueue.push(request)
    toastManager.warning(`网络离线中，请求已加入队列，恢复网络后将自动发送 (${this.offlineQueue.length})`)
  }

  /**
   * 清空离线请求队列
   */
  public clearOfflineQueue(): void {
    this.offlineQueue.forEach((item) => {
      item.reject(new Error('Offline request queue cleared'))
    })
    this.offlineQueue = []
  }

  /**
   * 获取离线队列长度
   */
  public getOfflineQueueLength(): number {
    return this.offlineQueue.length
  }
}

export default new NetworkManager()
