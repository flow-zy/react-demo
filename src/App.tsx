import { Helmet } from 'react-helmet-async'

import { ConfigProvider, App as AntApp } from 'antd'
import { Suspense, useState, useEffect } from 'react'

import { Analytics } from '@vercel/analytics/react'

import Router from './router'

import Logo from '@/assets/react.svg'

function App() {
	return (
		<ConfigProvider>
			<Helmet>
				<title>宗门管理系统</title>
				<link rel="icon" href={Logo} />
			</Helmet>
			<Suspense>
				{Router()}
				<Analytics />
				<AntApp />
			</Suspense>
		</ConfigProvider>
	)
}

export default App
