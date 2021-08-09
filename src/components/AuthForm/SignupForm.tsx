import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuth } from '../../context/AuthContext'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import Button from '../Button'
import FormInput from '../FormInput'
import Spinner from '../Spinner'

const SignupSchema = yup.object({
	username: yup
		.string()
		.required('Username is required')
		.max(50, 'Username cannot be longer than 50 characters'),
	email: yup.string().required('Email is required').email('Email is Invalid'),
	password: yup
		.string()
		.required('Password us required')
		.min(6, 'Password should be at least 6 characters'),
})

type FormData = yup.InferType<typeof SignupSchema>

type StatusState = 'loading' | 'idle' | 'success' | 'error'

const SignupForm = () => {
	const [status, setStatus] = useState<StatusState>('idle')
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const resolver = useYupValidationResolver(SignupSchema)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		resolver,
	})

	const { signUp } = useAuth()

	const onSubmit = async ({ email, password, username }: FormData) => {
		if (status !== 'loading') {
			setStatus('loading')
			try {
				await signUp(email, password, { username })
				// setStatus('success')
			} catch (error) {
				setStatus('error')
				setErrorMsg(error.message)
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
			<div className='flex flex-col items-stretch gap-2 px-6'>
				<FormInput
					placeholder='Enter your username'
					label='Username'
					error={errors.username?.message}
					{...register('username')}
				/>
				<FormInput
					placeholder='Enter your email'
					label='Email'
					type='email'
					error={errors.email?.message}
					{...register('email')}
				/>
				<FormInput
					placeholder='Enter your password'
					label='Password'
					type='password'
					error={errors.password?.message}
					{...register('password')}
				/>
			</div>
			<div className='flex justify-center px-6 '>
				<Button>
					{status === 'loading' && (
						<Spinner size='xs' color='secondary' className='mr-2' />
					)}{' '}
					SIGNUP
				</Button>
			</div>
			{status === 'error' && (
				<div className='mx-6 bg-bg-danger text-accent-danger p-2 rounded-md'>
					{errorMsg}
				</div>
			)}
		</form>
	)
}

// const SuccessInfo = () => {
// 	return (
// 		<div className='px-6 mb-4'>
// 			<div className='bg-bg-success rounded-lg text-accent-success p-2 text-center flex flex-col items-center'>
// 				<svg
// 					xmlns='http://www.w3.org/2000/svg'
// 					className='h-10 w-10 mb-2'
// 					fill='none'
// 					viewBox='0 0 24 24'
// 					stroke='currentColor'
// 				>
// 					<path
// 						strokeLinecap='round'
// 						strokeLinejoin='round'
// 						strokeWidth={2}
// 						d='M5 13l4 4L19 7'
// 					/>
// 				</svg>
// 				<p>
// 					You are Successfully Signed up! <br /> please check your{' '}
// 					<strong className='underline'>email</strong> to confirm your account!
// 				</p>
// 			</div>
// 		</div>
// 	)
// }

export default SignupForm
