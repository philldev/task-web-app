import { Link, RouteComponentProps, useNavigate } from "@reach/router"
import { useEffect } from "react"
import ForgotPassForm from "../components/AuthForm/ForgotPasswordForm"
import { useAuth } from "../context/AuthContext"


const ForgotPassword = (props: RouteComponentProps) => {
	const { session } = useAuth()

	const navigate = useNavigate()

	useEffect(() => {
		if (session) {
			navigate('/')
		}
	}, [session, navigate])

	return (
		<div className='min-h-screen'>
			<div className='pt-20 max-w-lg w-full mx-auto'>
				<h1 className='text-4xl font-bold text-center px-2 mb-12'>LOGIN</h1>
				<ForgotPassForm />
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

export default ForgotPassword