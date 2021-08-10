import { Menu, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'

const MenuItems: FC = ({ children }) => {
	return (
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
				{children}
			</Menu.Items>
		</Transition>
	)
}

export default MenuItems
