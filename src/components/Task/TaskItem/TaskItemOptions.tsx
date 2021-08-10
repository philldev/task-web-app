import { Menu } from '@headlessui/react'
import {
	DotsHorizontalIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/outline'
import MenuButton from '../../DropdownMenu/MenuButton'
import MenuItem from '../../DropdownMenu/MenuItem'
import MenuItems from '../../DropdownMenu/MenuItems'

type Props = {
	openDeleteModal: () => void
	openEditModal: () => void
}

const TaskItemOptions = ({ openDeleteModal, openEditModal }: Props) => {
	return (
		<Menu>
			{({ open }) => (
				<>
					<MenuButton
						className={`group-hover:opacity-100 ${
							open ? 'opacity-100' : 'opacity-0'
						} absolute right-2 top-1 transition-all`}
					>
						<DotsHorizontalIcon className='h-6 w-6' />
					</MenuButton>
					<MenuItems>
						<MenuItem onClick={openEditModal}>
							<PencilIcon className='h-4 w-4' />
							Edit
						</MenuItem>
						<MenuItem onClick={openDeleteModal}>
							<TrashIcon className='h-4 w-4' />
							Delete
						</MenuItem>
					</MenuItems>
				</>
			)}
		</Menu>
	)
}

export default TaskItemOptions
