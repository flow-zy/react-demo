import { Layout as AntLayout } from 'antd'

import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import { useEffect } from 'react'

import { AliveScope } from 'react-activation'

import Main from './components/Main'

import Header from './components/Header'

import type { ProjectConfig } from '@/types/config'

import { useAppStore } from '@/store/application'

import { ThemeLayout } from '@/enums/appEnum'

const { Footer, Sider } = AntLayout
// 定义一个名为layoutCom的函数，参数为layout，类型为ThemeLayout
function layoutCom(project: ProjectConfig) {
  const {
    layout,
    menuSetting: { siderWidth, theme, isCollapsed },
    showHeader,
    showFooter,
  } = project
  // 如果layout等于ThemeLayout.Horizontal，则返回ThemeLayout.Horizontal
  if (layout === ThemeLayout.Horizontal) {
    return <AntLayout>{ThemeLayout.Horizontal}</AntLayout>
    // 如果layout等于ThemeLayout.Vertical，则返回Layout组件
  }
  else if (layout === ThemeLayout.Vertical) {
    return (
      <AntLayout>
        {showHeader && <Header></Header>}
        <AntLayout>
          <Sider
            width={isCollapsed ? 60 : siderWidth}
            theme={theme}
            collapsed={isCollapsed}
          >
          </Sider>
          <Main />
        </AntLayout>
        {showFooter && <Footer>Footer</Footer>}
      </AntLayout>
    )
    // 否则返回空组件
  }
  else {
    return <AntLayout></AntLayout>
  }
}
function Layout() {
  const { getProjectConfig, setProjectConfig } = useAppStore()
  const handle = useFullScreenHandle()
  const { isFullScreen } = getProjectConfig()
  useEffect(() => {
    if (isFullScreen) {
      handle.enter()
    }
    else {
      handle.exit()
    }
  }, [isFullScreen])
  return (
    <FullScreen handle={handle} onChange={() => setProjectConfig({ isFullScreen: handle.active })}>
      <div className="h-screen w-screen"><AliveScope>{layoutCom(getProjectConfig())}</AliveScope></div>
    </FullScreen>
  )
}

export default Layout
