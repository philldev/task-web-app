import { RouteComponentProps, useNavigate } from '@reach/router'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProfileForm from '../components/Profile/ProfileForm'
import { useAuth } from '../context/AuthContext'

const Profile = (props: RouteComponentProps) => {
	const { session } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!session) {
			navigate('/login')
		}
	}, [session, navigate])


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
				<ProfileForm />
		</div>
	)
}

export default Profile
