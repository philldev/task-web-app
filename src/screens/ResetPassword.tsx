import {
	Link,
	RouteComponentProps,
	useLocation,
	useNavigate
} from '@reach/router'
import { useEffect, useState } from 'react'
import ResetPasswordForm from '../components/AuthForm/ResetPasswordForm'
import { useAuth } from '../context/AuthContext'

const ResetPassword = (props: RouteComponentProps) => {
	const { session } = useAuth()

	const navigate = useNavigate()

	const [accessToken, setAccessToken] = useState<string | null>(null)

	const location = useLocation()

	useEffect(() => {
		if (session) {
			navigate('/')
		}
	}, [session, navigate])

	useEffect(() => {
		let params = new URLSearchParams(location.search)
		let token = params.get('access-token')
		if (token) {
			setAccessToken(token)
		} else {
			navigate('/login')
		}
	}, [location, navigate])

	return (
		<div className='min-h-screen'>
			<div className='pt-20 max-w-lg w-full mx-auto'>
				<h1 className='text-4xl font-bold text-center px-2 mb-12'>
					Reset Password
				</h1>
				<ResetPasswordForm accessToken={accessToken} />
			</div>
			<div className='mt-16 flex flex-col items-center text-sm text-text-2'>
				<Link
					to='/login'
					className='text-accent-primary font-bold text-sm underline'
				>
					Back to Login
				</Link>
			</div>
		</div>
	)
}

export default ResetPassword
