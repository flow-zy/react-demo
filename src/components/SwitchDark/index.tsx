import { Switch } from 'antd'

const SwitchDark = (props: any) => {
	const { setThemeConfig, themeConfig } = props
	const onChange = (checked: boolean) => {
		setThemeConfig({ ...themeConfig, isDark: checked })
	}

	return (
		<Switch
			className="dark"
			defaultChecked={themeConfig.isDark}
			checkedChildren={<>🌞</>}
			unCheckedChildren={<>🌜</>}
			onChange={onChange}
		/>
	)
}

export default SwitchDark