import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface Props {
	isOpen?: boolean
	children?: React.ReactNode
	title?: string
	onClose: () => void
}

const Modal = ({ title, isOpen, onClose, children }: Props) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='fixed inset-0 z-10 overflow-y-auto'
				{...{ onClose }}
				open={isOpen}
			>
				<div className='min-h-screen px-4 text-center'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay
							style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
							className='fixed inset-0 '
						/>
					</Transition.Child>

					<span
						className='inline-block h-screen align-middle'
						aria-hidden='true'
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div className='relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-bg-2 border border-border-1 shadow-xl rounded-2xl'>
							<button onClick={onClose} className='w-6 h-6 absolute top-6 right-6'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
							{title && (
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900 mb-4'
								>
									{title}
								</Dialog.Title>
							)}
							{children}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

export default Modal
