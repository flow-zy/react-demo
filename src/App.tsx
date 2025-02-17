import { Helmet } from 'react-helmet-async'

import { ConfigProvider ,App as AntApp} from 'antd'
import {Suspense, useState,useEffect } from 'react'

import { Analytics } from '@vercel/analytics/react'

import Progress from './components/Nprogress'

import Logo from '@/assets/react.svg'

function App() {
	const [isAnimating, setIsAnimating] = useState(true)
	useEffect(() => {
	  setIsAnimating(false)
	},[])
	return (
		<ConfigProvider>
			<Helmet>
					<title>宗门管理系统</title>
					<link rel="icon" href={Logo} />
			</Helmet>
				{/* <Suspense> */}
				<Progress isAnimating={isAnimating} />
				<Analytics />
				<AntApp />
			{/* </Suspense> */}
		</ConfigProvider>
	)
}

export default App
