import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
interface Props {
  isCollapsed: boolean,
  onClick: () => void
}
function Colllapse({ isCollapsed,onClick }:Props) {
  return (
    <div onClick={onClick} className='mx-2 cursor-pointer'>
      {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  )
}

export default Colllapse
