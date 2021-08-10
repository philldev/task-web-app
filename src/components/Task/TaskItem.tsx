import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment, useState } from 'react'
import { Task } from '../../context/TaskContext'
import Checkbox from '../Checkbox'
import DeleteTaskForm from './DeleteTaskForm'
import UpdateTaskForm from './UpdateTaskForm'

interface Props {
	task: Task
	onUpdate: ({ task, id }: { task: Partial<Task>; id: string }) => void
	onDelete: ({ id }: { id: string }) => void
}

const TaskItem: FC<Props> = ({ task, onUpdate, onDelete }) => {
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	const taskId = task.id

	const toggleEditModal = () => setIsEditOpen((p) => !p)
	const toggleDeleteModal = () => setIsDeleteOpen((p) => !p)

	const handleToggleIsCompleted = () => {
		onUpdate({ task: { isCompleted: !task.isCompleted }, id: taskId })
	}
	const handleUpdateText = (text: string) => {
		onUpdate({ task: { text }, id: taskId })
	}
	const handleDelete = () => {
		onDelete({ id: taskId })
	}

	return (
		<>
			<div
				className={`flex group cursor-pointer select-none relative p-2 border border-transparent hover:border-border-1 rounded-lg`}
			>
				<Checkbox
					className='mr-2'
					checked={task.isCompleted}
					onClick={(e) => {
						e.stopPropagation()
						handleToggleIsCompleted()
					}}
				/>
				<p
					className={`select-text ${
						task.isCompleted ? 'line-through text-text-2' : ''
					} transition-all`}
				>
					{task.text}
				</p>
				<Menu>
					{({ open }) => (
						<>
							<Menu.Button
								className={`group-hover:opacity-100 ${
									open ? 'opacity-100' : 'opacity-0'
								} absolute right-2`}
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
										d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
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
								<Menu.Items className='absolute right-0 top-8 w-40 origin-top-right bg-white divide-y divide-border-1 rounded-md shadow-lg focus:outline-none bg-bg-2 z-20'>
									<div className='px-1 py-1 '>
										<Menu.Item onClick={toggleEditModal}>
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
										<Menu.Item onClick={toggleDeleteModal}>
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
						</>
					)}
				</Menu>
			</div>
			<UpdateTaskForm
				isOpen={isEditOpen}
				onClose={toggleEditModal}
				onUpdate={handleUpdateText}
				{...{ task }}
			/>
			<DeleteTaskForm
				isOpen={isDeleteOpen}
				onClose={toggleDeleteModal}
				onDelete={handleDelete}
			/>
		</>
	)
}

export default TaskItem
