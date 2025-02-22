import { Breadcrumb, Layout, Tooltip } from 'antd'

import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'

import Menu from '../Menu'

import { useAppStore } from '@/store/application'
import { ThemeEnum, ThemeLayout, ThemeMode } from '@/enums/appEnum'
import { InconifyIcon } from '@/components/Icon'
import { useTheme } from '@/hooks/event/useTheme'

function Header() {
  const { getProjectConfig, setProjectConfig } = useAppStore()
  const {
    showLogo,
    logo,
    siteTitle,
    showTitle,
    headerTheme,
    showBreadCrumb,
    layout,
    isFullScreen,
  } = getProjectConfig()
  const { themeMode, setTheme } = useTheme()
  return (
    <Layout.Header
      style={{
        background: headerTheme === ThemeEnum.DARK ? '#001529' : '#fff',
      }}
    >
      <div className="flex w-full items-center">
        <div className="flex w-28 items-center gap-1.5 border-r border-solid border-r-gray-300 px-2 py-2">
          {showLogo && <img src={logo} alt={siteTitle} className="h-8 w-8" />}
          {showTitle && <span className="text-base">{siteTitle}</span>}
        </div>
        <div className="flex flex-1 items-center">
          {showBreadCrumb && <Breadcrumb></Breadcrumb>}
          {layout === ThemeLayout.Horizontal && <Menu></Menu>}
        </div>
        <div className="tools flex items-center gap-1.5">
          {/* 搜索 */}

          {/* 全屏 */}
          <div
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={() => {
              setProjectConfig({ isFullScreen: !isFullScreen })
            }}
          >
            <Tooltip title={isFullScreen ? '退出全屏' : '全屏'}>
              {isFullScreen ? <FullscreenExitOutlined></FullscreenExitOutlined> : <FullscreenOutlined></FullscreenOutlined>}
            </Tooltip>
          </div>
          {/* 主题 */}
          <div className="cursor-pointer hover:bg-gray-200 p-2 rounded" onClick={setTheme}>
            <Tooltip title={themeMode === ThemeMode.Light ? '暗色模式' : '浅色模式'}>
              <InconifyIcon icon={themeMode === ThemeMode.Light ? 'line-md:moon-loop' : 'line-md:sun-rising-loop'}></InconifyIcon>
            </Tooltip>
          </div>
          {/* 语言 */}
          {/* 消息 */}
          {/* 设置 */}
          {/* 用户信息 */}
        </div>
      </div>
    </Layout.Header>
  )
}

export default Header
