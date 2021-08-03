import Spinner from '../components/Spinner'

const Splash = () => {
	return (
		<div className='grid place-items-center min-h-screen'>
			<div className='flex flex-col items-center gap-4'>
				<h1 className='text-3xl font-bold'>TASK APP</h1>
				<Spinner size='lg' />
			</div>
		</div>
	)
}

export default Splash
