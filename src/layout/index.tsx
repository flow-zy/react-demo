import { useLocation, useOutlet } from 'react-router-dom'
import { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Button } from 'antd'

import Progress from '@/components/Nprogress'
export default function Layout() {
	const [isLoading, setIsLoading] = useState(false)
	const location = useLocation()
	const outlet = useOutlet()
	return (
		<div>
			<Button type="primary">12312</Button>
			<Progress isAnimating={isLoading} key={location.key}></Progress>
			<TransitionGroup>
				<CSSTransition
					classNames="fade"
					key={location.key}
					onEnter={() => {
						setIsLoading(true)
					}}
					onEntered={() => {
						setIsLoading(false)
					}}
					timeout={1200}
				>
					<div>{outlet}</div>
				</CSSTransition>
			</TransitionGroup>
		</div>
	)
}
