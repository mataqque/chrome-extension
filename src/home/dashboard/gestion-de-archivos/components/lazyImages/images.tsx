import { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SVGProps } from 'react';
import './images.scss';

interface ICircularImageProps {
	src: string;
	alt?: string;
}

interface IImageProps {
	src: string;
	alt?: string;
	class?: string;
}

export const LazyImage = (props: IImageProps) => {
	const [loadImage, setLoadImage] = useState(false);
	const ContentImg = useRef<HTMLDivElement>(null);
	const LoadImage = (e: any) => {
		if (e[0].isIntersecting == true) {
			const imageToLoad = new Image();
			imageToLoad.src = props.src;
			imageToLoad.onload = (e: any) => {
				setLoadImage(true);
			};
		}
	};
	useEffect(() => {
		LoadImage([{ isIntersecting: true }]);
		// const options = {
		// 	root: null,
		// 	rootMargin: '',
		// 	threshold: 1.0,
		// };
		// const observer = new IntersectionObserver(LoadImage, options);
		// observer.observe(ContentImg.current as Element);
	}, [loadImage]);
	return (
		<div className={`${props.class || ''}`} ref={ContentImg}>
			<div className='w-full h-full'>{loadImage == false ? <Skeleton /> : <img className='w-full h-full object-cover' src={props.src} alt='icon'></img>}</div>
		</div>
	);
};
