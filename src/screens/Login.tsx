import { Link, RouteComponentProps } from '@reach/router'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from '../hooks/useYupValidationResolver'

const LoginSchema = yup.object({
	email: yup.string().required('Email is required').email('Email is Invalid'),
	password: yup
		.string()
		.required('Password is required')
		.min(5, 'Password must be longer than 5 characters'),
})

type FormData = yup.InferType<typeof LoginSchema>

const Login = (props: RouteComponentProps) => {
	const resolver = useYupValidationResolver(LoginSchema)

	const {
		handleSubmit,
		register,

		formState: { errors, touchedFields },
	} = useForm<FormData>({
		reValidateMode: 'onChange',
		resolver,
	})
	const onSubmit = (data: FormData) => {
		console.log(data)
	}
	return (
		<div className='min-h-screen'>
			<div className='pt-20'>
				<h1 className='text-4xl font-bold text-center px-2 mb-12'>LOGIN</h1>
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
							error={errors.password?.message}
							{...register('password')}
						/>
					</div>
					<div className='flex justify-center px-6'>
						<Button>LOGIN</Button>
					</div>
				</form>
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
