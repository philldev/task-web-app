import { FC } from 'react'
import { useTasks } from '../../context/TaskContext'
import TaskItem from './TaskItem'

const TaskList: FC = (props) => {
	const { state } = useTasks()
	return (
		<div className='grid gap-4'>
			{state.tasks.map((task) => (
				<TaskItem key={task.id} {...{ task }} />
			))}
		</div>
	)
}

export default TaskList
