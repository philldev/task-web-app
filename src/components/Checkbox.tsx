import { FC, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
	checked?: boolean
}

const Checkbox: FC<Props> = ({ checked, className, ...rest }) => {
	return (
		<button className={`h-6 w-6 flex items-center justify-center border border-border-2 bg-bg-2 rounded ${className}`} {...rest}>
			{checked && (
				<svg width={18} height={18} viewBox='0 0 18 18' fill='none'>
					<path
						d='M3.75 9.75L6.75 12.75L14.25 5.25'
						stroke='#FFB224'
						strokeWidth={2}
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			)}
		</button>
	)
}

export default Checkbox
