import { Link, RouteComponentProps, useNavigate } from '@reach/router'
import { useEffect } from 'react'
import Avatar from '../components/Avatar'
import Navbar from '../components/Navbar'
import TaskInbox from '../components/Task/TaskInbox'
import { useAuth } from '../context/AuthContext'

const Dashboard = (props: RouteComponentProps) => {
	const { authUser } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!authUser) {
			navigate('/login')
		}
	}, [authUser, navigate])
	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar
				title='Dashboard'
				left={
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-8 w-8 text-accent-primary'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z'
							clipRule='evenodd'
						/>
					</svg>
				}
				right={
					<Link to='/profile'>
						<Avatar />
					</Link>
				}
			/>
			<TaskInbox />
		</div>
	)
}

export default Dashboard
