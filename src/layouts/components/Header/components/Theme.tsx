import { InconifyIcon } from "@/components/Icon"
import { ThemeMode } from "@/enums/appEnum"
import { Tooltip } from "antd"

const Theme = (props) => {
  return (
    <div {...props}><Tooltip title={props.themeMode === ThemeMode.Light ? '暗色模式' : '浅色模式'}>
      <InconifyIcon icon={props.themeMode === ThemeMode.Light ? 'line-md:moon-loop' : 'line-md:sun-rising-loop'}></InconifyIcon>
    </Tooltip></div>
  )
}

export default Theme