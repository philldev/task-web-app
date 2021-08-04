import { Dispatch, FC } from 'react'
import { createContext, useContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

export type ToastType = 'SUCCESS' | 'ERROR' | 'WARNING'

export type Toast = {
	type: ToastType
	id?: string
	message: string
	autoCloseInterval?: number
}

type Action =
	| {
			TYPE: ToastType
			PAYLOAD: Toast
	  }
	| { TYPE: 'DELETE'; PAYLOAD: Toast }

type State = Toast[]

type ContextValue =
	| {
			state: State
			dispatch: Dispatch<Action>
	  }
	| undefined

const ToastContext = createContext<ContextValue>(undefined)

const reducerFunc = (prevState: State, action: Action) => {
	switch (action.TYPE) {
		case 'SUCCESS': {
			return prevState.concat({
				...action.PAYLOAD,
				type: action.TYPE,
				id: uuidv4(),
			})
		}

		case 'ERROR': {
			return prevState.concat({
				...action.PAYLOAD,
				type: action.TYPE,
				id: uuidv4(),
			})
		}

		case 'WARNING': {
			return prevState.concat({
				...action.PAYLOAD,
				type: action.TYPE,
				id: uuidv4(),
			})
		}

		case 'DELETE': {
			return prevState.filter((toast) => toast.id !== action.PAYLOAD.id)
		}

		default:
			return prevState
	}
}

export const ToastProvider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducerFunc, [])
	return (
		<ToastContext.Provider value={{ state, dispatch }}>
			{children}
		</ToastContext.Provider>
	)
}

export function useToast() {
	const ctx = useContext(ToastContext)
	if (!ctx) throw new Error('No Toast Context Provided')
	return ctx
}
