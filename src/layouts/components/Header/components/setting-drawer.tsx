import { Tooltip } from 'antd'

import Iconify from '@/components/Icon/iconify-icon'

function SettingDrawer(props) {
  return (
    <div {...props}>
      <Tooltip title="设置">
        <Iconify icon="uil:setting" />
      </Tooltip>
    </div>
  )
}

export default SettingDrawer
