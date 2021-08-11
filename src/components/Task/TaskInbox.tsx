import { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Task, useTasks } from '../../context/TaskContext'
import Spinner from '../Spinner'
import NewTaskButton from './NewTask/NewTaskButton'
import { NewTaskProvider } from './NewTask/NewTaskContext'
import NewTaskFixedButton from './NewTask/NewTaskFixedButton'
import NewTaskForm from './NewTask/NewTaskForm'
import TaskInboxHeader from './TaskInboxHeader'
import { TaskItem } from './TaskItem'

const TaskInboxContext = createContext<
	| {
			isShowCompleted: boolean
			toggleShowCompleted: () => void
			selectSort: (sort: SortOptions) => void
			toggleSortType: () => void
			sortBy: SortOptions
	  }
	| undefined
>(undefined)

export const useTaskInbox = () => {
	const ctx = useContext(TaskInboxContext)
	if (!ctx) throw new Error('No Inbox Context Provided!')
	return ctx
}

type SortOptions = keyof Omit<Task, 'id' | 'createdAt'> | null
type SortType = 'Ascending' | 'Descending'

const TaskInbox = () => {
	const { state, updateTask, deleteTask } = useTasks()
	const [sortBy, setSortBy] = useState<SortOptions>(null)
	const [sortType, setSortType] = useState<SortType>('Ascending')

	const selectSort = (sort: SortOptions) => {
		setSortBy(() => {
			if (sort === sortBy) return null
			else return sort
		})
	}

	const toggleSortType = () =>
		setSortType((p) => (p === 'Ascending' ? 'Descending' : 'Ascending'))

	const handleSort =
		sortBy !== null
			? (a: Task, b: Task): number => {
					if (sortBy === null) return 0
					let sortedPropA = a[sortBy]
					let sortedPropB = b[sortBy]
					if (sortType === 'Ascending') {
						if (sortedPropA > sortedPropB) {
							return 1
						} else {
							return -1
						}
					} else {
						if (sortedPropA < sortedPropB) {
							return 1
						} else {
							return -1
						}
					}
			  }
			: undefined

	const unCompleteTasks = state.tasks
		.filter((t) => !t.isCompleted)
		.sort(handleSort)

	const completedTasks = state.tasks
		.filter((t) => t.isCompleted)
		.sort(handleSort)

	const [isShowCompleted, setIsShowCompleted] = useState<boolean>(false)
	const toggleShowCompleted = () => setIsShowCompleted((p) => !p)

	return (
		<div className='pt-4 flex-1 flex-shrink-0 flex-grow px-2'>
			{state.status === 'loading' ? (
				<Spinner size='lg' className='mx-auto' />
			) : (
				<TaskInboxContext.Provider
					value={{
						toggleShowCompleted,
						isShowCompleted,
						selectSort,
						sortBy,
						toggleSortType,
					}}
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
								<button
									onClick={toggleShowCompleted}
									className=' text-text-2 transition-all items-center flex gap-4 p-2 cursor-pointer hover:bg-accent-primary hover:bg-opacity-5'
								>
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
