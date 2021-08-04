import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from '../../context/UserContext'
import { useToast } from '../../context/ToastContext'
import * as yup from 'yup'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import supabase from '../../supabase'
import Button from '../Button'
import FormInput from '../FormInput'
import Spinner from '../Spinner'

const UsernameSchema = yup.object({
	username: yup.string().required().min(0, 'Username not valid'),
})

type UsernameFormData = yup.InferType<typeof UsernameSchema>
type StatusState = 'loading' | 'idle' | 'success' | 'error'

const UsernameForm = () => {
	const { updateUserDetails, user } = useUser()
	const { dispatch } = useToast()
	const [status, setStatus] = useState<StatusState>('idle')
	const resolver = useYupValidationResolver(UsernameSchema)
	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = useForm<UsernameFormData>({
		resolver,

		defaultValues: {
			username: user?.username,
		},
	})
	const onSubmit = async (formData: UsernameFormData) => {
		if (status !== 'loading' && getValues('username') !== user?.username) {
			setStatus('loading')
			const { error, data } = await supabase
				.from('profiles')
				.update({ ...formData })
				.match({ id: user!.id })
			if (error) {
				setStatus('error')
				dispatch({
					TYPE: 'ERROR',
					PAYLOAD: {
						message: error.message,
						type: 'ERROR',
					},
				})
			}

			if (data) {
				setStatus('success')
				dispatch({
					TYPE: 'SUCCESS',
					PAYLOAD: {
						message: 'Username successfully updated',
						type: 'SUCCESS',
					},
				})
				updateUserDetails({ username: formData.username })
			}
		}
	}

	const username = watch('username')

	useEffect(() => {
		if (user) {
			setValue('username', user.username)
		}
	}, [user, setValue])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				error={errors.username?.message}
				{...register('username')}
				label='Username'
			/>
			{user && user.username !== username ? (
				<div
					className={`flex absolute bottom-0 p-6 w-full left-0 border-border-1 border-t`}
				>
					<Button
						type='button'
						variant='outlined'
						color='secondary'
						className='mr-2'
						onClick={() => setValue('username', user?.username ?? '')}
					>
						Cancel
					</Button>
					<Button className='w-full'>
						{status === 'loading' && (
							<Spinner size='xs' color='secondary' className='mr-2' />
						)}{' '}
						Update
					</Button>
				</div>
			) : null}
		</form>
	)
}

export default UsernameForm
