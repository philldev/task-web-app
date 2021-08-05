import { FC } from 'react'
import { Task, useTask } from '../../context/TaskContext'
import Button from '../Button'
import Modal from '../Modal'

interface Props {
	task: Task
	isOpen: boolean
	onClose: () => void
}

const DeleteTaskForm: FC<Props> = ({ isOpen, onClose, task }) => {
	const { deleteTask } = useTask()

	const onDelete = () => {
		deleteTask({ id: task.id })
		onClose()
	}

	return (
		<Modal title='Are you sure to delete this task?' {...{ isOpen, onClose }}>
			<div className='flex gap-4 justify-end'>
				<Button
					type='button'
					onClick={() => onClose()}
					variant='outlined'
					color='secondary'
				>
					Cancel
				</Button>
				<Button onClick={onDelete} type='submit' variant='outlined' color='danger'>
					Delete
				</Button>
			</div>
		</Modal>
	)
}

export default DeleteTaskForm
