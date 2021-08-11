import { FC } from 'react'

const AppContainer: FC = ({ children }) => {
	return <div className='max-w-2xl w-full mx-auto border-r border-l border-border-1'>{children}</div>
}

export default AppContainer
