import NavHorizontal from './nav-horizontal'

import NavVertical from './nav-vertical'

import { up } from '@/hooks'
import { useMediaQuery } from '@/hooks'
import { useSettings } from '@/store/settingStore'
import { ThemeLayout } from '@/enums/appEnum'

export default function Nav() {
	const { themeLayout } = useSettings()
	const isPc = useMediaQuery(up('md'))

	if (themeLayout === ThemeLayout.Horizontal) return <NavHorizontal />

	if (isPc) return <NavVertical />
	return null
}
