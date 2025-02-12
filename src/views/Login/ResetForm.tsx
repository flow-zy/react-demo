import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'


import { ReturnButton } from './components/ReturnButton'
import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider'

import SvgIcon from '@/components/Icon/svg-icon'

function ResetForm() {
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values)
	}

	const { t } = useTranslation()
	const { loginState, backToLogin } = useLoginStateContext()

	if (loginState !== LoginStateEnum.RESET_PASSWORD) return null

	return (
		<>
			<div className="mb-8 text-center">
				<SvgIcon icon="ic-reset-password" size="100" />
			</div>
			<div className="mb-4 text-center text-2xl font-bold xl:text-3xl">{t('sys.login.forgetFormTitle')}</div>
			<Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
				<p className="mb-4 h-12 text-center text-gray">{t('sys.login.forgetFormSecondTitle')}</p>
				<Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
					<Input placeholder='请输入邮箱' />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="w-full !bg-black">
						邮箱验证
					</Button>
				</Form.Item>

				<ReturnButton onClick={backToLogin} />
			</Form>
		</>
	)
}

export default ResetForm
