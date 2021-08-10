import { Menu } from '@headlessui/react'
import { FC } from 'react'

type MenuItemProps = {
	onClick?: () => void
	className?: string
}

const MenuItem: FC<MenuItemProps> = ({ children, onClick, className }) => {
	return (
		<Menu.Item>
			{({ active }) => (
				<button
					onClick={onClick}
					className={`${
						active
							? 'bg-accent-primary bg-opacity-10 text-text-1'
							: 'text-gray-900'
					} group flex items-center rounded-md w-full px-2 py-2 gap-2 text-sm ${className}`}
				>
					{children}
				</button>
			)}
		</Menu.Item>
	)
}

export default MenuItem
