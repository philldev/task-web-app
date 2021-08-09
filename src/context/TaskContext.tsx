import { createContext, FC, useContext, useEffect, useReducer } from 'react'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import firebase from '../firebase'
import { useUser } from './UserContext'

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

type TasksContextValue = {
	state: State
	addTask: ({ text }: { text: string }) => Promise<void>
	updateTask: ({ task }: { task: Task }) => Promise<void>
	deleteTask: ({ id }: { id: string }) => Promise<void>
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined)

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

const tasksRef = firebase.firestore().collection('tasks')

export const TasksProvider: FC = ({ children }) => {
	const { user } = useUser()
	const [state, dispatch] = useReducer(tasksReducer, {
		status: 'loading',
		tasks: [],
	})

	const addTask = async ({ text }: { text: string }) => {
		console.log(text)
		const prevTasks = state.tasks
		const tempTask: Task = {
			createdAt: new Date().toISOString(),
			id: uuidv4(),
			isCompleted: false,
			text,
			userId: user!.id,
		}
		console.log(tempTask)

		dispatch({
			type: 'ADD',
			payload: {
				task: tempTask,
			},
		})

		try {
			await tasksRef.doc(tempTask.id).set(tempTask)
		} catch (error) {
			dispatch({
				type: 'ERROR',
				payload: {
					message: error.message,
					tasks: prevTasks,
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

		try {
			await tasksRef.doc(id).delete()
		} catch (error) {
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

		try {
			await tasksRef.doc(task.id).update(task)
		} catch (error) {
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
	}

	useEffect(() => {
		const fetchTasks = async () => {
			dispatch({ type: 'LOAD' })

			try {
				const snap = await firebase
					.firestore()
					.collection('tasks')
					.where('userId', '==', user!.id)
					.get()
				const data = snap.docs.map((t) => t.data() as Task)
				dispatch({ type: 'LOADED', payload: { tasks: data } })
			} catch (error) {
				dispatch({
					type: 'ERROR',
					payload: { message: error.message, tasks: [] },
				})
			}
		}

		if (user) {
			fetchTasks()
		}
	}, [user])

	return (
		<TasksContext.Provider
			value={{
				addTask,
				deleteTask,
				state,
				updateTask,
			}}
		>
			{children}
		</TasksContext.Provider>
	)
}

export const useTasks = () => {
	const ctx = useContext(TasksContext)

	if (!ctx) throw new Error('No Context Provided')

	return ctx
}
