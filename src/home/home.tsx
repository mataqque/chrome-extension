import LayoutDashboard from './dashboard/dashboard';
import { useSelector } from 'react-redux';
import { data } from './dashboard/config';

export const Home = () => {
	const id = useSelector((state: any) => state.dashboardSlice.activeId);
	const Component = data.get(id)?.component;

	return (
		<main className='w-full h-screen'>
			<LayoutDashboard>{Component}</LayoutDashboard>
		</main>
	);
};
