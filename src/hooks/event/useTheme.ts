import { useCallback, useEffect, useMemo, useState } from 'react'

import type { MouseEvent } from 'react'

import type { ProjectConfig } from '@/types/config'

import { ThemeMode } from '@/enums/appEnum'
import { useAppStore } from '@/store/application'

export function useTheme(projectConfig: ProjectConfig) {
  const appStroe = useAppStore()
  const [themeMode, setThemeMode] = useState(projectConfig.theme)
  // 是不是暗黑主题
  const isDark = useMemo(() => themeMode === ThemeMode.Dark, [themeMode])
  // 根据系统主题设置主题
  const setThemeModeBySystem = useCallback(() => {
    () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setThemeMode(ThemeMode.Dark)
      }
      else {
        setThemeMode(ThemeMode.Light)
      }
    }
  }, [])
  // 更改主题
  const changeTheme = () => {
    //
    isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    appStroe.setProjectConfig({
      ...projectConfig,
      theme: isDark ? ThemeMode.Light : ThemeMode.Dark,
    })
    setThemeMode(isDark ? ThemeMode.Light : ThemeMode.Dark)
  }
  // 初始主题
  const initTheme = () => {
    changeTheme()
  }
  // 设置主题
  const setTheme = (e: MouseEvent) => {
    const { clientX, clientY } = e
    // 设置绘画路径
    const radius = Math.hypot(
      Math.max(clientX, innerWidth - clientX),
      Math.max(clientY, innerHeight - clientY),
    )
    const clipPath = [
      `circle(0% at ${clientX}px ${clientY}px)`,
      `circle(${radius}px at ${clientX}px ${clientY}px)`,
    ]
    console.log(isDark)
    const transition = document.startViewTransition(changeTheme)
    transition.ready.then(() => {
      // 圆形动画扩散开始
      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath.reverse() : clipPath,
        },
        {
          duration: 300,
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }
  // 改变侧边栏主题
  const changeSidebarTheme = () => {

  }
  // 改变顶部栏主题
  const changeHeaderTheme = () => {

  }
  useEffect(() => {
    initTheme()
  }, [])
  return {
    setTheme,
    themeMode,
  }
}
