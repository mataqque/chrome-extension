import eye from '../../../assets/multimedia/icons/eye-svg.svg?url';
import eye_close from '../../../assets/multimedia/icons/eye-close.svg?url';

interface IIconTogglePassword {
	showPassword: () => void;
	class: boolean;
}

export const IconTogglePassword = (props: IIconTogglePassword) => {
	return (
		<div
			className={`absolute z-[1] top-0 bottom-0 my-auto left-[1px] w-[35px] flex items-center justify-center`}
			onClick={() => {
				props.showPassword();
			}}
		>
			{props.class == true ? (
				<div className='h-5 w-5  mask-center bg-gray-300' style={{ WebkitMaskImage: `url(${eye})` }}></div>
			) : (
				<div className='h-5 w-5  mask-center bg-gray-300' style={{ WebkitMaskImage: `url(${eye_close})` }}></div>
			)}
		</div>
	);
};

export const IconInputSelect = (props: any) => {
	return (
		<div
			className={`h-12 w-12 absolute top-0 right-0 flex justify-center items-center [&.open]:rotate-180 duration-300 pointer-events-none select-none ${props.open ? 'open' : ''}`}
			onClick={() => {
				// props.showPassword();
			}}
		>
			<div className='mask-center mask-down icon-down-select bg-gray-300 h-4 w-4'></div>
		</div>
	);
};
