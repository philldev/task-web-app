import { useTasks} from '../../context/TaskContext'
import { ChevronDownIcon } from '../Icons/ChevronDown'

const TaskInboxHeader = () => {
	const { state } = useTasks()
	return (
		<div className='flex flex-col gap-2 border-b border-border-1 pb-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-2xl font-bold'>Inbox</h3>
				<ChevronDownIcon />
			</div>
			<p className='text-sm text-text-2'>{state.tasks.length} Tasks</p>
		</div>
	)
}

export default TaskInboxHeader
