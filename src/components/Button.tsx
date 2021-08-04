import { ButtonHTMLAttributes } from 'react'
import { FC } from 'react'

type ButtonVariants = 'solid' | 'outlined' | 'transparent'
type ButtonColors = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariants
	color?: ButtonColors
}

type Variant = {
	[key in ButtonVariants]: string
}

type ButtonClassName = {
	[key in ButtonColors]: Variant
}

const baseClassName =
	'h-9 px-4 items-center justify-center flex text-base font-bold rounded-md'
const baseOutlined = 'border-2 bg-transparent'
const baseTransparent = 'bg-transparent border-2 border-transparent'

const buttonClassName: ButtonClassName = {
	primary: {
		solid: 'bg-accent-primary text-text-button border border-accent-primary',
		outlined: `${baseOutlined} border-accent-primary text-accent-primary`,
		transparent: `${baseTransparent} text-accent-primary`,
	},
	secondary: {
		solid: 'bg-text-1 text-text-button border border-text-1',
		outlined: `${baseOutlined} border-border-2 text-text-1`,
		transparent: `${baseTransparent} text-text-1`,
	},
	danger: {
		solid: 'bg-accent-danger text-text-button border border-accent-danger',
		outlined: `${baseOutlined} border-accent-danger text-accent-danger`,
		transparent: `${baseTransparent} text-accent-danger`,
	},
}

const Button: FC<ButtonProps> = ({
	children,
	onClick,
	color = 'primary',
	variant = 'solid',
	className,
	...rest
}) => {
	return (
		<button
			className={`${baseClassName} ${buttonClassName[color][variant]} ${
				className ?? ''
			}`}
			{...{ onClick }}
			{...rest}
		>
			{children}
		</button>
	)
}

Button.defaultProps = {
	variant: 'solid',
	color: 'primary',
} as ButtonProps

export default Button
