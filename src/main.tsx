import { createRoot } from 'react-dom/client'
// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// vercel analytics
import { Analytics } from '@vercel/analytics/react'
// react
import { Suspense } from 'react'
// helmet
// @ts-ignore
import { HelmetProvider } from 'react-helmet-async'

import Progress from './components/ProgressBar'
import App from './App.tsx'
import './styles/base.css'
// @ts-ignore
import 'virtual:svg-icons-register'

createRoot(document.getElementById('root')!).render(
	<HelmetProvider>
		<QueryClientProvider client={new QueryClient()}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			<Suspense>
				<Progress />
				<Analytics />
				<App />
			</Suspense>
		</QueryClientProvider>
	</HelmetProvider>
)
