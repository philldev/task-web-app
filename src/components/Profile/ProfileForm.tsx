import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import FormInput from '../FormInput'
import Spinner from '../Spinner'
import AvatarForm from './AvatarForm'
import UsernameForm from './UsernameForm'

const ProfileForm = () => {
	const { user, userLoaded } = useUser()
	const {signOut} =useAuth()

	const logout = async () => {
		await signOut()
	}

	if (!userLoaded) {
		return (
			<div className='flex flex-col px-6 pt-10 flex-1 flex-shrink-0 flex-grow items-center justify-center'>
				<Spinner size='lg' />
			</div>
		)
	}

	return (
		<div className='relative flex flex-col px-2 pt-4 flex-1 flex-shrink-0 flex-grow'>
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
