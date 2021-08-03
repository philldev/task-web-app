import React from 'react'

interface Props {
	title: string
	left?: React.ReactNode
	right?: React.ReactNode
}

const Navbar = ({ title, left, right }: Props) => {
	return (
		<div className='h-14 border-b-2 border-border-1 '>
			<div className='flex justify-between items-center h-full px-6'>
				{left}
				<h2 className='text-2xl font-bold'>{title}</h2>
				{right}
			</div>
		</div>
	)
}

export default Navbar
