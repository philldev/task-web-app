import { useEffect } from 'react'
import { createContext, FC, useReducer } from 'react'
import supabase from '../supabase'
import { useUser } from './UserContext'
import { v4 as uuidv4 } from 'uuid'
import { useContext } from 'react'

export interface Task {
	text: string
	createdAt: string
	isCompleted: boolean
	userId: string
	id: string
}

type Action =
	| {
			type: 'LOADED'
			payload: {
				tasks: Task[]
			}
	  }
	| {
			type: 'UPDATE'
			payload: {
				task: Task
				id: string
			}
	  }
	| {
			type: 'DELETE'
			payload: {
				id: string
			}
	  }
	| {
			type: 'ADD'
			payload: {
				task: Task
			}
	  }
	| {
			type: 'ERROR'
			payload: {
				message: string
				tasks: Task[]
			}
	  }
	| {
			type: 'LOAD'
	  }

type State = {
	status: 'loading' | 'loaded' | 'error' | 'idle'
	tasks: Task[]
}

type TaskContextValue = {
	state: State
	addTask: ({ text }: { text: string }) => Promise<void>
	updateTask: ({ task }: { task: Task }) => Promise<void>
	deleteTask: ({ id }: { id: string }) => Promise<void>
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined)

const tasksReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'LOADED': {
			return {
				status: 'loaded',
				tasks: action.payload.tasks,
			}
		}

		case 'ADD': {
			return {
				...state,
				tasks: [...state.tasks, action.payload.task],
			}
		}

		case 'UPDATE': {
			return {
				...state,
				tasks: state.tasks.map((t) =>
					t.id === action.payload.id ? action.payload.task : t
				),
			}
		}

		case 'DELETE': {
			return {
				...state,
				tasks: state.tasks.filter((t) => t.id !== action.payload.id),
			}
		}

		case 'ERROR': {
			return {
				...state,
				status: 'error',
				tasks: action.payload.tasks,
			}
		}

		case 'LOAD': {
			return {
				...state,
				status: 'loading',
			}
		}

		default:
			return state
	}
}

const taskDB = supabase.from<Task>('tasks')

export const TaskProvider: FC = ({ children }) => {
	const { user } = useUser()
	const [state, dispatch] = useReducer(tasksReducer, {
		status: 'loading',
		tasks: [],
	})

	const addTask = async ({ text }: { text: string }) => {
		const prevTasks = state.tasks
		const tempTask: Task = {
			createdAt: new Date().toISOString(),
			id: uuidv4(),
			isCompleted: false,
			text,
			userId: user!.id,
		}

		dispatch({
			type: 'ADD',
			payload: {
				task: tempTask,
			},
		})

		const { data, error } = await taskDB
			.insert([
				{
					text,
					userId: user!.id,
				},
			])
			.single()
		if (error) {
			dispatch({
				type: 'ERROR',
				payload: {
					message: error.message,
					tasks: prevTasks,
				},
			})
		}
		if (data) {
			dispatch({
				type: 'UPDATE',
				payload: {
					task: data,
					id: tempTask.id,
				},
			})
		}
	}
	const deleteTask = async ({ id }: { id: string }) => {
		const prevTasks = state.tasks

		dispatch({
			type: 'DELETE',
			payload: {
				id,
			},
		})

		const { error } = await taskDB
			.delete({ returning: 'minimal' })
			.match({ id })

		if (error) {
			dispatch({
				type: 'ERROR',
				payload: {
					message: error.message,
					tasks: prevTasks,
				},
			})
		}
	}
	const updateTask = async ({ task }: { task: Task }) => {
		const prevTasks = state.tasks

		dispatch({
			type: 'UPDATE',
			payload: {
				id: task.id,
				task,
			},
		})

		const { error } = await supabase
			.from<Task>('tasks')
			.update(
				{
					isCompleted: task.isCompleted,
					text: task.text,
				},
				{ returning: 'minimal', count: 'exact' }
			)
			.match({ id: task.id })
			.single()

		if (error) {
			console.log(error.message)
			dispatch({
				type: 'ERROR',
				payload: {
					message: error.message,
					tasks: prevTasks,
				},
			})
		}
	}

	useEffect(() => {
		const fetchTasks = async () => {
			dispatch({ type: 'LOAD' })

			const { data, error } = await taskDB.select().match({ userId: user!.id })

			if (error) {
				dispatch({
					type: 'ERROR',
					payload: { message: error.message, tasks: [] },
				})
			}

			if (data) {
				dispatch({ type: 'LOADED', payload: { tasks: data } })
			}
		}

		if (user) {
			fetchTasks()
		}
	}, [user])

	return (
		<TaskContext.Provider
			value={{
				addTask,
				deleteTask,
				state,
				updateTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	)
}

export const useTask = () => {
	const ctx = useContext(TaskContext)

	if (!ctx) throw new Error('No Context Provided')

	return ctx
}
