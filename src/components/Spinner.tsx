import { FC } from 'react'

interface Props {
	size: 'xs' | 'sm' | 'base' | 'md' | 'lg'
}

const Spinner: FC<Props> = ({ size }) => {
	const sizeClassName = {
		xs: 'h-5 w-5',
		sm: 'h-6 w-6',
		base: 'h-7 w-7',
		md: 'h-9 w-9',
		lg: 'h-11 w-11',
	}
	return (
		<svg
			className={`animate-spin ${sizeClassName[size]} text-accent-primary`}
			fill='none'
			viewBox='0 0 24 24'
		>
			<circle
				className='opacity-25'
				cx={12}
				cy={12}
				r={10}
				stroke='currentColor'
				strokeWidth={4}
			/>
			<path
				className='opacity-75'
				fill='currentColor'
				d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
			/>
		</svg>
	)
}

Spinner.defaultProps = {
	size: 'md',
}

export default Spinner
