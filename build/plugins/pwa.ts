import { VitePWA } from 'vite-plugin-pwa'

export function createPwaPlugin() {
  return VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    manifest: {
      name: 'Vite-React-TS',
      short_name: 'Vite-React-TS',
      description: 'Vite-React-TS',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/react-domo/vite.svg',
          sizes: '192x192',
          type: 'image/svg+xml',
        },
      ],

    },
    devOptions: {
      enabled: true,
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // Workbox 缓存策略配置
    },
  })
}
