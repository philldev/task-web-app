import { Link, RouteComponentProps, useNavigate } from '@reach/router'
import { useEffect } from 'react'
import LoginForm from '../components/AuthForm/LoginForm'
import { useAuth } from '../context/AuthContext'

const Login = (props: RouteComponentProps) => {
	const { session } = useAuth()

	const navigate = useNavigate()

	useEffect(() => {
		if (session) {
			navigate('/')
		}
	}, [session, navigate])

	return (
		<div className='min-h-screen'>
			<div className='pt-20'>
				<h1 className='text-4xl font-bold text-center px-2 mb-12'>LOGIN</h1>
				<LoginForm />
			</div>
			<div className='mt-16 flex flex-col items-center text-sm text-text-2'>
				<p>Don't have an account?</p>
				<Link
					to='/signup'
					className='text-accent-primary font-bold text-sm underline'
				>
					Create Account
				</Link>
			</div>
		</div>
	)
}

export default Login
