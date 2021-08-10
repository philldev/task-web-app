import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Task } from '../../context/TaskContext'
import useYupValidationResolver from '../../hooks/useYupValidationResolver'
import Button from '../Button'
import FormInput from '../FormInput'
import Modal from '../Modal'

const NewTaskFormSchema = yup.object({
	text: yup.string().required().max(100, 'Maximum characters is 100'),
})

type FormData = yup.InferType<typeof NewTaskFormSchema>

interface Props {
	task: Task
	isOpen: boolean
	onClose: () => void
	onUpdate: (text: string) => void
}

const UpdateTaskForm: FC<Props> = ({ task, isOpen, onClose, onUpdate }) => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		resolver: useYupValidationResolver(NewTaskFormSchema),
		defaultValues: {
			text: task.text,
		},
	})

	const onSubmit = (data: FormData) => {
		onUpdate(data.text)
		onClose()
	}

	useEffect(() => {
		if (!isOpen) {
			reset()
		}
	}, [isOpen, reset])

	return (
		<>
			<Modal title='Edit Task' {...{ isOpen, onClose }}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					autoComplete='off'
					className='flex flex-col gap-4'
				>
					<FormInput {...register('text')} error={errors.text?.message} />

					{watch('text') !== task.text ? (
						<div className='flex gap-4 justify-end'>
							<Button
								type='button'
								onClick={() => onClose()}
								variant='outlined'
								color='secondary'
							>
								Cancel
							</Button>
							<Button type='submit' variant='outlined'>
								Update
							</Button>
						</div>
					) : null}
				</form>
			</Modal>
		</>
	)
}

export default UpdateTaskForm
