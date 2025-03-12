import { Switch, Tooltip } from 'antd'
import React from 'react'

import { isString } from 'lodash-es'

import { cn } from '@/utils'
import Iconify from '@/components/Icon/iconify-icon'

interface SwitchBoxProps {
  title: string
  showTip: boolean
  tipText?: string
  tipIcon?: string | React.ReactNode
  checked: boolean
  onChange?: (checked: boolean) => void
}
function SwitchBox(props: SwitchBoxProps) {
  const cls = cn(['hover:bg-accent', 'my-1', 'flex', 'w-full', 'items-center', 'justify-between', 'rounded-md', 'px-2', 'py-2.5'])
  const { title, showTip, tipText, tipIcon, checked, onChange } = props
  return (
    <div className={cls}>
      <div className="flex items-center text-sm">
        {title}
        {showTip && (
          <Tooltip title={tipText}>
            {isString(tipIcon) ? <Iconify icon={tipIcon}></Iconify> : <>{tipIcon}</>}
          </Tooltip>
        )}
      </div>
      <Switch checked={checked} onChange={onChange}></Switch>
    </div>
  )
}

export default SwitchBox
