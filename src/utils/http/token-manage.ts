import { CustomAxiosRequestConfig } from './types'
import toastManager from './toast'

import type { BaseResponse } from './types'

export interface TokenInfo {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType?: string
}

/**
 * Token管理类
 * 处理token的存储、刷新和过期处理
 */
class TokenManager {
  private TOKEN_KEY = 'AUTH_TOKEN'
  private REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'
  private TOKEN_EXPIRES_KEY = 'TOKEN_EXPIRES_AT'

  private isRefreshing = false
  private refreshSubscribers: Array<(token: string) => void> = []

  /**
   * 设置token信息
   * @param tokenInfo 令牌信息对象
   */
  public setToken(tokenInfo: TokenInfo): void {
    localStorage.setItem(this.TOKEN_KEY, tokenInfo.accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokenInfo.refreshToken)

    // 计算过期时间并存储
    const expiresAt = Date.now() + tokenInfo.expiresIn * 1000
    localStorage.setItem(this.TOKEN_EXPIRES_KEY, expiresAt.toString())
  }

  /**
   * 获取访问令牌
   */
  public getAccessToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || ''
  }

  /**
   * 获取刷新令牌
   */
  public getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) || ''
  }

  /**
   * 清除令牌
   */
  public clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    localStorage.removeItem(this.TOKEN_EXPIRES_KEY)
  }

  /**
   * 检查令牌是否即将过期 (提前5分钟)
   */
  public isTokenExpiringSoon(): boolean {
    const expiresAt = Number(localStorage.getItem(this.TOKEN_EXPIRES_KEY) || 0)
    // 如果token将在5分钟内过期，则视为即将过期
    return expiresAt ? Date.now() > expiresAt - 5 * 60 * 1000 : false
  }

  /**
   * 添加token刷新订阅者
   * @param callback token刷新后的回调
   */
  public subscribeTokenRefresh(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback)
  }

  /**
   * 通知所有订阅者token已刷新
   * @param token 新token
   */
  private onRefreshed(token: string): void {
    this.refreshSubscribers.forEach(callback => callback(token))
    this.refreshSubscribers = []
  }

  /**
   * 刷新token
   * @param refreshRequest 刷新token的请求函数
   */
  public async refreshToken(
    refreshRequest: (token: string) => Promise<BaseResponse<TokenInfo>>,
  ): Promise<string> {
    // 如果已经在刷新中，返回一个promise等待刷新完成
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.subscribeTokenRefresh(resolve)
      })
    }

    this.isRefreshing = true

    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      // 使用传入的刷新token方法
      const response = await refreshRequest(refreshToken)

      if (response.code === 200 && response.data) {
        this.setToken(response.data)

        // 通知所有等待token刷新的请求
        this.onRefreshed(response.data.accessToken)
        return response.data.accessToken
      }
      else {
        throw new Error(response.message || 'Token refresh failed')
      }
    }
    catch (error) {
      // 刷新失败，清除token
      this.clearToken()
      console.error('Token refresh failed', error)
      // 显示错误提示并跳转登录
      toastManager.error('登录已过期，请重新登录')

      // 延迟跳转，让用户看到提示
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)

      return ''
    }
    finally {
      this.isRefreshing = false
    }
  }
}

export default new TokenManager()
