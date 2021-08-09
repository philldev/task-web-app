import {
	Link,
	RouteComponentProps
} from '@reach/router'
import ResetPasswordForm from '../components/AuthForm/ResetPasswordForm'

const ResetPassword = (props: RouteComponentProps) => {


	return (
		<div className='min-h-screen'>
			<div className='pt-20 max-w-lg w-full mx-auto'>
				<h1 className='text-4xl font-bold text-center px-2 mb-12'>
					Reset Password
				</h1>
				<ResetPasswordForm />
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
