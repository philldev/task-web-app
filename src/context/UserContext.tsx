import { createContext, FC, useContext, useEffect, useState } from 'react'
import supabase from '../supabase'
import { useAuth } from './AuthContext'

export interface Profile {
	id: string
	username: string
	email: string
	avatarUrl?: string
	verified? : boolean
}

type UserState = Profile | null

type ContextValue = {
	user: UserState
	userLoaded: boolean
	updateUserDetails: (data: Omit<Partial<Profile>, 'id'>) => Promise<void>
}

const UserCtx = createContext<ContextValue | undefined>(undefined)

export const UserProvider: FC = ({ children }) => {
	const { session } = useAuth()
	const [user, setUser] = useState<UserState>(null)
	const [isLoading, setIsLoading] = useState(true)

	const updateUserDetails = async (data: Omit<Partial<Profile>, 'id'>) => {
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
	}

	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await supabase
				.from<Profile>('profiles')
				.select(`email, username, id, avatarUrl`)
				.eq('id', session?.user?.id)

			if (error) {
				console.log(error.message)
			}

			if (data?.length === 0) {
				await supabase.from('profiles').insert([
					{
						id: session?.user?.id,
						email: session?.user?.email,
						username: null,
						avatar_url: null,
					},
				])
				if (session && session.user)
					setUser({
						email: session.user.email ?? '',
						avatarUrl: '',
						username: '',
						id: session.user.id,
					})
			}

			if (data && data?.length > 0) {
				setUser(data[0])
			}

			setIsLoading(false)
		}

		if (session) {
			fetchUser()
		}
	}, [session])

	return (
		<UserCtx.Provider
			value={{ user, userLoaded: !isLoading, updateUserDetails }}
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
