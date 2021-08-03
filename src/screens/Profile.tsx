import { RouteComponentProps, useNavigate } from '@reach/router'
import { useEffect } from 'react'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import supabase from '../supabase'

const Profile = (props: RouteComponentProps) => {
	const { session } = useAuth()
	const navigate = useNavigate()
	
	useEffect(() => {
		if (!session) {
			navigate('/login')
		}
	}, [session, navigate])

	const logout = async () => {
		await supabase.auth.signOut()
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar
				title='Profile'
				left={
					<button onClick={() => props.navigate && props.navigate('/')}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 19l-7-7m0 0l7-7m-7 7h18'
							/>
						</svg>
					</button>
				}
				right={
					<img
						className='h-8 w-8 object-cover rounded-full border border-accent-primary'
						src='https://images.unsplash.com/photo-1627559062130-a7bf86a1fed5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
						alt='avatar'
					/>
				}
			/>
			<div className='flex flex-col px-6 pt-10 flex-1 flex-shrink-0 flex-grow'>
				<div className='flex-1'>
					<div className='grid gap-4 mb-8'>
						<FormInput label='Username' defaultValue='JohnDoe' />
						<div className='grid gap-1'>
							<label className='text-sm font-bold text-text-2'>Avatar</label>
							<img
								className='h-20 w-20 object-cover rounded-full border-2 border-accent-primary'
								src='https://images.unsplash.com/photo-1627559062130-a7bf86a1fed5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
								alt='avatar'
							/>
						</div>
						<FormInput label='Email' defaultValue='johndoe@mail.com' disabled />
						<FormInput
							label='Password'
							defaultValue='test123123'
							type='password'
							disabled
						/>
					</div>
					<div className='grid justify-start justify-items-start'>
						<button className='text-base font-bold underline text-accent-primary'>
							Change Email
						</button>
						<button className='text-base font-bold underline text-accent-primary'>
							Change Password
						</button>
						<button className='text-base font-bold underline' onClick={logout}>
							Logout
						</button>
					</div>
				</div>
				<div className='absolute bottom-0 p-6 w-full left-0 border-border-1 border-t'>
					<Button className='w-full'>Update</Button>
				</div>
			</div>
		</div>
	)
}

export default Profile
