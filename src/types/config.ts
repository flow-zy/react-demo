import type { MenuProps } from 'antd'

import type { ContentEnum, RouterTransitionEnum, TabTheme, ThemeEnum, ThemeLayout, ThemeMode } from '@/enums/appEnum'

// 菜单设置
export interface MenuSetting {
  theme: ThemeEnum // 菜单主题
  mode: MenuProps['mode'] // 菜单模式
  isCollapsed: boolean // 是否收起
  siderWidth: number // 菜单宽度
}
//
export interface ProjectConfig {
  theme: ThemeMode // 主题
  isFullScreen: boolean // 全屏
  showTitle: boolean // 是否显示标题
  primaryColor: string // 主题颜色
  contentWidth: ContentEnum // 内容宽度
  siteTitle: string // 网站标题
  showHeader: boolean // 是否显示头部
  showLogo: boolean // 是否显示logo
  showFooter: boolean // 是否显示底部
  logo: string // logo
  headerTheme: ThemeEnum // 头部主题
  footerTheme: ThemeEnum // 底部主题
  menuSetting: MenuSetting // 菜单设置
  weakMode: boolean // 色弱模式
  grayMode: boolean // 灰色模式
  layout: ThemeLayout // 布局
  showBreadCrumb: boolean // 面包屑
  showBreadCrumbIcon: boolean // 面包屑图标
  showWatermark: boolean // 水印
  watermarkText: string // 水印文字
  showTabs: boolean // tabs
  tabsTheme: TabTheme // tabs主题
  showTabIcon: boolean // tabs图标
  showProgress: boolean // 页面切换进度条
  showLoadding: boolean // 页面加载
  transitionName: RouterTransitionEnum // 页面切换动画
}

export interface GlobEnvConfig {
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_API_URL_PREFIX: string
  VITE_GLOB_UPLOAD_URL: string
  VITE_GLOB_API_URL: string
}
