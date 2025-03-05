import { Breadcrumb, Layout, Tooltip } from 'antd'

import Menu from '../Menu'

import { useAppStore } from '@/store/application'
import { ThemeEnum, ThemeLayout, ThemeMode } from '@/enums/appEnum'
import { useTheme } from '@/hooks/event/useTheme'
import { cn } from '@/utils'
import AssemblySize from './components/AssemblySize'
import FullScreen from './components/FullScreen'
import Theme from './components/Theme'
import Language from './components/Language'
import SettingDrawer from './components/setting-drawer'
import AvatarIcon from './components/AvatarIcon'
function Header() {
  const { getProjectConfig, setProjectConfig } = useAppStore()
  const iconCLass=cn('cursor-pointer','hover:bg-gray-200','p-2','box-border','rounded-[50%]','h-8','w-8','flex','justify-center','items-center')
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
  const { themeMode, setTheme } = useTheme(getProjectConfig())
  return (
    <Layout.Header
      style={{
        background: headerTheme === ThemeEnum.DARK ? '#001529' : '#fff',
      }}
    >
      <div className="flex w-full items-center">
        <div className="flex  items-center gap-1.5 border-r border-solid border-r-gray-300 px-2 py-2">
          {showLogo && <img src={logo} alt={siteTitle} className="h-8 w-8" />}
          {showTitle && <span className="text-base">{siteTitle}</span>}
        </div>
        <div className="flex flex-1 items-center">
          {showBreadCrumb && <Breadcrumb></Breadcrumb>}
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
