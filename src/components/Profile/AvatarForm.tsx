import * as yup from 'yup'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import Button from '../Button'
import Spinner from '../Spinner'
import { useUser } from '../../context/UserContext'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useToast } from '../../context/ToastContext'
import firebase from '../../firebase'

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
	const { user, updateUserDetails } = useUser()
	const [tempImgUrl, setTempImgUrl] = useState(user?.avatarUrl)
	const [status, setStatus] = useState<StatusState>('idle')
	const [uploadProgress, setUploadProgress] = useState<number | null>(null)
	const { dispatch } = useToast()
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
			setStatus('loading')

			let storageRef = firebase.storage().ref()
			let userAvatarRef = storageRef.child(`avatars/${user?.id}.jpg`)

			let uploadTask = userAvatarRef.put(data.image[0])

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					setUploadProgress(progress)
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused')
							break
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running')
							break
					}
				},
				(error) => {
					setStatus('error')
					dispatch({
						TYPE: 'ERROR',
						PAYLOAD: { message: error.message, type: 'ERROR' },
					})
				},
				() => {
					uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
						try {
							await updateUserDetails({ avatarUrl: downloadURL })
							setStatus('success')
							setStatus('idle')
							setUploadProgress(null)
						} catch (error) {
							setStatus('error')
							console.log(error.message)
							dispatch({
								TYPE: 'ERROR',
								PAYLOAD: { message: error.message, type: 'ERROR' },
							})
						}
					})
				}
			)
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
			<div className='w-max rounded-full relative overflow-hidden'>
				<input
					{...register('image')}
					type='file'
					className='absolute inset-0 w-full h-full block opacity-0'
					accept='image/*'
				/>
				{uploadProgress ? (
					<div
						className='absolute inset-0 bg-accent-primary opacity-40'
						style={{
							height: `${uploadProgress}%`,
						}}
					/>
				) : null}
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
			{user && user.avatarUrl !== tempImgUrl ? (
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
