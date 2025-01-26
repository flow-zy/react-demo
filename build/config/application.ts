import dayjs from 'dayjs'
import { readPackageJSON } from 'pkg-types'
import { defineConfig, loadEnv, mergeConfig, type UserConfig } from 'vite'

import { resolve } from 'node:path'

import { commonConfig } from './common'

import { createPlugins } from '../plugins'

interface DefineOptions {
	overrides?: UserConfig
	options?: object
}

function defineApplicationConfig(defineOptions: DefineOptions = {}) {
	const { overrides = {} } = defineOptions

	return defineConfig(async ({ command, mode }) => {
		const root = process.cwd()
		const isBuild = command === 'build'
		const {
			VITE_PUBLIC_PATH,
			VITE_USE_MOCK,
			VITE_BUILD_COMPRESS,
			VITE_ENABLE_ANALYZE
		} = loadEnv(mode, root)

		const defineData = await createDefineData(root)
		const plugins = await createPlugins({
			isBuild,
			root,
			enableAnalyze: VITE_ENABLE_ANALYZE === 'true',
			enableMock: VITE_USE_MOCK === 'true',
			compress: VITE_BUILD_COMPRESS
		})

		const pathResolve = (pathname: string) => resolve(root, '.', pathname)

		const applicationConfig: UserConfig = {
			base: VITE_PUBLIC_PATH,
			resolve: {
				alias: [
					{
						find: 'vue-i18n',
						replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
					},
					// @/xxxx => src/xxxx
					{
						find: /@\//,
						replacement: pathResolve('src') + '/'
					},
					// #/xxxx => types/xxxx
					{
						find: /#\//,
						replacement: pathResolve('types') + '/'
					}
				]
			},
			define: defineData,
			build: {
				target: 'es2015',
				minify: 'esbuild',
				cssTarget: 'chrome80',
				cssCodeSplit: true,
				rollupOptions: {
					output: {
						// 入口文件名
						entryFileNames: 'assets/entry/[name]-[hash].js',
						manualChunks: {
							'vendor-core': ['react', 'react-dom', 'react-router-dom'],
							'vendor-ui': [
								'antd',
								'@ant-design/icons',
								'@ant-design/cssinjs',
								'framer-motion',
								'styled-components'
							],
							'vendor-utils': [
								'axios',
								'dayjs',
								'i18next',
								'zustand',
								'@iconify/react'
							],
							'vendor-charts': ['apexcharts', 'react-apexcharts']
						}
					}
				}
			},
			esbuild: {
				drop: isBuild ? ['console', 'debugger'] : [],
				legalComments: 'none',
				target: 'esnext'
			},
			plugins
		}

		const mergedConfig = mergeConfig(commonConfig(mode), applicationConfig)

		return mergeConfig(mergedConfig, overrides)
	})
}

async function createDefineData(root: string) {
	try {
		const pkgJson = await readPackageJSON(root)
		const { dependencies, devDependencies, name, version } = pkgJson

		const __APP_INFO__ = {
			pkg: { dependencies, devDependencies, name, version },
			lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
		}
		return {
			__APP_INFO__: JSON.stringify(__APP_INFO__)
		}
	} catch (error) {
		console.error(error)
		return {}
	}
}

export { defineApplicationConfig }
