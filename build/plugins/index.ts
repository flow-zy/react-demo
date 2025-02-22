// import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import purgeIcons from 'vite-plugin-purge-icons'
import tsconfigPaths from 'vite-tsconfig-paths'
import Inspect from 'vite-plugin-inspect'

import { createAppConfigPlugin } from './appConfig'
import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configMockPlugin } from './mock'
import { configSvgIconsPlugin } from './svgSprite'
import { configVisualizerConfig } from './visualizer'
import { createPwaPlugin } from './pwa'

import type { PluginOption } from 'vite'

interface Options {
  isBuild: boolean
  root: string
  compress: string
  enableMock?: boolean
  enableAnalyze?: boolean
}

export async function createPlugins({
  isBuild,
  root,
  enableMock,
  compress,
  enableAnalyze,
}: Options) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    react(),
    // tailwindcss(),
    tsconfigPaths(),
  ]
  const appConfigPlugin = await createAppConfigPlugin({ root, isBuild })
  vitePlugins.push(appConfigPlugin)
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin({ isBuild }))
  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin({ isBuild }))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin({
        compress,
      }),
    )
    vitePlugins.push(createPwaPlugin())
  }
  if (enableAnalyze) {
    vitePlugins.push(configVisualizerConfig())
  }

  // vite-plugin-mock
  if (enableMock) {
    vitePlugins.push(configMockPlugin({ isBuild }))
  }
  vitePlugins.push(Inspect())
  return vitePlugins
}
