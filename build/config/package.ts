import { readPackageJSON } from 'pkg-types'
import { defineConfig, mergeConfig } from 'vite'

import { commonConfig } from './common'

import type { UserConfig } from 'vite'

interface DefineOptions {
  overrides?: UserConfig
  options?: object
}

function definePackageConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions
  const root = process.cwd()
  return defineConfig(async ({ mode }) => {
    const { dependencies = {}, peerDependencies = {} }
			= await readPackageJSON(root)
    const packageConfig: UserConfig = {
      build: {
        lib: {
          entry: 'src/index.ts',
          formats: ['es'],
          fileName: () => 'index.mjs',
        },
        rollupOptions: {
          external: [
            ...Object.keys(dependencies),
            ...Object.keys(peerDependencies),
          ],
        },
      },
    }
    const mergedConfig = mergeConfig(commonConfig(mode), packageConfig)

    return mergeConfig(mergedConfig, overrides)
  })
}

export { definePackageConfig }
