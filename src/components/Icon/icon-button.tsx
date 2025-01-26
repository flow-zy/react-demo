import type { ButtonProps } from 'antd'
import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/utils'

type Props = {
	children: ReactNode
	className?: string
	style?: CSSProperties
} & ButtonProps
export default function IconButton({
	children,
	className,
	style,
	onClick
}: Props) {
	return (
		<button
			type="button"
			style={style}
			className={cn(
				'hover:bg-hover flex cursor-pointer items-center justify-center rounded-full p-2',
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
