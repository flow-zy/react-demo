import { MenuProps, SiderProps, ThemeConfig, WatermarkProps } from 'antd'

import { Menu, RouteType } from '@/router/interface/routeType'
type Theme = 'light' | 'dark'
type Position = 'left' | 'right' | 'top' | 'bottom'
export interface GlobalState {
	themeConfig: ThemeConfig
	waterMarkSetting: WatermarkProps
	menuSetting: MenuProps
	collapsed: boolean
	sidebarSetting: SiderProps
	isMobile: boolean
	headerSetting: {
		fixed: boolean
		show: boolean
		height: number | string
		theme: Theme
	}
	footerSetting: {
		show: boolean
		fixed: boolean
		height: number | string
		theme: Theme
	}
	title: string
	logo: string
	showSettingButton: boolean
	showDarkModeToggle: boolean
	settingButtonPosition: Position
	grayMode: boolean
	fullContent: boolean
	showLogo: boolean
	tabSetting: {
		cache: boolean
		show: true
		canDrag: boolean
		showQuick: boolean
		showRedo: true
		showFold: true
		autoCollapse: boolean
	}
	transitionSetting: {
		enable: boolean
		basicTransition: string
		openPageLoading: boolean
		openNProgress: boolean
	}
	openKeepAlive: boolean
	breadCrumbSetting: {
		show: boolean
		icon: boolean
	}
	useErrorHandler: boolean
	useOpenBackTop: boolean
}
export interface PermissionState {
	menuList: Menu[]
	isDynamicAddedRoute: boolean
	premCodeList: string[] | number[]
}
export interface PerMethods {
	setPermCodeList: (codeList: string[] | number[]) => void
	setMenuList: (menuList: Menu[]) => void
	setDynamicAddedRoute: (isDynamicAddedRoute: boolean) => void
	resetState: () => void
	buildRoutesAction: (menuList: Menu[]) => Promise<RouteType[]>
}
