import { SortDescendingIcon } from '@heroicons/react/outline'
import TaskInboxOptions from './TaskInboxOptions'

const TaskInboxHeader = () => {
	return (
		<div className='flex flex-col gap-2 border-b border-border-1 pb-2'>
			<div className='flex items-center gap-2 justify-between'>
				<h3 className='text-2xl font-bold'>Inbox</h3>
				<div className='flex items-center gap-4'>
					<button>
						<SortDescendingIcon className='w-6 h-6 text-text-2 hover:text-text-1 transition-all' />
					</button>
					<TaskInboxOptions />
				</div>
			</div>
		</div>
	)
}

export default TaskInboxHeader
