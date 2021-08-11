import ToastContainer from './components/Toast/ToastContainer'
import { Router } from '@reach/router'
import { useAuth } from './context/AuthContext'
import { TasksProvider } from './context/TaskContext'
import { UserProvider } from './context/UserContext'
import { Dashboard, Login, Profile, Signup, Splash } from './screens'
import ForgotPassword from './screens/ForgotPassword'
import ResetPassword from './screens/ResetPassword'
import AppContainer from './components/AppContainer'

const App = () => {
	const { status } = useAuth()

	return (
		<div className='bg-bg-1 text-text-1 min-h-screen'>
			{status === 'loading' ? (
				<Splash />
			) : (
				<AppContainer>
					<UserProvider>
						<TasksProvider>
							<Router className='min-h-screen'>
								<Dashboard path='/' />
								<Profile path='/profile' />
								<Signup path='/signup' />
								<Login path='/login' />
								<ForgotPassword path='/forgot-password' />
								<ResetPassword path='/reset-password' />
							</Router>
						</TasksProvider>
					</UserProvider>
				</AppContainer>
			)}
			<ToastContainer />
		</div>
	)
}

export default App
