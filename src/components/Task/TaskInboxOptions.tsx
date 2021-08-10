import { Menu } from '@headlessui/react'
import {
	DotsHorizontalIcon,
	EyeIcon,
	EyeOffIcon,
} from '@heroicons/react/outline'
import MenuButton from '../DropdownMenu/MenuButton'
import MenuItem from '../DropdownMenu/MenuItem'
import MenuItems from '../DropdownMenu/MenuItems'
import { useTaskInbox } from './TaskInbox'

const TaskInboxOptions = () => {
	const { isShowCompleted, toggleShowCompleted } = useTaskInbox()
	return (
		<Menu>
			<div className='relative'>
				<MenuButton>
					<DotsHorizontalIcon className='h-6 w-6 text-text-2 hover:text-text-1 transition-all' />
				</MenuButton>
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
			</div>
		</Menu>
	)
}

export default TaskInboxOptions
