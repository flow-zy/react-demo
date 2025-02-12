import { Layout } from 'antd'
// import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

import LoginForm from './LoginForm'
import MobileForm from './MobileForm'
import QrCodeFrom from './QrCodeForm'
import RegisterForm from './RegisterForm'
import ResetForm from './ResetForm'
import { LoginStateProvider } from './providers/LoginStateProvider'

// import LocalePicker from '@/components/locale-picker'
import DashboardImg from '@/assets/images/background/dashboard.png'
import Overlay from '@/assets/images/background/overlay.jpg'
import { useUserToken } from '@/store/userStore'
import { rgbAlpha } from '@/utils/theme'
import { themeVars } from '@/theme/theme.css'
// import SettingButton from '@/layouts/components/setting-button'
const { VITE_APP_HOMEPAGE: HOMEPAGE,VITE_GLOB_APP_TITLE } = import.meta.env
const Login = () => {
	const token = useUserToken() // 获取用户token
	// 判断用户是否有权限
	if (token.accessToken) {
		// 如果有授权，则跳转到首页
		return <Navigate to={HOMEPAGE} replace />
	}
	const gradientBg = rgbAlpha(themeVars.colors.background.defaultChannel, 0.9)
	const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat,url(${Overlay})`

	return <Layout className="relative flex !min-h-screen !w-full !flex-row"><div
		className="hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat md:flex"
		style={{
			background: bg,
		}}
	>
		<div className="text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">{VITE_GLOB_APP_TITLE}</div>
		<img className="max-w-[480px] xl:max-w-[560px]" src={DashboardImg} alt="" />

	</div><div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
			<LoginStateProvider>
				<LoginForm />
				<MobileForm />
				<QrCodeFrom />
				<RegisterForm />
				<ResetForm />
			</LoginStateProvider>
		</div>
	</Layout>
}

export default Login
