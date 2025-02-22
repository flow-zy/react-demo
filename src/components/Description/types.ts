import type { DescriptionsProps } from 'antd'
import type { DescriptionsItemProps } from 'antd/es/descriptions/Item'

type TermType = 'image' | 'text' | 'dictionary' | 'link'
export interface Term<T = any> {
  name: DescriptionsItemProps['label']
  field: keyof T
  type?: TermType
  render?: string | ((value: T) => JSX.Element)
  ifShow?: boolean | ((value: T) => boolean)
  span?: number
}

export interface IDescriptionProps<T = any> {
  data: T
  terms: Term<T>[]
  column?: DescriptionsProps['column']
  layout?: 'horizontal' | 'vertical'
  title?: string
  bordered?: boolean
  contentStyle?: DescriptionsProps['contentStyle']
  size?: DescriptionsProps['size']
  labelStyle?: DescriptionsProps['labelStyle']
  extra?: DescriptionsProps['extra']
}
