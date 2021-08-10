import { Menu, Transition } from '@headlessui/react'
import {
	DotsHorizontalIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/outline'
import { Fragment } from 'react'

type Props = {
	openDeleteModal: () => void
	openEditModal: () => void
}

const TaskItemOptions = ({ openDeleteModal, openEditModal }: Props) => {
	return (
		<Menu>
			{({ open }) => (
				<>
					<Menu.Button
						className={`group-hover:opacity-100 ${
							open ? 'opacity-100' : 'opacity-0'
						} absolute right-2 transition-all`}
					>
						<DotsHorizontalIcon className='h-6 w-6' />
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
							unmount
							className='absolute right-0 top-8 w-40 origin-top-right bg-white divide-y divide-border-1 rounded-md shadow-lg focus:outline-none bg-bg-2 z-20'
						>
							<Menu.Item onClick={openEditModal}>
								{({ active }) => (
									<button
										className={`${
											active
												? 'bg-accent-primary bg-opacity-10 text-text-1'
												: 'text-gray-900'
										} group flex items-center rounded-t-md w-full px-2 py-2 gap-2 text-sm`}
									>
										<PencilIcon className='h-4 w-4' />
										Edit
									</button>
								)}
							</Menu.Item>
							<Menu.Item onClick={openDeleteModal}>
								{({ active }) => (
									<button
										className={`${
											active
												? 'bg-accent-primary bg-opacity-10 text-text-1'
												: 'text-gray-900'
										} group flex items-center w-full rounded-b-md px-2 py-2 gap-2 text-sm`}
									>
										<TrashIcon className='h-4 w-4' />
										Delete
									</button>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	)
}

export default TaskItemOptions
