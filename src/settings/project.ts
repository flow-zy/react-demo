import { GlobalState } from '#/store'
export const projectSetting: GlobalState = {
	themeConfig: {
		token: { colorPrimary: '#c68dff' }
	},
	waterMarkSetting: {
		content: import.meta.env.VITE_GLOB_APP_TITLE
	},
	menuSetting: {
		mode: 'vertical',
		theme: 'light',
		lang: 'zh-CN'
	},
	collapsed: false,
	sidebarSetting: {
		width: 200
	},
	title: import.meta.env.VITE_GLOB_APP_TITLE,
	logo: '../assets/react.svg',
	isMobile: false,
	headerSetting: {
		fixed: true,
		height: 60,
		theme: 'light',
		show: true
	},
	footerSetting: {
		fixed: true,
		height: 30,
		theme: 'light',
		show: true
	},
	showDarkModeToggle: true,
	showSettingButton: true,
	grayMode: false,
	fullContent: false, // 全屏
	showLogo: true,
	tabSetting: {
		cache: true,
		show: true,
		canDrag: true,
		showQuick: true,
		showRedo: true,
		showFold: true,
		autoCollapse: true
	},
	transitionSetting: {
		enable: true,
		basicTransition: 'slide-right',
		openPageLoading: true,
		openNProgress: true
	},
	openKeepAlive: true, // 是否开启页面缓存
	breadCrumbSetting: {
		show: true,
		icon: true
	},
	settingButtonPosition: 'right',
	useErrorHandler: true, // 是否开启全局错误处理
	useOpenBackTop: true
}
