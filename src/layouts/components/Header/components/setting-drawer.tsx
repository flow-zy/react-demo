import Iconify from "@/components/Icon/iconify-icon"
import { Tooltip } from "antd"

const SettingDrawer = (props) => {
  return (
    <div {...props}>
      <Tooltip title="设置">
        <Iconify icon='uil:setting'/>
      </Tooltip>
    </div>
  )
}

export default SettingDrawer