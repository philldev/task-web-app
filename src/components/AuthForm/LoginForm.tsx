import Button from '../Button'
import FormInput from '../FormInput'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import { FC, useState } from 'react'
import supabase from '../../supabase'
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

	const onSubmit = async ({ email, password }: FormData) => {
		if (status !== 'loading') {
			setStatus('loading')
			let { data, error } = await supabase.auth.signIn({ email, password })
			if (error) {
				console.log(error.message)
				setErrorMsg(error.message)
				setStatus('error')
			}
			if (data) {
				setStatus('success')
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
			<div className='flex flex-col items-stretch gap-2 px-6'>
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
