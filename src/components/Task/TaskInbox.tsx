import { useTasks } from '../../context/TaskContext'
import Spinner from '../Spinner'
import NewTaskButton from './NewTask/NewTaskButton'
import { NewTaskProvider } from './NewTask/NewTaskContext'
import NewTaskFixedButton from './NewTask/NewTaskFixedButton'
import NewTaskForm from './NewTask/NewTaskForm'
import TaskInboxHeader from './TaskInboxHeader'
import TaskItem from './TaskItem'

const TaskInbox = () => {
	const { state, updateTask, deleteTask } = useTasks()
	return (
		<div className='px-2 pt-4 flex-1 flex-shrink-0 flex-grow max-w-lg w-full mx-auto'>
			{state.status === 'loading' ? (
				<Spinner size='lg' className='mx-auto' />
			) : (
				<>
					<TaskInboxHeader />
					<div className='pt-4'>
						<div className='grid gap-4'>
							{state.tasks.map((task) => (
								<TaskItem
									key={task.id}
									onUpdate={updateTask}
									onDelete={deleteTask}
									{...{ task }}
								/>
							))}
							<NewTaskProvider>
								<NewTaskButton />
								<NewTaskFixedButton />
								<NewTaskForm />
							</NewTaskProvider>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default TaskInbox
