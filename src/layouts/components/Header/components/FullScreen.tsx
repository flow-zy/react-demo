import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"

const FullScreen = (props) => {
  return (
    <div {...props} > <Tooltip title={props.isFullScreen ? '退出全屏' : '全屏'}>
      {props.isFullScreen ? <FullscreenExitOutlined></FullscreenExitOutlined> : <FullscreenOutlined></FullscreenOutlined>}
    </Tooltip></div>
  )
}

export default FullScreen