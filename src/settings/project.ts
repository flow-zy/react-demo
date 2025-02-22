import type { ProjectConfig } from '#/config'

import {
  ContentEnum,
  RouterTransitionEnum,
  TabTheme,
  ThemeEnum,
  ThemeLayout,
  ThemeMode,
} from '@/enums/appEnum'
import logo from '@/assets/react.svg'

export const projectConfig: ProjectConfig = {
  isFullScreen: false, // 是否全屏
  theme: ThemeMode.Light,
  primaryColor: '#7166f0',
  siteTitle: import.meta.env.VITE_GLOB_APP_TITLE,
  logo,
  contentWidth: ContentEnum.FULL,
  showHeader: true,
  showLogo: true,
  showFooter: true,
  showTitle: true,
  headerTheme: ThemeEnum.LIGHT,
  footerTheme: ThemeEnum.LIGHT,
  menuSetting: {
    theme: ThemeEnum.LIGHT, // 菜单主题
    mode: 'vertical', // 菜单模式
    isCollapsed: false, // 是否收起
    siderWidth: 200, // 菜单宽度
  },
  weakMode: false,
  grayMode: false,
  layout: ThemeLayout.Vertical,
  showBreadCrumb: true,
  showBreadCrumbIcon: true,
  showLoadding: true,
  watermarkText: import.meta.env.VITE_GLOB_APP_TITLE,
  showWatermark: false,
  showProgress: true,
  showTabs: true,
  tabsTheme: TabTheme.Google,
  showTabIcon: true,
  transitionName: RouterTransitionEnum.FADE,
}
