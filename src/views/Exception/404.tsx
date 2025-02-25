import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

import { HOME_URL } from '@/config/config'

function NotFound() {
  const navigate = useNavigate()
  const goHome = () => {
    navigate(HOME_URL)
  }
  return (
    <Result
      status="404"
      title="404"
      className="flex h-full flex-col items-center justify-center"
      subTitle="Sorry, the page you visited does not exist."
      extra={(
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      )}
    />
  )
}

export default NotFound
