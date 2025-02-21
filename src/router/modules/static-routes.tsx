import { lazy } from 'react'

import LazyLoad from '../components/LazyLoad'

import { HOME_URL } from '@/config/config'
export const STAIC_ROUTES = [
  {
    path: HOME_URL,
    element:<LazyLoad>{lazy(() => import('@/views/Home'))}</LazyLoad>
  }
]