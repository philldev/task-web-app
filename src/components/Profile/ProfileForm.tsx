import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useUser } from '../../context/UserContext'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import supabase from '../../supabase'
import Button from '../Button'
import FormInput from '../FormInput'
import Spinner from '../Spinner'

const ProfileForm = () => {
	const { user, userLoaded } = useUser()

	const logout = async () => {
		await supabase.auth.signOut()
	}

	if (!userLoaded) {
		return (
			<div className='max-w-lg w-full mx-auto flex flex-col px-6 pt-10 flex-1 flex-shrink-0 flex-grow items-center justify-center'>
				<Spinner size='lg' />
			</div>
		)
	}

	return (
		<div className='relative max-w-lg w-full mx-auto flex flex-col px-6 pt-10 flex-1 flex-shrink-0 flex-grow'>
			<div className='flex-1'>
				<div className='grid gap-4 mb-8'>
					<ChangeUsernameForm />
					<FormInput label='Email' defaultValue={user?.email} disabled />
					<div className='grid gap-1'>
						<label className='text-sm font-bold text-text-2'>Avatar</label>
						{user?.avatar_url ? (
							<img
								className='h-20 w-20 object-cover rounded-full border-2 border-accent-primary'
								src={user?.avatar_url}
								alt='avatar'
							/>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-20 w-20 object-cover rounded-full border-2 border-accent-primary'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						)}
					</div>
				</div>
				<div className='grid justify-start gap-2 justify-items-start'>
					<button className='text-base font-bold underline' onClick={logout}>
						Reset Password
					</button>
					<button className='text-base font-bold underline' onClick={logout}>
						Logout
					</button>
				</div>
			</div>
		</div>
	)
}

const UsernameSchema = yup.object({
	username: yup.string().required().min(0, 'Username not valid'),
})

type UsernameFormData = yup.InferType<typeof UsernameSchema>

type StatusState = 'loading' | 'idle' | 'success' | 'error'
const ChangeUsernameForm = () => {
	const { updateUserDetails, user } = useUser()
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
			}

			if (data) {
				setStatus('success')
				setStatus('idle')
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

export default ProfileForm
