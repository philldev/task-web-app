import { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useTasks } from '../../context/TaskContext'
import Spinner from '../Spinner'
import NewTaskButton from './NewTask/NewTaskButton'
import { NewTaskProvider } from './NewTask/NewTaskContext'
import NewTaskFixedButton from './NewTask/NewTaskFixedButton'
import NewTaskForm from './NewTask/NewTaskForm'
import TaskInboxHeader from './TaskInboxHeader'
import { TaskItem } from './TaskItem'

const TaskInboxContext = createContext<
	{ isShowCompleted: boolean; toggleShowCompleted: () => void } | undefined
>(undefined)

export const useTaskInbox = () => {
	const ctx = useContext(TaskInboxContext)
	if (!ctx) throw new Error('No Inbox Context Provided!')
	return ctx
}

const TaskInbox = () => {
	const { state, updateTask, deleteTask } = useTasks()
	const unCompleteTasks = state.tasks.filter((t) => !t.isCompleted)
	const completedTasks = state.tasks.filter((t) => t.isCompleted)

	const [isShowCompleted, setIsShowCompleted] = useState<boolean>(false)
	const toggleShowCompleted = () => setIsShowCompleted((p) => !p)

	return (
		<div className='pt-4 flex-1 flex-shrink-0 flex-grow max-w-lg w-full mx-auto'>
			{state.status === 'loading' ? (
				<Spinner size='lg' className='mx-auto' />
			) : (
				<TaskInboxContext.Provider
					value={{ toggleShowCompleted, isShowCompleted }}
				>
					<TaskInboxHeader />
					<div className='pt-4'>
						<div className='grid gap-3'>
							{unCompleteTasks.map((task) => (
								<TaskItem
									key={task.id}
									onUpdate={updateTask}
									onDelete={deleteTask}
									{...{ task }}
								/>
							))}
							{isShowCompleted &&
								completedTasks.map((task) => (
									<TaskItem
										key={task.id}
										onUpdate={updateTask}
										onDelete={deleteTask}
										{...{ task }}
									/>
								))}
							{!isShowCompleted && completedTasks.length > 0 ? (
								<button onClick={toggleShowCompleted} className=' text-text-2 transition-all items-center flex gap-4 p-2 cursor-pointer hover:bg-accent-primary hover:bg-opacity-5'>
									{completedTasks.length} completed{' '}
									{`task${completedTasks.length > 1 ? 's' : ''}`}
								</button>
							) : null}
							<NewTaskProvider>
								<NewTaskButton />
								<NewTaskFixedButton />
								<NewTaskForm />
							</NewTaskProvider>
						</div>
					</div>
				</TaskInboxContext.Provider>
			)}
		</div>
	)
}

export default TaskInbox
