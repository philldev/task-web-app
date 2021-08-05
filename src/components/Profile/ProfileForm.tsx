import { useUser } from '../../context/UserContext'
import supabase from '../../supabase'
import FormInput from '../FormInput'
import Spinner from '../Spinner'
import AvatarForm from './AvatarForm'
import UsernameForm from './UsernameForm'

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
					<UsernameForm />
					<FormInput label='Email' defaultValue={user?.email} disabled />
					<AvatarForm />
				</div>
				<div className='grid justify-start gap-2 justify-items-start'>
					<button className='text-base font-bold underline' onClick={logout}>
						Logout
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProfileForm
