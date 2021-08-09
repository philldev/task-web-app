import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useFirebase } from '../../context/FirebaseContext'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import Button from '../Button'
import FormInput from '../FormInput'
import Spinner from '../Spinner'

const ForgotPassSchema = yup.object({
	email: yup.string().required('Email is required').email('Email is Invalid'),
})

type FormData = yup.InferType<typeof ForgotPassSchema>
type StatusState = 'loading' | 'idle' | 'success' | 'error'

const ForgotPassForm: FC = () => {
	const firebase = useFirebase()
	const [status, setStatus] = useState<StatusState>('idle')
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const resolver = useYupValidationResolver(ForgotPassSchema)
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		reValidateMode: 'onChange',
		resolver,
	})

	const onSubmit = async ({ email }: FormData) => {
		console.log(email)
		if (status !== 'loading') {
			setStatus('loading')
			try {
				await firebase.auth().sendPasswordResetEmail(email)
				setStatus('success')
				reset()
			} catch (error) {
				setStatus('error')
				setErrorMsg(error.message ?? 'Something went wrong!')
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
			</div>
			<div className='flex justify-center px-6'>
				<Button>
					{status === 'loading' && (
						<Spinner size='xs' className='mr-2' color='secondary' />
					)}{' '}
					Send Recovery Email
				</Button>
			</div>
			{status === 'error' ? (
				<div className='mx-6 bg-bg-danger text-accent-danger p-2 rounded-md'>
					{errorMsg}
				</div>
			) : null}
			{status === 'success' ? (
				<div className='mx-6 bg-bg-success text-accent-success p-2 rounded-md'>
					We've successfully sent you a password reset link to your email!
				</div>
			) : null}
		</form>
	)
}

export default ForgotPassForm
