import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useTasks } from '../../context/TaskContext'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import Button from '../Button'
import FormInput from '../FormInput'
import IconButton from '../IconButton'
import PlusIcon from '../Icons/PlusIcon'
import Modal from '../Modal'

const NewTaskFormSchema = yup.object({
	text: yup.string().required().max(100, 'Maximum characters is 100'),
})

type FormData = yup.InferType<typeof NewTaskFormSchema>

const NewTaskForm: FC = () => {
	const { addTask } = useTasks()
	const [isOpen, setIsOpen] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: useYupValidationResolver(NewTaskFormSchema),
	})

	const onSubmit = (data: FormData) => {
		addTask({ text: data.text })
		setIsOpen(false)
	}

	useEffect(() => {
		if (!isOpen) {
			reset()
		}
	}, [isOpen, reset])

	return (
		<>
			<IconButton
				onClick={() => {
					setIsOpen(true)
				}}
				className='fixed bottom-6 right-6'
			>
				<PlusIcon />
			</IconButton>
			<Modal onClose={() => setIsOpen(false)} {...{ isOpen }}>
				<form
					autoComplete='off'
					onSubmit={handleSubmit(onSubmit)}
					className='grid gap-4 '
				>
					<FormInput
						placeholder='Enter new task'
						error={errors.text?.message}
						{...register('text')}
					/>
					<div className='flex gap-4 justify-end'>
						<Button
							type='button'
							onClick={() => setIsOpen(false)}
							variant='outlined'
							color='secondary'
						>
							Cancel
						</Button>
						<Button type='submit'>Add Task</Button>
					</div>
				</form>
			</Modal>
		</>
	)
}

export default NewTaskForm
