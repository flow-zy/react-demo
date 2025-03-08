import { Layout } from 'antd'

import AssemblySize from './components/AssemblySize'
import FullScreen from './components/FullScreen'
import Theme from './components/Theme'
import Language from './components/Language'
import SettingDrawer from './components/setting-drawer'
import AvatarIcon from './components/AvatarIcon'
import Breadcreamb from './components/Breadcreamb'
import Colllapse from './components/Colllapse'

import Menu from '../Menu'

import { cn } from '@/utils'
import { useTheme } from '@/hooks/event/useTheme'
import { ThemeEnum, ThemeLayout } from '@/enums/appEnum'
import { useAppStore } from '@/store/application'

function Header() {
  const { getProjectConfig, setProjectConfig } = useAppStore()
  const iconCLass = cn('cursor-pointer', 'hover:bg-gray-200', 'p-2', 'box-border', 'rounded-[50%]', 'h-8', 'w-8', 'flex', 'justify-center', 'items-center')
  const {
    showLogo,
    logo,
    siteTitle,
    showTitle,
    headerTheme,
    showBreadCrumb,
    layout,
    isFullScreen,
    menuSetting,
  } = getProjectConfig()
  const { themeMode, setTheme } = useTheme(getProjectConfig())
  return (
    <Layout.Header
      style={{
        background: headerTheme === ThemeEnum.DARK ? '#001529' : '#fff',
      }}
    >
      <div className="flex w-full items-center">
        <div className="flex  items-center gap-1.5 border-r border-solid border-r-gray-300 px-2 py-2">
          { showLogo && <img src={logo} alt={siteTitle} className={menuSetting.isCollapsed ? 'w-6 h-6' : 'w-8 h-8'} /> }
          {!menuSetting.isCollapsed && showTitle && <span className="text-base">{siteTitle}</span>}
        </div>
        <Colllapse
          isCollapsed={menuSetting.isCollapsed}
          onClick={() => setProjectConfig({
            menuSetting: {
              ...menuSetting,
              isCollapsed: !menuSetting.isCollapsed,
            },
          })}
        >
        </Colllapse>
        <div className="flex flex-1 items-center">
          {showBreadCrumb && <Breadcreamb></Breadcreamb>}
          {layout === ThemeLayout.Horizontal && <Menu></Menu>}
        </div>
        <div className="tools flex items-center gap-1.5 h-16 box-border">
          {/* 搜索 */}
          <AssemblySize className={iconCLass}></AssemblySize>
          {/* 全屏 */}
          <FullScreen
            className={iconCLass}
            onClick={() => {
              setProjectConfig({ isFullScreen: !isFullScreen })
            }}
            isFullScreen={isFullScreen}
          >
          </FullScreen>
          {/* 主题 */}
          <Theme className={iconCLass} onClick={setTheme} themeMode={themeMode}></Theme>
          {/* 语言 */}
          <Language className={iconCLass}></Language>
          {/* 消息 */}
          {/* 设置 */}
          <SettingDrawer className={iconCLass}></SettingDrawer>
          {/* 用户信息 */}
          <AvatarIcon />
        </div>
      </div>
    </Layout.Header>
  )
}

export default Header
