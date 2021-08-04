import { useToast } from '../../context/ToastContext'
import ToastAlert from './Toast'

export default function ToastContainer() {
	const { state } = useToast()
	return (
		<div className='fixed bottom-6 right-6 max-w-xs z-50 '>
			{state.map((toast) => {
				return <ToastAlert key={toast.id} toast={toast} />
			})}
		</div>
	)
}
