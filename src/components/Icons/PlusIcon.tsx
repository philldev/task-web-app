import React from "react"

const PlusIcon = ({...props} : React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-8 w-8 text-text-button'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			{...props}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M12 4v16m8-8H4'
			/>
		</svg>
	)
}
export default PlusIcon
