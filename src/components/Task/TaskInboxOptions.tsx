import { Menu, Transition } from '@headlessui/react'
import { DotsHorizontalIcon, EyeOffIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'

const TaskInboxOptions = () => {
	return (
		<Menu>
			{({ open }) => (
				<>
					<Menu.Button
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
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active
												? 'bg-accent-primary bg-opacity-10 text-text-1'
												: 'text-gray-900'
										} group flex items-center rounded-md w-full px-2 py-2 gap-2 text-sm`}
									>
										<EyeOffIcon className='w-4 h-4' />
										Hide Completed
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

export default TaskInboxOptions
