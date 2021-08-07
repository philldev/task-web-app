import Button from '../Button'
import FormInput from '../FormInput'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import { FC, useState } from 'react'
import supabase from '../../supabase'
import Spinner from '../Spinner'
import { useToast } from '../../context/ToastContext'

const ForgotPassSchema = yup.object({
	email: yup.string().required('Email is required').email('Email is Invalid'),
})

type FormData = yup.InferType<typeof ForgotPassSchema>
type StatusState = 'loading' | 'idle' | 'success' | 'error'

const ForgotPassForm: FC = () => {
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

	const { dispatch } = useToast()

	const onSubmit = async ({ email }: FormData) => {
		if (status !== 'loading') {
			setStatus('loading')
			let { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
			if (error) {
				console.log(error.message)
				setErrorMsg(error.message)
				setStatus('error')
			}
			if (data) {
				setStatus('success')
				dispatch({
					TYPE: 'SUCCESS',
					PAYLOAD: {
						message: `We've sent you a recovery password Link. Please check your email`,
						type: 'SUCCESS',
					},
				})
				reset()
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
			{status === 'error' && (
				<div className='mx-6 bg-bg-danger text-accent-danger p-2 rounded-md'>
					{errorMsg}
				</div>
			)}
		</form>
	)
}

export default ForgotPassForm
