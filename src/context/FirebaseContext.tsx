import { FC } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { firebase } from '../firebase'

type FirebaseContextValue = typeof firebase

const FirebaseCtx = createContext<FirebaseContextValue>(firebase)

export const FirebaseProvider : FC = ({children}) => {
	return (
		<FirebaseCtx.Provider value={firebase}>
			{children}
		</FirebaseCtx.Provider>
	)
}

export const useFirebase = () => useContext(FirebaseCtx)
