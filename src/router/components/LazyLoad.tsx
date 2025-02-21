import React, { FC, Suspense } from 'react'
import { Spin } from 'antd'

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
interface ParentProps {
    children: React.LazyExoticComponent<any>;
}

const lazyLoad:FC<ParentProps> = (props:ParentProps) => {
	return (
		<Suspense
			fallback={
				<Spin
					size="large"
					className="flex h-full items-center justify-center"
				/>
			}
		>
			<>{props.children}</>
		</Suspense>
	)
}

export default lazyLoad
