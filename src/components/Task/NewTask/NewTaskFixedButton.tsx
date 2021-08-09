import IconButton from '../../IconButton'
import PlusIcon from '../../Icons/PlusIcon'
import { useNewTask } from './NewTaskContext'

const NewTaskFixedButton = () => {
	const { toggle } = useNewTask()
	return (
		<>
			<IconButton onClick={toggle} className='fixed bottom-6 right-6'>
				<PlusIcon />
			</IconButton>
		</>
	)
}

export default NewTaskFixedButton
