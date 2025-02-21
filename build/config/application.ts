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
						find: /@\//,
						replacement: pathResolve('src') + '/'
					},
					// #/xxxx => types/xxxx
					{
						find: /#\//,
						replacement: pathResolve('src/types') + '/'
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
					onwarn(warning, warn) {
		        // 根据警告类型过滤或处理
		        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
		        warn(warning)
		      },
					output: {
						// 入口文件名
						entryFileNames: 'assets/js/[name]-[hash].js',
						assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
						chunkFileNames: 'assets/js/[name]-[hash].js',
						manualChunks(id) {
							if (id.includes('node_modules')) {
								return id.toString().split('node_modules/')[1].split('/')[0].toString()
							}
						}
						// manualChunks: {
						// 	'vendor-core': ['react', 'react-dom', 'react-router-dom'],
						// 	'vendor-ui': [
						// 		'antd',
						// 		'@ant-design/icons',
						// 		'@ant-design/cssinjs',
						// 		'framer-motion',
						// 		'styled-components'
						// 	],
						// 	'vendor-utils': [
						// 		'axios',
						// 		'dayjs',
						// 		'i18next',
						// 		'zustand',
						// 		'@iconify/react'
						// 	],
						// 	'vendor-charts': ['apexcharts', 'react-apexcharts']
						// }
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
		console.error(error,'error')
		return {}
	}
}

export { defineApplicationConfig }
