import { Menu } from '@headlessui/react'
import {
	DotsHorizontalIcon,
	EyeIcon,
	EyeOffIcon
} from '@heroicons/react/outline'
import MenuItem from '../DropdownMenu/MenuItem'
import MenuItems from '../DropdownMenu/MenuItems'
import { useTaskInbox } from './TaskInbox'

const TaskInboxOptions = () => {
	const { isShowCompleted, toggleShowCompleted } = useTaskInbox()
	return (
		<div className='relative'>
			<Menu>
				<Menu.Button>
					<DotsHorizontalIcon className='h-6 w-6 text-text-2 hover:text-text-1 transition-all' />
				</Menu.Button>
				<MenuItems>
					<MenuItem onClick={toggleShowCompleted}>
						{isShowCompleted ? (
							<EyeOffIcon className='w-4 h-4' />
						) : (
							<EyeIcon className='w-4 h-4' />
						)}
						{isShowCompleted ? 'Hide Completed' : 'Show Completed'}
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	)
}

export default TaskInboxOptions
