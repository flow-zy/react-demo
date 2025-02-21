import { lazy } from 'react'

import Lazyload from '../components/LazyLoad'

import type { AppRouteObject } from '@/types/router'

export const errorRoutes: AppRouteObject[] = [
  {
    path: '/404',
    element: <Lazyload>{lazy(() => import('@/views/Exception/404'))}</Lazyload> ,
  },
  {
    path: '/403', // 当访问没有权限的页面时，会自动跳转到403页面
    element: <Lazyload>{lazy(() => import('@/views/Exception/403'))}</Lazyload> ,
  },
  {
    path: '/500',
    element: <Lazyload>{lazy(() => import('@/views/Exception/500'))}</Lazyload> ,
  }
]