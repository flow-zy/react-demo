import { Helmet } from 'react-helmet-async'

import { App as AntApp, ConfigProvider } from 'antd'
import { Suspense, useEffect } from 'react'

import { Analytics } from '@vercel/analytics/react'

import Router from './router'

import { getAuthCache } from './utils/auth'
import { PROJ_CFG_KEY } from './enums/cacheEnum'

import Logo from '@/assets/react.svg'
import { useAppStore } from '@/store/application'

function App() {
  const appStore = useAppStore()
  const project = getAuthCache(PROJ_CFG_KEY)
  useEffect(() => {
    if (!project) {
      appStore.saveProjectConfig()
    }
  }, [project])
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: appStore.getProjectConfig().primaryColor,
        },
      }}
    >
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
