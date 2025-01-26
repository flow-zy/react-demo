import { useCallback, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useRouter } from '../hooks'

import PageError from '@/views/Exception/404'
import { TOKEN_KEY } from '@/enums/cacheEnum'

interface Props {
	children: React.ReactNode
}
export default function ProtectedRoute({ children }: Props) {
	const router = useRouter()
	const accessToken = localStorage.getItem(TOKEN_KEY)
	const check = useCallback(() => {
		if (!accessToken) {
			router.replace('/login')
		}
	}, [router, accessToken])

	useEffect(() => {
		check()
	}, [check])

	return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
}
