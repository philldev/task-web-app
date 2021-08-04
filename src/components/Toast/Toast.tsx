import { FC, useEffect } from 'react'
import { Toast, ToastType, useToast } from '../../context/ToastContext'

interface Props {
	toast: Toast
}

type TypeStyle = {
	[key in ToastType]: string
}

const ToastAlert: FC<Props> = ({ toast }) => {
	const { message, type } = toast
	const { dispatch } = useToast()

	useEffect(() => {
		const { autoCloseInterval } = toast
		const handle = setTimeout(
			() => dispatch({ TYPE: 'DELETE', PAYLOAD: toast }),
			autoCloseInterval ? autoCloseInterval : 4000
		)
		return () => clearTimeout(handle)
	}, [dispatch, toast])

	const typeStyle: TypeStyle = {
		ERROR: 'bg-bg-danger border-accent-danger',
		SUCCESS: 'bg-bg-success border-accent-success',
		WARNING: 'bg-bg-warning border-accent-warning',
	}

	return (
		<div className={`w-full rounded-xl items-center border flex pl-4 pr-2 py-1 shadow-2xl  ${typeStyle[type]}`}>
			<p className='flex-1 text-sm font-bold'>{message}</p>
			{type === 'SUCCESS' ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6 text-accent-success'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			) : type === 'ERROR' ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6 text-accent-danger'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6 text-accent-warning'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			)}
		</div>
	)
}

export default ToastAlert
