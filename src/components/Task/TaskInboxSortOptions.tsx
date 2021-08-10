import { Menu } from '@headlessui/react'
import { SortDescendingIcon } from '@heroicons/react/outline'
import MenuItem from '../DropdownMenu/MenuItem'
import MenuItems from '../DropdownMenu/MenuItems'

const TaskInboxSortOptions = () => {
	return (
		<Menu>
			<Menu.Button>
				<SortDescendingIcon className='w-6 h-6 text-text-2 hover:text-text-1 transition-all' />
			</Menu.Button>
			<MenuItems>
				<MenuItem>Sort alphabetically</MenuItem>
			</MenuItems>
		</Menu>
	)
}

export default TaskInboxSortOptions
