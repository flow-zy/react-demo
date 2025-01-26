import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'

import ProtectedRoute from '../components/project-route'

import type { AppRouteObject } from '#/router'

import { CircleLoading } from '@/components/Loading/circle-loading'
import SimpleLayout from '@/layouts/simple'

const Page403 = lazy(() => import('@/views/Exception/403'))
const Page404 = lazy(() => import('@/views/Exception/404'))
const Page500 = lazy(() => import('@/views/Exception/500'))

/**
 * error routes
 * 403, 404, 500
 */
export const ERROR_ROUTE: AppRouteObject = {
	element: (
		<ProtectedRoute>
			<SimpleLayout>
				<Suspense fallback={<CircleLoading />}>
					<Outlet />
				</Suspense>
			</SimpleLayout>
		</ProtectedRoute>
	),
	children: [
		{ path: '403', element: <Page403 /> },
		{ path: '404', element: <Page404 /> },
		{ path: '500', element: <Page500 /> }
	]
}
