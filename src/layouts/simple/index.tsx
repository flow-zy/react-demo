import HeaderSimple from '../components/header-simple'

import type React from 'react'

interface Props {
	children: React.ReactNode
}
export default function SimpleLayout({ children }: Props) {
	return (
		<div className="text-text-base bg-bg flex h-screen w-full flex-col">
			<HeaderSimple />
			{children}
		</div>
	)
}
