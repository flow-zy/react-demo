import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { HEADER_HEIGHT } from '../config'

import Logo from '@/components/logo'
import { useSettings } from '@/store/settingStore'
import { cn } from '@/utils'
import { ThemeLayout } from '@/enums/appEnum'

interface Props {
	collapsed: boolean
	onToggle: () => void
}
export default function NavLogo({ collapsed, onToggle }: Props) {
	const { themeLayout } = useSettings()

	return (
		<div
			style={{ height: `${HEADER_HEIGHT}px` }}
			className="relative flex items-center justify-center py-4"
		>
			<div className="flex items-center">
				<Logo />
				{themeLayout !== ThemeLayout.Mini && (
					<span className="text-primary ml-2 text-xl font-bold">
						宗门管理系统
					</span>
				)}
			</div>
			<div
				onClick={onToggle}
				onKeyDown={onToggle}
				className={cn(
					'border-border bg-bg-paper absolute top-7 right-0 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-dashed text-center text-sm select-none md:flex'
				)}
			>
				{collapsed ? (
					<RightOutlined className="text-text-disabled text-xs" />
				) : (
					<LeftOutlined className="text-text-disabled text-xs" />
				)}
			</div>
		</div>
	)
}
