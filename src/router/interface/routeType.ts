import { TagProps } from 'antd'

import type { RouteObject } from 'react-router-dom'

import { RoleEnum } from '@/enums/roleEnum'
export type RouteType = RouteObject & {
	path?: string
	name?: string
	redirect?: string
	meta?: {
		title?: string
		icon?: string
		keepAlive?: boolean
		hidden?: boolean
		affix?: boolean
		key?: string
		isShow?: boolean
		roles?: string[]
	}
	children?: RouteType[]
}

export interface Menu {
	name: string

	icon?: string

	img?: string

	path: string

	// path contains param, auto assignment.
	paramPath?: string

	disabled?: boolean

	children?: Menu[]

	orderNo?: number

	roles?: RoleEnum[]

	meta?: Partial<RouteType['meta']>

	tag?: TagProps

	hideMenu?: boolean
}
