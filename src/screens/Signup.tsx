import { Link, RouteComponentProps, useNavigate } from '@reach/router'
import { useEffect } from 'react'
import SignupForm from '../components/AuthForm/SignupForm'
import { useAuth } from '../context/AuthContext'

const Signup = (props: RouteComponentProps) => {
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
				<h1 className='text-4xl font-bold text-center px-2 mb-12'>SIGNUP</h1>
				<SignupForm />
			</div>
			<div className='mt-16 flex flex-col items-center text-sm text-text-2'>
				<p>Have an account?</p>
				<Link
					to='/login'
					className='text-accent-primary font-bold text-sm underline'
				>
					Login
				</Link>
			</div>
		</div>
	)
}

export default Signup
