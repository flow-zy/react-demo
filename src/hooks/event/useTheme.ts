import { useCallback, useEffect, useState } from 'react'

import { message } from 'antd'

import type { MouseEvent } from 'react'

import { ThemeMode } from '@/enums/appEnum'
import { useAppStore } from '@/store/application'

// 切换主题
export function useTheme() {
  const { getProjectConfig, setProjectConfig } = useAppStore()
  const { theme, primaryColor, weakMode, grayMode } = getProjectConfig()
  // 获取系统主题
  // 获取系统主题
  const getSystemTheme = (): Exclude<ThemeMode, 'system'> => {
    // 判断系统是否为暗色主题
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeMode.Dark
      : ThemeMode.Light
  }
  // 状态管理
  const [themeMode, setThemeMode] = useState<ThemeMode>(getSystemTheme())
  const [isDark, setIsDark] = useState(theme === ThemeMode.Dark)
  // 更新实际主题状态
  const updateActualTheme = useCallback((newTheme: ThemeMode) => {
    if (newTheme === ThemeMode.System) {
      const systemIsDark = getSystemTheme() === ThemeMode.Dark
      setIsDark(systemIsDark)
      document.documentElement.classList.toggle(ThemeMode.Dark, systemIsDark)
    }
    else {
      const shouldBeDark = newTheme === ThemeMode.Dark
      setIsDark(shouldBeDark)
      document.documentElement.classList.toggle(ThemeMode.Dark, shouldBeDark)
    }
  }, [])

  // 初始化主题
  // useEffect(() => {
  //   updateActualTheme(themeMode)
  // }, [themeMode, updateActualTheme])
  // 切换主题的方法
  const toggleTheme = (newTheme?: ThemeMode) => {
    const nextTheme = newTheme
      || (themeMode === ThemeMode.Light
        ? ThemeMode.Dark
        : themeMode === ThemeMode.Dark ? ThemeMode.Light : getSystemTheme())

    setThemeMode(() => {
      updateActualTheme(nextTheme)
      return nextTheme
    })
    setProjectConfig({ theme: nextTheme })
  }

  const changeThemeColor = (val: string | null) => {
    if (!val) {
      val = primaryColor
      message.success({ type: 'success', content: '主题颜色已重置为默认主题🌻' })
    }
    // globalStore.setGlobalState('themeColor', val)
    setProjectConfig({ primaryColor: val })
  }

  //
  const setTheme = async (event: MouseEvent) => {
    const x = event.clientX
    const y = event.clientY
    // 画圆
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    // @ts-ignore
    if (document.startViewTransition === undefined) {
    /** 明亮和暗黑模式核心逻辑 */
    // 定义图标切换变量(true-月亮，false-太阳)
      toggleTheme()
    /** 明亮和暗黑模式核心逻辑 */
    }
    else {
    // @ts-ignore
      const transition = document.startViewTransition(() => {
      /** 明亮和暗黑模式核心逻辑 */
      // 定义图标切换变量(true-月亮，false-太阳)
        toggleTheme()
      /** 明亮和暗黑模式核心逻辑 */
      })
      await transition.ready
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 300,
          easing: 'ease-in',
          pseudoElement: isDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
        },
      )
    }
  }
  // 初始化灰度模式
  const changeGreyOrWeak = (type: 'grey' | 'weak', isChange: boolean) => {
    const body = document.body as HTMLElement
    if (!isChange)
      return body.removeAttribute('style')
    const styles: any = {
      grey: 'filter: grayscale(1)',
      weak: 'filter: invert(80%)',
    }
    body.setAttribute('style', styles[type])
    const propName = type === 'grey' ? 'weakMode' : 'grayMode'
    // globalStore.setGlobalState(propName, false);
    setProjectConfig({ [propName]: false })
  }
  const initTheme = () => {
    toggleTheme()
    if (grayMode)
      changeGreyOrWeak('grey', true)
    if (weakMode)
      changeGreyOrWeak('weak', true)
  }
  useEffect(() => {
    initTheme()
  }, [])
  return {
    /** 当前选择的主题模式 */
    themeMode,
    /** 是否处于暗色模式 */
    isDark,
    /** 主题切换方法 */
    toggleTheme,
    setTheme,
    changeThemeColor,
  }
}
