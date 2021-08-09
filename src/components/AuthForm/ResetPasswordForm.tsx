import { useLocation, useNavigate } from '@reach/router'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuth } from '../../context/AuthContext'
import { useFirebase } from '../../context/FirebaseContext'
import { useToast } from '../../context/ToastContext'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
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

const ResetPasswordForm: FC = () => {
	const [oobCode, setOobCode] = useState<string | null>(null)
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
		if (status !== 'loading' && oobCode) {
			console.log(oobCode)
			setStatus('loading')
			try {
				await firebase.auth().verifyPasswordResetCode(oobCode)
				await firebase.auth().confirmPasswordReset(oobCode, password)
				dispatch({
					TYPE: 'SUCCESS',
					PAYLOAD: {
						message: `Successfully updated your password`,
						type: 'SUCCESS',
					},
				})
			} catch (error) {
				console.log(error)
				setErrorMsg(error.message ?? `Something went wrong!`)
				setStatus('error')
			}
		}
	}

	const { authUser } = useAuth()
	const firebase = useFirebase()
	const location = useLocation()

	useEffect(() => {
		if (authUser) {
			navigate('/')
		}
	}, [authUser, navigate])

	useEffect(() => {
		let params = new URLSearchParams(location.search)
		let oobCode = params.get('oobCode')
		if (oobCode) {
			setOobCode(oobCode)
		} else {
			navigate('/login')
		}
	}, [location, navigate, firebase])

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
