import { Helmet } from 'react-helmet-async'

import { MotionLazy } from './components/animate/motion-lazy'
import Toast from './components/Toast'
import { AntdAdapter } from './theme/adapter/antd.adapter'
import { ThemeProvider } from './theme/theme-provider'

import Router from '@/router/index'
import Logo from '@/assets/react.svg'

function App() {
	return (
		<ThemeProvider adapters={[AntdAdapter]}>
			<MotionLazy>
				<Helmet>
					<title>宗门管理系统</title>
					<link rel="icon" href={Logo} />
				</Helmet>
				<Toast />
				<Router />
			</MotionLazy>
		</ThemeProvider>
	)
}

export default App
