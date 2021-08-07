import { useNavigate } from '@reach/router'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useToast } from '../../context/ToastContext'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import supabase from '../../supabase'
import Button from '../Button'
import FormInput from '../FormInput'
import Spinner from '../Spinner'

const ResetPassSchema = yup.object({
	password: yup
		.string()
		.required('Password is required')
		.min(5, 'Password must be longer than 5 characters'),
})

type FormData = yup.InferType<typeof ResetPassSchema>
type StatusState = 'loading' | 'idle' | 'success' | 'error'

interface Props {
	accessToken?: string | null
}

const ResetPasswordForm: FC<Props> = ({ accessToken }) => {
	const [status, setStatus] = useState<StatusState>('idle')
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const resolver = useYupValidationResolver(ResetPassSchema)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		reValidateMode: 'onChange',
		resolver,
	})

	const { dispatch } = useToast()

	const navigate = useNavigate()

	const onSubmit = async ({ password }: FormData) => {
		if (status !== 'loading' && accessToken) {
			setStatus('loading')
			let { data, error } = await supabase.auth.api.updateUser(accessToken, {
				password,
			})
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
						message: `Success!`,
						type: 'SUCCESS',
					},
				})
				navigate('/login')
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
			<div className='grid items-stretch gap-2 px-6'>
				<FormInput
					placeholder='Enter your password'
					label='New Password'
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
					Reset Password
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

export default ResetPasswordForm
