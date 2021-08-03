import { useRef } from 'react'
import { useState } from 'react'
import useOnClickOutside from '../hooks/useClickOutside'
import Checkbox from './Checkbox'

const TaskItem = () => {
	const [completed, setCompleted] = useState(false)
	const [editing, setEditing] = useState(false)
	let ref = useRef(null)
	useOnClickOutside(ref, () => {
		setEditing(false)
	})

	return (
		<div
			className={`flex relative ${
				editing ? 'p-2 border border-border-1 rounded-lg' : ''
			}`}
			onClick={(e) => {
				setEditing(true)
			}}
			{...{ ref }}
		>
			<Checkbox
				className='mr-2'
				checked={completed}
				onClick={(e) => {
					e.stopPropagation()
					setCompleted(!completed)
				}}
			/>
			<p
				className={`${
					completed ? 'line-through text-text-2' : ''
				} transition-all`}
			>
				Upload 1099-R to TurboTax
			</p>
			{editing && (
				<div className='absolute right-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
						/>
					</svg>
				</div>
			)}
		</div>
	)
}

export default TaskItem
