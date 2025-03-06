import { Tooltip } from 'antd'

import { InconifyIcon } from '@/components/Icon'
import { ThemeMode } from '@/enums/appEnum'

function Theme(props) {
  return (
    <div {...props}>
      <Tooltip title={props.themeMode === ThemeMode.Light ? '暗色模式' : '浅色模式'}>
        <InconifyIcon icon={props.themeMode === ThemeMode.Light ? 'line-md:moon-loop' : 'line-md:sun-rising-loop'}></InconifyIcon>
      </Tooltip>
    </div>
  )
}

export default Theme
