import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../modal/modal';
import { obsConfirmAction } from './obsConfirmAction';

export const ConfirmAction = () => {
	const { onClose } = useContext(ModalContext);
	const [confirmAction, setConfirmAction] = useState<{ message: string; fn: Function }>({
		message: '',
		fn: () => {},
	});
	const verifyAsk = (confirm: boolean) => {
		onClose(false);
		if (confirm == true) {
			confirmAction.fn();
		}
	};
	useEffect(() => {
		const subscribe = obsConfirmAction.subscribe(data => {
			setConfirmAction({ message: data.message, fn: data.fn });
		});
		return () => {
			subscribe.unsubscribe();
		};
	}, []);
	return (
		<div className='bg-white border-2 border-primary rounded-lg px-12 py-8 relative w-[25rem] flex items-center flex-col'>
			<div
				className='mask-center icon-close cursor-pointer absolute w-4 h-4 bg-primary top-3 right-3 z-[1]'
				onClick={() => {
					onClose(false);
				}}
			/>
			<span className='text-center flex leading-tight  text-wrap-balance w-full mx-auto !mb-4 text-lg text-primary'>{confirmAction.message}</span>
			<div className='flex gap-2'>
				<button
					className='w-1/2 py-2 bg-success text-white rounded-lg w-[8rem]'
					onClick={() => {
						verifyAsk(true);
					}}
				>
					Si
				</button>
				<button
					className='w-1/2 py-2 bg-info text-white rounded-lg w-[8rem]'
					onClick={() => {
						verifyAsk(false);
					}}
				>
					No
				</button>
			</div>
		</div>
	);
};
