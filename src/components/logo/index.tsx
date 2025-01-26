import { NavLink } from 'react-router-dom'

import { Iconify } from '../Icon'

import { useTheme } from '@/theme/hooks'

interface Props {
	size?: number | string
}
function Logo({ size = 50 }: Props) {
	const { themeTokens } = useTheme()

	return (
		<NavLink to="/">
			<Iconify
				icon="solar:code-square-bold"
				color={themeTokens.color.palette.primary.default}
				size={size}
			/>
		</NavLink>
	)
}

export default Logo
