import PlusIcon from '../../Icons/PlusIcon'
import { useNewTask } from './NewTaskContext'

const NewTaskButton = () => {
	const { toggle } = useNewTask()
	return (
		<>
			<div
				onClick={toggle}
				className='items-center flex gap-4 p-2 cursor-pointer hover:bg-accent-primary hover:bg-opacity-5'
			>
				<PlusIcon className='text-text-1 h-4 w-4' />
				<p>Add new task</p>
			</div>
		</>
	)
}

export default NewTaskButton
