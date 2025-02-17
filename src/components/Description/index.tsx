import { useEffect, useState, type FC } from 'react'
import RcViewer from '@hanyk/rc-viewer'
import { cloneDeep, isBoolean, isFunction, omit } from 'lodash-es'

import { Descriptions } from 'antd'

import type { IDescriptionProps, Term } from './types'
// 渲染图片组件
const renderImage = (files: any): JSX.Element => {
	const newFiles = [...files]
	return (
		<RcViewer>
			{newFiles.map((item, index) => (
				<img src={item.fileUrl} width={'100px'} height={'100px'} alt={item.fileName} key={index} />
			))}
		</RcViewer>
	)
}
// 渲染content
const renderContent = <T,>(data: T, term: Term<T>): JSX.Element => {
	if (term.render) {
		return isFunction(term.render) ? (
			term.render(data)
		) : (
			<span>{term.render}</span>
		)
	}
	if (term.type === 'image') return renderImage(data[term.field])
	else if (term.type === 'dictionary') return <>dict</>
	return <>{data[term.field] || ''}</>
}
const Description: FC<IDescriptionProps> = (props: IDescriptionProps) => {
	const [terms, setTerms] = useState(props.terms)

	// 处理terms
	useEffect(() => {
		const newT = cloneDeep(props.terms)

		const _newT = newT
			.map(item => ({
				...item,
				ifShow:
					item.ifShow !== undefined && isFunction(item.ifShow)
						? item.ifShow(props.data)
						: isBoolean(item.ifShow)
							? item.ifShow
							: true
			}))
			.filter(item => item.ifShow)
		setTerms(_newT)
	}, [props.terms, props.data])
	const getProps = omit(props, ['terms', 'data'])
	return (
		<Descriptions {...getProps}>
			{terms.map((term, index) => (
				<Descriptions.Item key={index} label={term.name} span={term.span || 1}>
					{renderContent(props.data, term)}
				</Descriptions.Item>
			))}
		</Descriptions>
	)
}

export default Description
