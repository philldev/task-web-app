import { useTask } from '../../context/TaskContext'
import Spinner from '../Spinner'
import NewTaskForm from './NewTaskForm'
import TaskInboxHeader from './TaskInboxHeader'
import TaskList from './TaskList'

const TaskInbox = () => {
	const { state } = useTask()
	return (
		<div className='px-6 pt-5 flex-1 flex-shrink-0 flex-grow max-w-lg w-full mx-auto'>
			{state.status === 'loading' ? (
				<Spinner size='lg' className='mx-auto' />
			) : (
				<>
					<TaskInboxHeader />
					<div className='pt-4'>
						<TaskList />
						<NewTaskForm />
					</div>
				</>
			)}
		</div>
	)
}

export default TaskInbox
