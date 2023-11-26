import './fileinf.scss';
import { useSelector } from 'react-redux';
import { LazyImage } from '../lazyImages/images';
import { bytesToSize, convertToDate, copyToClipboard, generatePath, generateUrl } from '../../../../../common/helpers';
import { IFileSelected } from '../../../../../common/interface';
import { BASE_API } from '../../../../../store/config';

interface IProps {
	file: IFileSelected;
	data?: any;
	length?: number;
}
export const Fileinf = ({ file }: IProps) => {
	return (
		<div className='content_info_file'>
			{Object.keys(file).length > 0 ? (
				<>
					<div className='content-img skeleton-default'>
						<LazyImage src={generateUrl(file, BASE_API)}></LazyImage>
					</div>
					<span className='name-file bold'>Información</span>
					<div className='content-array-info scrollHidden'>
						{/* <ScrollBar /> */}
						<div className='item-info'>
							<span className='name-info'>Título</span>
							<span className='text-info'>{file.fileName}</span>
						</div>
						<div className='item-info'>
							<span className='name-info'>Tamaño</span>
							<span className='text-info'>{bytesToSize(file.size)}</span>
						</div>
						<div className='item-info'>
							<span className='name-info'>Formato</span>
							<span className='text-info'>{file.mimeType}</span>
						</div>
						<div className='item-info'>
							<span className='name-info'>Actualizado</span>
							<span className='text-info'>{convertToDate(file.updatedAt)}</span>
						</div>
						<div className='item-info'>
							<span className='name-info'>Dimensiones</span>
							<span className='text-info'>1500*500</span>
						</div>
						<div className='item-info'>
							<span className='name-info'>Url Original</span>
							<span
								className='text-info'
								onClick={() => {
									copyToClipboard(generatePath(file));
								}}
							>
								{generatePath(file)}
							</span>
						</div>
					</div>
				</>
			) : (
				<div className='content_message'>Selecciona al menos un archivo para ver su información</div>
			)}
		</div>
	);
};
