import { VitePWA } from 'vite-plugin-pwa'
export const createPwaPlugin = () => {
	return VitePWA({
		base: '/',
		registerType: 'autoUpdate',
		scope: '/',
		includeAssets: ['favicon.ico'],
		manifest: {
			name: 'Vite-React-TS',
			short_name: 'Vite-React-TS',
			description: 'Vite-React-TS',
			theme_color: '#ffffff'
		}
	})
}
