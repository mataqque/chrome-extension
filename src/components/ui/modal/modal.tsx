import React, { KeyboardEvent, useEffect, useRef, createContext, useState } from 'react';
import { generateId } from '../../../common/helpers';
import { obsModal } from './obsModal';

interface ModalProps {
	id?: string;
	value?: boolean;
	index?: number;
	children: React.ReactElement<{ onClose: (value: boolean) => void }>;
}

interface ModalContextProps {
	/** @param value */
	onClose: (value: boolean) => void;
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export const Modal = ({ index = 10, children, value = false, id = generateId({ type: 'string' }) }: ModalProps) => {
	const [onMouseModal, setMouseModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const closeModal = (value: boolean) => {
		setShowModal(value);
		obsModal.next({ [id]: value });
	};

	useEffect(() => {
		const handleEscapeKey = (e: KeyboardEvent, nameID: string) => {
			if (e.key === 'Escape' && onMouseModal) {
				closeModal(false);
			}
		};

		document.addEventListener('keydown', handleEscapeKey as any);
		const modal = obsModal.subscribe(data => {
			if (data[id]) {
				setShowModal(data[id]);
			}
		});
		return () => {
			document.removeEventListener('keydown', handleEscapeKey as any);
			modal.unsubscribe();
		};
	}, [showModal, onMouseModal]);

	return (
		<ModalContext.Provider value={{ onClose: closeModal }}>
			<div
				className={`fixed h-[100vh] min-h-full w-full top-0 left-0 bg-[#00000061] filter-blur hidden items-center justify-center [&.active]:flex  ${showModal ? 'active' : ''}`}
				style={{ zIndex: index }}
				onMouseEnter={() => setMouseModal(true)}
				onMouseLeave={() => setMouseModal(false)}
			>
				{children}
			</div>
		</ModalContext.Provider>
	);
};
