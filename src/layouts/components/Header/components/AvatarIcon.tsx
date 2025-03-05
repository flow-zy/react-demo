import { Avatar, Dropdown, MenuProps } from 'antd'
import avatar from '@/assets/images/avatar.png'
import Iconify from '@/components/Icon/iconify-icon'
const AvatarIcon = (props) => {
  const items: MenuProps['items'] = [{
    key: 'user-info',
    label: <>
      <Iconify icon='ant-design:user-outlined'/> 个人信息
    </>,
  }, {
    key: 'change-password',
    label: <>
      <Iconify icon='ant-design:key-outlined' /> 修改密码
    </>,
  }, {
    key: 'logout',
    label: <>
      <Iconify icon='ant-design:logout-outlined' /> 退出登录
    </>,
  }]
  return (
    <div {...props}>
      <Dropdown menu={{ items }}>
        <Avatar
          src={avatar}
          size="large"
          alt="avatar"
          className='cursor-pointer'
        />
      </Dropdown>
    </div>
  )
}

export default AvatarIcon