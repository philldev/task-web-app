import { Link } from '@reach/router'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuth } from '../../context/AuthContext'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import Button from '../Button'
import FormInput from '../FormInput'
import Spinner from '../Spinner'

const LoginSchema = yup.object({
	email: yup.string().required('Email is required').email('Email is Invalid'),
	password: yup
		.string()
		.required('Password is required')
		.min(5, 'Password must be longer than 5 characters'),
})

type FormData = yup.InferType<typeof LoginSchema>
type StatusState = 'loading' | 'idle' | 'success' | 'error'

const LoginForm: FC = () => {
	const [status, setStatus] = useState<StatusState>('idle')
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const resolver = useYupValidationResolver(LoginSchema)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		reValidateMode: 'onChange',
		resolver,
	})

	const { signIn } = useAuth()

	const onSubmit = async ({ email, password }: FormData) => {
		if (status !== 'loading') {
			setStatus('loading')
			try {
				await signIn(email, password)
				setStatus('success')
			} catch (error) {
				console.log(error.message)
				setErrorMsg(error.message)
				setStatus('error')
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
			<div className='grid items-stretch gap-2 px-6'>
				<FormInput
					error={errors.email?.message}
					{...register('email')}
					placeholder='Enter your email'
					label='Email'
				/>
				<FormInput
					placeholder='Enter your password'
					label='Password'
					type='password'
					autoComplete='true'
					error={errors.password?.message}
					{...register('password')}
				/>
				<Link to='/forgot-password'>Forgot Password</Link>
			</div>
			<div className='flex justify-center px-6'>
				<Button>
					{status === 'loading' && (
						<Spinner size='xs' className='mr-2' color='secondary' />
					)}{' '}
					LOGIN
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

export default LoginForm
