import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import {
  CloseCircleOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { HOME_URL } from '@/config/config'
import { setAuthCache } from '@/utils/auth'
import { TOKEN_KEY } from '@/enums/cacheEnum'

function LoginForm(props: any) {
  const { setToken, setTabsList } = props
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  // 登录
  const onFinish = async (loginForm) => {
    try {
      setLoading(true)
      // const { data } = await loginApi(loginForm)
      // setToken(data?.access_token)
      // setTabsList([])
      message.success('登录成功！')
      navigate(HOME_URL)
      setAuthCache(TOKEN_KEY, '12312')
    }
    finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder="密码：123456"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item className="mt-2.5 w-full whitespace-nowrap">
        <Button
          className="mr-5 w-[180px] text-base"
          onClick={() => {
            form.resetFields()
          }}
          icon={<CloseCircleOutlined />}
        >
          重置
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="w-[180px] text-base"
          loading={loading}
          icon={<UserOutlined />}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginForm
