import { Router } from '@reach/router'
import { useEffect, useState } from 'react'
import ToastContainer from './components/Toast/ToastContainer'
import { TaskProvider } from './context/TaskContext'
import { UserProvider } from './context/UserContext'
import { Dashboard, Login, Profile, Signup, Splash } from './screens'

export const App = () => {
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

	return (
		<div className='bg-bg-1 text-text-1 min-h-screen'>
			{isLoading ? (
				<Splash />
			) : (
				<UserProvider>
					<TaskProvider>
						<Router className='min-h-screen'>
							<Dashboard path='/' />
							<Profile path='/profile' />
							<Signup path='/signup' />
							<Login path='/login' />
						</Router>
					</TaskProvider>
				</UserProvider>
			)}
			<ToastContainer />
		</div>
	)
}
