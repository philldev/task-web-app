import React, {
	createContext,
	FC,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { firebase } from '../firebase'
import { useFirebase } from './FirebaseContext'
import { Profile } from './UserContext'

type AuthState = firebase.User | null

type FetchStatus = 'loading' | 'loaded' | 'error'

type ContextValue = {
	authUser: AuthState
	status: FetchStatus
	signUp: (
		email: string,
		password: string,
		data: Partial<Profile>
	) => Promise<void>
	signIn: (email: string, password: string) => Promise<void>
	signOut: () => Promise<void>
}

const AuthCtx = createContext<ContextValue | undefined>(undefined)

export const AuthProvider: FC = ({ children }) => {
	const firebase = useFirebase()
	const [authUser, setAuthUser] = useState<AuthState>(null)
	const [status, setStatus] = useState<FetchStatus>('loading')

	const signUp = useMemo(
		() => async (email: string, password: string, data: Partial<Profile>) => {
			try {
				const { user } = await firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
				if (user) {
					await firebase
						.firestore()
						.collection('profiles')
						.doc(user?.uid)
						.set({
							id: user?.uid,
							email: user?.email,
							username: data.username,
						} as Partial<Profile>)
				} else {
					throw new Error('User not found')
				}
			} catch (error) {
				throw error
			}
		},
		[firebase]
	)

	const signIn = useMemo(
		() => async (email: string, password: string) => {
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password)
			} catch (error) {
				throw error
			}
		},
		[firebase]
	)

	const signOut = useMemo(
		() => async () => {
			try {
				await firebase.auth().signOut()
				console.log(firebase.auth().currentUser)
			} catch (error) {
				console.log(error)
				throw error
			}
		},
		[firebase]
	)

	useEffect(() => {
		let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setAuthUser(user)
				setStatus('loaded')
			} else {
				setAuthUser(null)
				setStatus('error')
			}
		})

		return () => {
			unsubscribe()
		}
	}, [firebase])

	const value = useMemo(
		() => ({
			status,
			authUser,
			signUp,
			signIn,
			signOut,
		}),
		[authUser, status, signIn, signOut, signUp]
	)

	return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export const useAuth = () => {
	const ctx = useContext(AuthCtx)
	if (!ctx) {
		throw new Error('No Context!')
	}
	return ctx
}
