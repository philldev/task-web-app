import { Menu } from '@headlessui/react'
import { CheckIcon, SortDescendingIcon } from '@heroicons/react/outline'
import MenuButton from '../DropdownMenu/MenuButton'
import MenuItem from '../DropdownMenu/MenuItem'
import MenuItems from '../DropdownMenu/MenuItems'
import { useTaskInbox } from './TaskInbox'

const TaskInboxSortOptions = () => {
	const { selectSort, sortBy } = useTaskInbox()
	return (
		<Menu>
			<div className='relative'>
				<MenuButton>
					<SortDescendingIcon className='w-6 h-6 text-text-2 hover:text-text-1 transition-all' />
				</MenuButton>
				<MenuItems>
					<MenuItem onClick={() => selectSort('text')}>
						Sort alphabetically
						{sortBy === 'text' && (
							<CheckIcon className='w-4 h-4 absolute right-2' />
						)}
					</MenuItem>
				</MenuItems>
			</div>
		</Menu>
	)
}

export default TaskInboxSortOptions
