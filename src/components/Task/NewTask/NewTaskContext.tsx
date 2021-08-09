import { useContext, useState } from 'react'
import { createContext, FC } from 'react'
import { useTasks } from '../../../context/TaskContext'

type NewTaskContextValue = {
	isOpen: boolean
	toggle: () => void
	addTask: ({ text }: { text: string }) => Promise<void>
}

const NewTaskContext = createContext<NewTaskContextValue | undefined>(undefined)

export const NewTaskProvider: FC = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const { addTask } = useTasks()
	const toggle = () => setIsOpen((p) => !p)
	return (
		<NewTaskContext.Provider value={{ isOpen, addTask, toggle }}>
			{children}
		</NewTaskContext.Provider>
	)
}

export const useNewTask = () => {
	const ctx = useContext(NewTaskContext)
	if (!ctx) {
		throw new Error('No Context!')
	}
	return ctx
}
