import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { projectSetting } from '@/settings/project'
import { GlobalState } from '#/store'
interface ReturnGlobal {
	state: GlobalState
}

export const useGlobalStore = create(
	persist<ReturnGlobal>(
		() => {
			return {
				state: { ...projectSetting }
			}
		},
		{
			name: 'global'
		}
	)
)
