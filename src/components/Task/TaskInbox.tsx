import { useTasks } from '../../context/TaskContext'
import Spinner from '../Spinner'
import NewTaskForm from './NewTaskForm'
import TaskInboxHeader from './TaskInboxHeader'
import TaskItem from './TaskItem'

const TaskInbox = () => {
	const { state, updateTask, deleteTask, addTask } = useTasks()
	return (
		<div className='px-6 pt-5 flex-1 flex-shrink-0 flex-grow max-w-lg w-full mx-auto'>
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
						</div>
						<NewTaskForm onAdd={(text) => addTask({ text })} />
					</div>
				</>
			)}
		</div>
	)
}

export default TaskInbox
