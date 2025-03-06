import { Dropdown, Tooltip } from 'antd'
import React from 'react'

import type { MenuProps } from 'antd'

import Iconify from '@/components/Icon/iconify-icon'

function Language(props) {
  const items: MenuProps['items'] = [
    {
      label: (<>
        <Iconify icon="icon-park-outline:chinese"></Iconify>
        中文
              </>),
      key: 'zh-cn',
    },
    {
      label: (<>
        <Iconify icon="icon-park-outline:english"></Iconify>
        英文
              </>),
      key: 'en-us',
    },
  ]
  return (
    <div {...props}>
      <Tooltip title="语言" placement="left">
        <Dropdown menu={{ items }}>
          <Iconify icon="cil:language" />
        </Dropdown>
      </Tooltip>
    </div>
  )
}

export default Language
