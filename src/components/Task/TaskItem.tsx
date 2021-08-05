import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment, useRef } from 'react'
import { useState } from 'react'
import { Task, useTask } from '../../context/TaskContext'
import useOnClickOutside from '../../hooks/useClickOutside'
import Checkbox from '../Checkbox'
import DeleteTaskForm from './DeleteTaskForm'
import UpdateTaskForm from './UpdateTaskForm'

interface Props {
	task: Task
}

const TaskItem: FC<Props> = ({ task }) => {
	const [editing, setEditing] = useState(false)

	const { updateTask } = useTask()

	let ref = useRef(null)
	useOnClickOutside(ref, () => {
		setEditing(false)
	})

	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	return (
		<>
			<div
				className={`flex relative ${
					editing ? 'p-2 border border-border-1 rounded-lg' : ''
				}`}
				onClick={(e) => {
					setEditing(true)
				}}
				{...{ ref }}
			>
				<Checkbox
					className='mr-2'
					checked={task.isCompleted}
					onClick={(e) => {
						e.stopPropagation()
						updateTask({ task: { ...task, isCompleted: !task.isCompleted } })
					}}
				/>
				<p
					className={`${
						task.isCompleted ? 'line-through text-text-2' : ''
					} transition-all`}
				>
					{task.text}
				</p>
				{editing && (
					<div className='absolute right-2'>
						<Menu>
							<Menu.Button>
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
										d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
									/>
								</svg>
							</Menu.Button>
							<Transition
								as={Fragment}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'
							>
								<Menu.Items
									unmount={false}
									className='absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-border-1 rounded-md shadow-lg focus:outline-none bg-bg-2 z-20'
								>
									<div className='px-1 py-1 '>
										<Menu.Item onClick={() => setIsEditOpen(true)}>
											{({ active }) => (
												<button
													className={`${
														active
															? 'bg-violet-500 text-white'
															: 'text-gray-900'
													} group flex rounded-md items-center w-full px-2 py-2 gap-2 text-sm`}
												>
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
															d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
														/>
													</svg>
													Edit
												</button>
											)}
										</Menu.Item>
									</div>
									<div className='px-1 py-1 '>
										<Menu.Item onClick={() => setIsDeleteOpen(true)}>
											{({ active }) => (
												<button
													className={`${
														active
															? 'bg-violet-500 text-white'
															: 'text-gray-900'
													} group flex rounded-md items-center w-full px-2 py-2 gap-2 text-sm`}
												>
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
															d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
														/>
													</svg>
													Delete
												</button>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				)}
			</div>
			<UpdateTaskForm
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				{...{ task }}
			/>
			<DeleteTaskForm
				isOpen={isDeleteOpen}
				onClose={() => setIsDeleteOpen(false)}
				{...{ task }}
			/>
		</>
	)
}

export default TaskItem
