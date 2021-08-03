import { Router } from '@reach/router'
import { useEffect, useState } from 'react'
import { Dashboard, Login, Profile, Signup, Splash } from './screens'

export const App = () => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		let mounted = true

		setIsLoading(true)

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
				<Router className='min-h-screen'>
					<Dashboard path='/' />
					<Login path='/login' />
					<Signup path='/signup' />
					<Profile path='/profile' />
				</Router>
			)}
		</div>
	)
}
