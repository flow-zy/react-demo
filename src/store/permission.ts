import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { PermissionState, PerMethods } from '#/store'
import { Menu, RouteType } from '@/router/interface/routeType'
import { RoleEnum } from '@/enums/roleEnum'
import { HOME_URL } from '@/config/config'
interface PermissionStore {
	state: PermissionState
	methods: PerMethods
}
export const usePermissionStore = create(
	persist<PermissionStore>(
		set => ({
			state: {
				menuList: [], // 菜单列表
				isDynamicAddedRoute: false, // 是否已经添加动态路由
				premCodeList: [] // 权限码列表
			},
			methods: {
				setPermCodeList(codeList) {
					set(state => {
						return {
							...state,
							premCodeList: codeList
						}
					})
				},
				setMenuList(menuList) {
					set(state => {
						return {
							...state,
							menuList: menuList
						}
					})
				},
				setDynamicAddedRoute(added) {
					set(state => {
						return {
							...state,
							isDynamicAddedRoute: added
						}
					})
				},
				resetState() {
					set(state => {
						return {
							...state,
							menuList: [],
							isDynamicAddedRoute: false,
							premCodeList: []
						}
					})
				},
				buildRoutesAction: (menus: Menu[]) => {
					const routes: RouteType[] = []
					const roleList: any = []
					const routerFilter = (route: RouteType) => {
						const { meta } = route
						const { roles = '' } = meta || {}
						if (!roles) return true
						return roleList.some((role: string) => roles.includes(role)) // 如果当前用户角色在路由的roles中，则返回true
					}
					const patchHomeAffix = (routes: RouteType[]) => {
						if (!routes || routes.length === 0) return
						let homePath: string = HOME_URL

						function patcher(routes: RouteType[], parentPath = '') {
							if (parentPath) parentPath = parentPath + '/'
							routes.forEach((route: RouteType) => {
								const { path, children, redirect } = route
								const currentPath = path?.startsWith('/')
									? path
									: parentPath + path
								if (currentPath === homePath) {
									if (redirect) {
										homePath = route.redirect! as string
									} else {
										route.meta = Object.assign({}, route.meta, { affix: true })
										throw new Error('end')
									}
								}
								children &&
									children.length > 0 &&
									patcher(children, currentPath)
							})
						}

						try {
							patcher(routes)
						} catch (e) {
							// 已处理完毕跳出循环
							console.log(e)
						}
						return
					}
					//  routes = filter(asyncRoutes, routeFilter);
				}
			}
		}),
		{
			name: 'permission'
		}
	)
)
