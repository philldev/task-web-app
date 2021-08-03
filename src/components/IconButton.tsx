import { ButtonHTMLAttributes, FC } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton: FC<Props> = ({ children, className, ...rest }) => {
	return (
		<button
			className={`h-14 w-14 bg-accent-primary flex items-center justify-center rounded-full ${className}`}
			{...rest}
		>
			{children}
		</button>
	)
}

export default IconButton
