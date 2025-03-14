import React from 'react'
import ReactDOM from 'react-dom'

import { Spin } from 'antd'

import type { SpinProps } from 'antd'

import type { RequestOptions } from './types'

// 全屏容器样式
const fullscreenStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

/**
 * Ant Design 版 Loading 管理类
 * 支持多请求计数、防闪烁、全屏/局部加载等特性
 */
class AntLoadingManager {
  private count = 0
  private container: HTMLDivElement | null = null
  private defaultOptions: SpinProps & { background?: string } = {
    tip: '加载中...',
    size: 'large',
    background: 'rgba(0, 0, 0, 0.5)',
    fullscreen: true,
  }

  private renderSpin(options: SpinProps & { background?: string, fullscreen?: boolean }) {
    const spinElement = (
      <Spin {...options}>
        {/* 自定义遮罩层 */}
        {options.fullscreen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: options.background,
            zIndex: 9998,
          }}
          />
        )}
      </Spin>
    )

    return options.fullscreen
      ? (
          <div style={fullscreenStyle}>{spinElement}</div>
        )
      : spinElement
  }

  /**
   * 显示加载状态
   * @param options 支持 AntD Spin 配置及扩展参数
   */
  public show(options?: RequestOptions): void {
    if (this.count === 0) {
      this.container = document.createElement('div')
      document.body.appendChild(this.container)

      const loadingOptions = {
        ...this.defaultOptions,
        ...options?.loadingOptions,
        tip: options?.loadingText || this.defaultOptions.tip,
        background: options?.loadingOptions?.background || this.defaultOptions.background,
        fullscreen: options?.loadingOptions?.fullscreen ?? this.defaultOptions.fullscreen,
      }

      ReactDOM.render(this.renderSpin(loadingOptions), this.container)
    }
    this.count++
  }

  /**
   * 隐藏加载状态（延迟关闭防闪烁）
   */
  public hide(): void {
    if (this.count <= 0)
      return

    this.count--
    if (this.count === 0 && this.container) {
      setTimeout(() => {
        if (this.count === 0 && this.container) {
          ReactDOM.unmountComponentAtNode(this.container)
          document.body.removeChild(this.container)
          this.container = null
        }
      }, 300)
    }
  }

  /**
   * 强制立即关闭所有加载状态
   */
  public forceHide(): void {
    if (this.container) {
      this.count = 0
      ReactDOM.unmountComponentAtNode(this.container)
      document.body.removeChild(this.container)
      this.container = null
    }
  }

  /**
   * 当前加载状态
   */
  public isLoading(): boolean {
    return this.count > 0
  }
}

export default new AntLoadingManager()
