import './subitem.scss';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';

export const SidebarSubItems = ({ index, item }: { index: number; item: any }) => {
	return (
		<Accordion expanded={true} square onChange={() => {}} key={'section-' + index}>
			<AccordionSummary aria-controls='panel-content'>
				<Typography>
					<label className={`c-sidebar-nav-title`}>
						<i className={'icon mask ' + item.icon}></i>
						<span className='span-title'>{item.title}</span>
						<div className='icon-signal-right' />
					</label>
				</Typography>
			</AccordionSummary>
			{item.sublist?.map((subitem: any, subindex: number) => {
				return (
					<AccordionDetails key={'subSection-' + subindex}>
						<Typography>
							<div className='c-sidebar-nav-sub-item subsidebar' key={'acordion-' + index}>
								<i className='icon mask circle-one'></i>
								<span className='span-title'>{subitem.title}</span>
							</div>
						</Typography>
					</AccordionDetails>
				);
			})}
		</Accordion>
	);
};
