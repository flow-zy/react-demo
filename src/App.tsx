import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'

import { KeepAlive, AliveScope } from 'react-activation'

import { hashRouter } from './router'
import { useGlobalStore } from './store/global'
const App = () => {
	const { state } = useGlobalStore()
	return (
		<div className="h-screen w-screen">
			<ConfigProvider theme={state.themeConfig}>
				<AliveScope>
					{state.openKeepAlive ? (
						<KeepAlive>
							<RouterProvider router={hashRouter} />
						</KeepAlive>
					) : (
						<RouterProvider router={hashRouter} />
					)}
				</AliveScope>
			</ConfigProvider>
		</div>
	)
}

export default App
