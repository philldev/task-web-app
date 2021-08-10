import { Menu } from '@headlessui/react'
import { FC } from 'react'

type Props = {
	className?: string
}

const MenuButton: FC<Props> = ({ children, className }) => (
	<Menu.Button
		className={`hover:bg-accent-primary hover:bg-opacity-10 rounded p-1 ${className ?? ''}`}
	>
		{children}
	</Menu.Button>
)

export default MenuButton
