import { createHashRouter, Navigate } from 'react-router-dom'

// import AuthRouter from './components/AuthRouter'

import { lazy } from 'react'

import lazyLoad from './components/LazyLoad'

import { RouteType } from '@/router/interface/routeType'
import Login from '@/views/Login'
import Layout from '@/layout'
import { HOME_URL } from '@/config/config'

// * 处理路由
export const routerArray: RouteType[] = []
{
	/* <AuthRouter> <Layout />/AuthRouter>*/
}
export const rootRouter: RouteType[] = [
	{
		path: '/',
		element: <Layout />,
		redirect: '/home',
		children: [
			{
				path: HOME_URL,
				element: lazyLoad(lazy(() => import('@/views/Home')))
			},
			...routerArray
		]
	},
	{
		path: '/login',
		element: <Login />,
		meta: {
			title: '登录页',
			key: 'login'
		}
	},
	{
		path: '*',
		element: <Navigate to="/404" />
	}
]
export const hashRouter = createHashRouter(rootRouter)
