import { forwardRef } from 'react'
import { FC, InputHTMLAttributes } from 'react'

type State = 'valid' | 'invalid'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	state?: State
	label?: string
	error?: string | undefined
}

const FormInput: FC<FormInputProps> = forwardRef(
	(
		{ label, className, state, error, ...rest },
		ref: React.LegacyRef<HTMLInputElement> | undefined
	) => {
		return (
			<div className='grid gap-1'>
				{label && (
					<label className='text-sm font-bold text-text-2'>{label}</label>
				)}
				{error && (
					<div className='text-accent-danger text-sm'>
						<span>{error}</span>
					</div>
				)}
				<div className='relative'>
					<input
						className={`h-9 rounded outline-none border w-full ${
							state === 'valid'
								? 'border-accent-success'
								: state === 'invalid' || error
								? 'border-accent-danger'
								: 'border-border-2 focus:border-accent-primary'
						} placeholder-text-2 text-text-1 text-base px-2 items-center bg-bg-2  ${className}`}
						ref={ref}
						{...rest}
					/>
					{(state === 'invalid' || error) && (
						<svg
							className='absolute right-2 top-1/2 transform -translate-y-1/2'
							width={24}
							height={24}
							viewBox='0 0 24 24'
							fill='none'
						>
							<path
								d='M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
								stroke='#F2555A'
								strokeWidth={2}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					)}
					{state === 'valid' && (
						<svg
							className='absolute right-2 top-1/2 transform -translate-y-1/2'
							width={24}
							height={24}
							viewBox='0 0 24 24'
							fill='none'
						>
							<path
								d='M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
								stroke='#3CB179'
								strokeWidth={2}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					)}
				</div>
			</div>
		)
	}
)

export default FormInput
