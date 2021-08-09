import { Router } from '@reach/router'
import { useEffect, useState } from 'react'
import ToastContainer from './components/Toast/ToastContainer'
import { TasksProvider } from './context/TaskContext'
import { UserProvider } from './context/UserContext'
import { Dashboard, Login, Profile, Signup, Splash } from './screens'
import ForgotPassword from './screens/ForgotPassword'
import ResetPassword from './screens/ResetPassword'

const App = () => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		let mounted = true

		setTimeout(() => {
			if (mounted) {
				setIsLoading(false)
			}
		}, 1000)

		return () => {
			mounted = false
		}
	}, [])

	useEffect(() => {
		const hash = window.location.hash.slice(1)

		const queryParams = hash.split('&').reduce((res, item) => {
			let parts = item.split('=')
			return {
				...res,
				[parts[0]]: parts[1],
			}
		}, {}) as any

		if (queryParams.type === 'recovery' && queryParams.access_token) {
			window.location.replace(
				`/reset-password?access-token=${queryParams.access_token}`
			)
		}

	}, [isLoading])

	return (
		<div className='bg-bg-1 text-text-1 min-h-screen'>
			{isLoading ? (
				<Splash />
			) : (
				<UserProvider>
					<TasksProvider>
						<Router className='min-h-screen'>
							<Dashboard path='/' />
							<Profile path='/profile' />
							<Signup path='/signup' />
							<Login path='/login' />
							<ForgotPassword path='/forgot-password' />
							<ResetPassword path='/reset-password' />
						</Router>
					</TasksProvider>
				</UserProvider>
			)}
			<ToastContainer />
		</div>
	)
}

export default App
