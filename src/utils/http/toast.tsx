import { message, Modal } from 'antd'

import type { ArgsProps, NoticeType } from 'antd/es/message/interface'
import type { ModalFuncProps } from 'antd/es/modal/interface'

/**
 * 增强型消息配置类型
 */
type EnhancedMessageConfig = Partial<ArgsProps> & {
  maxCount?: number // 全局最大显示数量
}

/**
 * Ant Design 版消息管理类
 */
class AntToastManager {
  // 初始化全局配置
  constructor() {
    message.config({
      maxCount: 3, // 默认最大显示3条消息
      duration: 3, // 默认3秒
      top: 24, // 消息位置顶部距离
    })
  }

  /**
   * 基础消息显示方法
   */
  private showBase(
    type: NoticeType,
    content: React.ReactNode,
    config?: EnhancedMessageConfig,
  ): void {
    // 更新全局配置
    if (config?.maxCount) {
      message.config({ maxCount: config.maxCount })
    }

    message.open({
      type,
      content,
      duration: config?.duration,
      key: config?.key,
      className: config?.className,
      style: config?.style,
      onClose: config?.onClose,
    })
  }

  /**
   * 显示成功消息
   */
  public success(
    content: React.ReactNode,
    config?: Omit<EnhancedMessageConfig, 'type'>,
  ): void {
    this.showBase('success', content, config)
  }

  /**
   * 显示错误消息
   */
  public error(
    content: React.ReactNode,
    config?: Omit<EnhancedMessageConfig, 'type'>,
  ): void {
    this.showBase('error', content, { duration: 5, ...config })
  }

  /**
   * 显示警告消息
   */
  public warning(
    content: React.ReactNode,
    config?: Omit<EnhancedMessageConfig, 'type'>,
  ): void {
    this.showBase('warning', content, config)
  }

  /**
   * 显示信息消息
   */
  public info(
    content: React.ReactNode,
    config?: Omit<EnhancedMessageConfig, 'type'>,
  ): void {
    this.showBase('info', content, config)
  }

  /**
   * 显示确认对话框
   */
  public async confirm(
    content: React.ReactNode,
    title: string = '提示',
    options: ModalFuncProps = {},
  ): Promise<boolean> {
    return new Promise((resolve) => {
      Modal.confirm({
        title,
        content,
        okText: '确认',
        cancelText: '取消',
        centered: true,
        maskClosable: false,
        ...options,
        onOk: () => {
          options.onOk?.()
          resolve(true)
        },
        onCancel: () => {
          options.onCancel?.()
          resolve(false)
        },
      })
    })
  }

  /**
   * 清除所有消息
   */
  public clear(): void {
    message.destroy()
  }
}

export default new AntToastManager()
