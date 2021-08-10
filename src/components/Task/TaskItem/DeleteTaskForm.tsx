import { FC } from 'react'
import Button from '../../Button'
import Modal from '../../Modal'

interface Props {
	isOpen: boolean
	onClose: () => void
	onDelete: () => void
}

const DeleteTaskForm: FC<Props> = ({ isOpen, onClose, onDelete }) => {

	const handleDelete = () => {
		onDelete()
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
				<Button onClick={handleDelete} type='submit' variant='outlined' color='danger'>
					Delete
				</Button>
			</div>
		</Modal>
	)
}

export default DeleteTaskForm
