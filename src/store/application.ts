import { create } from 'zustand'

import type { ProjectConfig } from './../types/config'

import { projectConfig } from '@/settings/project'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'

import { setAuthCache } from '@/utils/auth'

interface AppStore {
  projectConfig: ProjectConfig
  setProjectConfig: (config: Partial<ProjectConfig>) => void
  saveProjectConfig: () => void
  getProjectConfig: () => ProjectConfig
}
export const useAppStore = create<AppStore>((set, get) => ({
  // 项目配置
  projectConfig,
  // 修改项目配置
  setProjectConfig: config => set(state => ({ projectConfig: { ...state.projectConfig, ...config } })),
  // 保存项目配置
  saveProjectConfig: () => {
    setAuthCache(PROJ_CFG_KEY, projectConfig)
  },
  // 获取项目配置
  getProjectConfig: () => {
    return get().projectConfig
  },
}))
