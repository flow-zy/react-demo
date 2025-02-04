import { Breadcrumb, type BreadcrumbProps, type GetProp } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useMatches } from 'react-router-dom'

import { useFlattenedRoutes, usePermissionRoutes } from '@/router/hooks'
import { menuFilter } from '@/router/utils'
import { RouteMeta } from '#/router'
import Iconify from '@/components/Icon/iconify-icon'

type MenuItem = GetProp<BreadcrumbProps, 'items'>[number]

/**
 * 动态面包屑解决方案：https://github.com/MinjieChang/myblog/issues/29
 */
export default function BreadCrumb() {
	const { t } = useTranslation()
	const matches = useMatches()
	const flattenedRoutes = useFlattenedRoutes()
	const permissionRoutes = usePermissionRoutes()

	const breadCrumbs = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes)
		const paths = matches
			.filter(item => item.pathname !== '/')
			.map(item => item.pathname)

		const pathRouteMetas = flattenedRoutes.filter((item: RouteMeta) =>
			paths.includes(item.key)
		)

		let currentMenuItems = [...menuRoutes]

		return pathRouteMetas.map((routeMeta: RouteMeta): MenuItem => {
			const { key, label } = routeMeta

			const currentRoute = currentMenuItems.find(item => item.meta?.key === key)

			currentMenuItems =
				currentRoute?.children?.filter(item => !item.meta?.hideMenu) ?? []

			return {
				key,
				title: t(label),
				...(currentMenuItems.length > 0 && {
					menu: {
						items: currentMenuItems.map(item => ({
							key: item.meta?.key,
							label: item.meta?.key ? (
								<Link to={item.meta.key}>{t(item.meta.label)}</Link>
							) : null
						}))
					}
				})
			}
		})
	}, [matches, flattenedRoutes, t, permissionRoutes])

	return (
		<Breadcrumb
			items={breadCrumbs}
			className="!text-sm"
			separator={<Iconify icon="ph:dot-duotone" />}
		/>
	)
}
