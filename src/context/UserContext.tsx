import { createContext, FC, useContext, useEffect, useState } from 'react'
import firebase from '../firebase'
import { useAuth } from './AuthContext'

export interface Profile {
	id: string
	username: string
	email: string
	avatarUrl?: string
}

type UserState = Profile | null

type ContextValue = {
	user: UserState
	userLoaded: boolean
	updateUserDetails: (data: Omit<Partial<Profile>, 'id'>) => Promise<void>
}

const UserCtx = createContext<ContextValue | undefined>(undefined)

export const UserProvider: FC = ({ children }) => {
	const { authUser } = useAuth()
	const [user, setUser] = useState<UserState>(null)
	const [isLoading, setIsLoading] = useState(true)

	const updateUserDetails = async (data: Partial<Profile>) => {
		try {
			await firebase
				.firestore()
				.collection('profiles')
				.doc(user?.id!)
				.update(data)
			setUser((prev) =>
				prev
					? {
							...prev,
							email: data.email ?? prev.email,
							username: data.username ?? prev.username,
							avatarUrl: data.avatarUrl ?? prev.avatarUrl,
					  }
					: null
			)
		} catch (error) {
			throw error
		}
	}

	useEffect(() => {
		const fetchUser = async () => {
			const userProfileDoc = await firebase
				.firestore()
				.collection('profiles')
				.doc(authUser?.uid)
				.get()
			console.log(userProfileDoc.exists)
			if (userProfileDoc.exists) {
				setUser(userProfileDoc.data() as Profile)
				setIsLoading(false)
			}
		}

		if (authUser) {
			fetchUser()
		}
	}, [authUser])

	return (
		<UserCtx.Provider
			value={{ user: user, userLoaded: !isLoading, updateUserDetails }}
		>
			{children}
		</UserCtx.Provider>
	)
}

export const useUser = () => {
	const ctx = useContext(UserCtx)
	if (!ctx) {
		throw new Error('No Context!')
	}
	return ctx
}
