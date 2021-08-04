import { Link, RouteComponentProps } from '@reach/router'
import { useState } from 'react'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import IconButton from '../components/IconButton'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'
import TaskItem from '../components/TaskItem'
import { useToast } from '../context/ToastContext'

const Dashboard = (props: RouteComponentProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { dispatch } = useToast()
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
			<div className='px-6 pt-5 flex-1 flex-shrink-0 flex-grow'>
				<div className='flex flex-col gap-2 border-b border-border-1 pb-2'>
					<div className='flex items-center gap-2'>
						<h3 className='text-2xl font-bold'>March 9, 2020</h3>{' '}
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
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					</div>
					<p className='text-sm text-text-2'>0 Tasks</p>
				</div>
				<div className='pt-4'>
					<div className='grid gap-4'>
						<TaskItem />
						<TaskItem />
						<TaskItem />
					</div>
					<IconButton
						onClick={() => {
							setIsOpen(true)
							dispatch({
								TYPE: 'SUCCESS',
								PAYLOAD: {
									autoCloseInterval: 1000,
									message: 'test',
									type: 'SUCCESS',
								},
							})
						}}
						className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-8 w-8 text-text-button'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 4v16m8-8H4'
							/>
						</svg>
					</IconButton>
					<Modal onClose={() => setIsOpen(false)} {...{ isOpen }}>
						<div className='grid gap-4 '>
							<FormInput placeholder='Enter new task' />
							<div className='flex gap-4 justify-end'>
								<Button
									onClick={() => setIsOpen(false)}
									variant='outlined'
									color='secondary'
								>
									Cancel
								</Button>
								<Button>Add Task</Button>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
