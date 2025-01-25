import { defineApplicationConfig } from './build'
export default defineApplicationConfig({
	overrides: {
		server: {
			open: false, // 项目启动后，自动打开
			warmup: {
				clientFiles: ['./index.html', './src/{views,components}/*']
			}
		}
	}
})
