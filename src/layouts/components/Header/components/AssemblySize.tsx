import { Dropdown, Tooltip } from 'antd'

import type { MenuProps } from 'antd'

import { InconifyIcon } from '@/components/Icon'

function AssemblySize(props: any) {
  const items: MenuProps['items'] = [
    {
      key: 'middle',
      label: <span>默认</span>,
    },
    {
      key: 'large',
      label: <span>大型</span>,
    },
    {
      key: 'small',
      label: <span>小型</span>,
    },
  ]
  return (
    <div {...props}>
      <Dropdown menu={{ items }} trigger={['click']} arrow>
        <Tooltip title="组件大小" placement="left">
          <InconifyIcon icon="iconoir:component"></InconifyIcon>
        </Tooltip>
      </Dropdown>
    </div>

  )
}

export default AssemblySize
