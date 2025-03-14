import Request from './request'

import loadingManager from './loading'
import toastManager from './toast'
import networkManager from './network'
import tokenManager from './token-manage'

import type { CustomAxiosRequestConfig, RequestOptions } from './types'

// 创建默认实例
const request = new Request()

// 导出请求实例、类、工具类和类型
export {
  type CustomAxiosRequestConfig,
  loadingManager,
  networkManager,
  request,
  Request,
  type RequestOptions,
  toastManager,
  tokenManager,
}

export default request
