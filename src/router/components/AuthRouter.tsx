//

import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import Progress from '@/components/Nprogress'
// import { AppRouteObject } from '@/types/router'
import { TOKEN_KEY } from '@/enums/cacheEnum'
import { getAuthCache } from '@/utils/auth'
import { TABS_BLACK_LIST } from '@/config/config'
interface Props {
	children?: React.ReactNode
}
const RouterGuard: FC<Props> = ({ children }: Props) => {
	const token = getAuthCache(TOKEN_KEY)
	const location = useLocation()
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	useEffect(() => {
		setLoading(true)
		if (token) {
			//
			setLoading(false)
		} else {
			if (TABS_BLACK_LIST.includes(location.pathname)) {
				setLoading(false)
			} else {
				setLoading(false)
				navigate('/login')
			}
		}
	}, [location, token, navigate])

	return (
		<ErrorBoundary
			FallbackComponent={() => <></>}
			onReset={() => {
				// 重置错误状态并跳转至首页
				navigate('/login')
			}}
		>
			<Progress isAnimating={loading}></Progress>
			{children}
		</ErrorBoundary>
	)
}

export default RouterGuard
