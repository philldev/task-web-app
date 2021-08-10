import { FC, useState } from 'react'
import { Task } from '../../../context/TaskContext'
import Checkbox from '../../Checkbox'
import DeleteTaskForm from './DeleteTaskForm'
import TaskItemOptions from './TaskItemOptions'
import UpdateTaskForm from './UpdateTaskForm'

interface Props {
	task: Task
	onUpdate: ({ task, id }: { task: Partial<Task>; id: string }) => void
	onDelete: ({ id }: { id: string }) => void
}

const TaskItem: FC<Props> = ({ task, onUpdate, onDelete }) => {
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	const taskId = task.id

	const toggleEditModal = () => setIsEditOpen((p) => !p)
	const toggleDeleteModal = () => setIsDeleteOpen((p) => !p)

	const handleToggleIsCompleted = () => {
		onUpdate({ task: { isCompleted: !task.isCompleted }, id: taskId })
	}
	const handleUpdateText = (text: string) => {
		onUpdate({ task: { text }, id: taskId })
	}
	const handleDelete = () => {
		onDelete({ id: taskId })
	}

	return (
		<>
			<div
				className={`flex group cursor-pointer select-none relative p-2 border border-transparent hover:border-border-1 rounded-lg`}
			>
				<Checkbox
					className='mr-2'
					checked={task.isCompleted}
					onClick={(e) => {
						e.stopPropagation()
						handleToggleIsCompleted()
					}}
				/>
				<p
					className={`select-text ${
						task.isCompleted ? 'line-through text-text-2' : ''
					} transition-all`}
				>
					{task.text}
				</p>
				<TaskItemOptions
					openDeleteModal={toggleDeleteModal}
					openEditModal={toggleEditModal}
				/>
			</div>
			<UpdateTaskForm
				isOpen={isEditOpen}
				onClose={toggleEditModal}
				onUpdate={handleUpdateText}
				{...{ task }}
			/>
			<DeleteTaskForm
				isOpen={isDeleteOpen}
				onClose={toggleDeleteModal}
				onDelete={handleDelete}
			/>
		</>
	)
}

export default TaskItem
