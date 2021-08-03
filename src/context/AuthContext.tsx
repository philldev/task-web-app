import { AuthSession } from '@supabase/supabase-js'
import { useContext } from 'react'
import { FC } from 'react'
import { createContext } from 'react'
import { useEffect, useState } from 'react'
import supabase from '../supabase'

type AuthState = AuthSession | null

type ContextValue = {
	session: AuthState
}

const AuthCtx = createContext<ContextValue | undefined>(undefined)

export const AuthProvider : FC = ({children}) => {
	const [session, setSession] = useState<AuthState>(() =>
		supabase.auth.session()
	)

	useEffect(() => {
		let { data: listener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				setSession(session)
			}
		)

		return () => {
			listener?.unsubscribe()
		}
	}, [])

	return <AuthCtx.Provider value={{ session }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => {
	const ctx = useContext(AuthCtx)
	if (!ctx) {
		throw new Error('No Context!')
	}
	return ctx
}
