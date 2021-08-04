import { useToast } from '../../context/ToastContext'
import ToastAlert from './Toast'

export default function ToastContainer() {
	const { state } = useToast()
	return (
		<div className='fixed bottom-6 right-6 max-w-xs w-full z-50 flex flex-col gap-2 '>
			{state.map((toast) => {
				return <ToastAlert key={toast.id} toast={toast} />
			})}
		</div>
	)
}
