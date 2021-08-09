import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import useYupValidationResolver from '../../../hooks/useYupValidationResolver'
import Button from '../../Button'
import FormInput from '../../FormInput'
import Modal from '../../Modal'
import { useNewTask } from './NewTaskContext'

const NewTaskFormSchema = yup.object({
	text: yup.string().required().max(100, 'Maximum characters is 100'),
})

type FormData = yup.InferType<typeof NewTaskFormSchema>

const NewTaskForm: FC = () => {
	const { toggle, isOpen, addTask } = useNewTask()

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
		toggle()
	}

	useEffect(() => {
		if (!isOpen) {
			reset()
		}
	}, [isOpen, reset])

	return (
		<>
			<Modal onClose={toggle} {...{ isOpen }}>
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
							onClick={toggle}
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
