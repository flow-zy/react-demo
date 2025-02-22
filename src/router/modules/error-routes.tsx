import type { AppRouteObject } from '@/types/router'

import NotFound from '@/views/Exception/404'
import NotAuth from '@/views/Exception/403'
import NotAllow from '@/views/Exception/500'

export const errorRoutes: AppRouteObject[] = [
  {
    path: '/404',
    element: <NotFound></NotFound>,
  },
  {
    path: '/403', // 当访问没有权限的页面时，会自动跳转到403页面
    element: <NotAuth></NotAuth>,
  },
  {
    path: '/500',
    element: <NotAllow></NotAllow>,
  },
]
