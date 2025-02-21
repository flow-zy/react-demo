import { ErrorBoundary } from 'react-error-boundary'

import {
	Navigate,
	type RouteObject,
	createHashRouter,
	RouterProvider
} from 'react-router-dom'

import type { AppRouteObject } from '#/router'

import PageError from '@/views/Exception/404'
import Login from '@/views/Login'
import Layout from '@/layouts'
import { HOME_URL } from '@/config/config'

const PUBLIC_ROUTE: AppRouteObject = {
	path: '/login',
	element: (
		<ErrorBoundary FallbackComponent={PageError}>
			<Login />
		</ErrorBoundary>
	)
}

const NO_MATCHED_ROUTE: AppRouteObject = {
	path: '*',
	element: <Navigate to="/404" replace />
}

export default function Router() {
	const PROTECTED_ROUTE: AppRouteObject = {
		path: '/',
		element: <Layout></Layout>,
		children: [{ index: true, element: <Navigate to={HOME_URL} replace /> }]
	}

	const routes = [
		PUBLIC_ROUTE,
		PROTECTED_ROUTE,
		NO_MATCHED_ROUTE
	] as RouteObject[]

	const router = createHashRouter(routes)

	return <RouterProvider router={router} />
}
export { default as RouterGuard } from './components/AuthRouter'
