import { Spin } from 'antd'
import './index.scss'

function Loading({ tip = 'Loading' }: { tip?: string }) {
  return <Spin tip={tip} size="large" className="request-loading" />
}

export default Loading
