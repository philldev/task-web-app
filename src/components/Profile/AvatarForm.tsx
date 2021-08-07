import { useUser } from '../../context/UserContext'
import * as yup from 'yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import Button from '../Button'
import Spinner from '../Spinner'
import { useEffect } from 'react'
import supabase from '../../supabase'
import { useToast } from '../../context/ToastContext'

const FILE_SIZE = 1048576 // 1mb
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

const AvatarFormSchema = yup.object({
	image: yup
		.mixed()
		.required('A file is required')
		.test(
			'fileSize',
			'File too large',
			(value: FileList) => value && value[0].size <= FILE_SIZE
		)
		.test(
			'fileFormat',
			'Unsupported Format',
			(value: FileList) => value && SUPPORTED_FORMATS.includes(value[0].type)
		),
})

type AvatarFormData = {
	image: FileList
}
type StatusState = 'loading' | 'idle' | 'success' | 'error'

const AvatarForm = () => {
	const { dispatch } = useToast()
	const { user, updateUserDetails } = useUser()
	const [tempImgUrl, setTempImgUrl] = useState(user?.avatarUrl)
	const [status, setStatus] = useState<StatusState>('idle')
	const resolver = useYupValidationResolver(AvatarFormSchema)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<AvatarFormData>({
		resolver,
	})

	const onSubmit = async (data: AvatarFormData) => {
		if (status !== 'loading' && user) {
			const file = data.image[0]
			const fileExt = file.name.split('.').pop()
			const fileName = `${user.id}-${Date.now()}.${fileExt}`
			const filePath = `${fileName}`

			setStatus('loading')

			let { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, file)

			if (uploadError) {
				setStatus('error')
				dispatch({
					TYPE: 'ERROR',
					PAYLOAD: { type: 'ERROR', message: uploadError.message },
				})
			} else {
				const { data: downloadData, error: downloadError } = supabase.storage
					.from('avatars')
					.getPublicUrl(filePath)

				console.log(downloadData, downloadError)

				if (downloadError) {
					setStatus('error')
					dispatch({
						TYPE: 'ERROR',
						PAYLOAD: { type: 'ERROR', message: downloadError.message },
					})
				}

				if (downloadData) {
					let avatar_url = downloadData?.publicURL
					updateUserDetails({ avatarUrl: avatar_url })

					let { error: updateProfileErr } = await supabase
						.from('profiles')
						.update({
							avatar_url,
						})
						.match({ id: user.id })

					if (updateProfileErr) {
						setStatus('error')
						dispatch({
							TYPE: 'ERROR',
							PAYLOAD: { type: 'ERROR', message: updateProfileErr.message },
						})
					} else {
						setStatus('success')
						setTempImgUrl(avatar_url)
						dispatch({
							TYPE: 'SUCCESS',
							PAYLOAD: {
								type: 'SUCCESS',
								message: 'Avatar successfully updated!',
							},
						})
					}
				}
			}
		}
	}

	const image = watch('image')

	useEffect(() => {
		if (!errors.image && image && image[0]) {
			let imageURL = URL.createObjectURL(image[0])
			setTempImgUrl(imageURL)
		}
	}, [image, errors])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='grid gap-1'>
			<label className='text-sm font-bold text-text-2'>Avatar</label>
			<div className='w-max rounded-full relative'>
				<input
					{...register('image')}
					type='file'
					className='absolute inset-0 w-full h-full block opacity-0'
					accept='image/*'
				/>
				{tempImgUrl ? (
					<img
						className='h-20 w-20 object-cover rounded-full border-2 border-accent-primary'
						src={tempImgUrl}
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
			{user && (user.avatarUrl !== tempImgUrl) ? (
				<div
					className={`flex absolute bottom-0 p-6 w-full left-0 border-border-1 border-t`}
				>
					<Button
						type='button'
						variant='outlined'
						color='secondary'
						className='mr-2'
						onClick={() => setTempImgUrl(user.avatarUrl)}
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

export default AvatarForm
