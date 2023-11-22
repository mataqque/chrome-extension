import './assets/scss/index.scss';
import 'tailwindcss/tailwind.css';
import RoutesDom from './router';
import { StyledEngineProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';

declare global {
	interface Window {
		$: any;
		jQuery: any;
	}
}
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
	<Provider store={store}>
		<StyledEngineProvider injectFirst>
			<RoutesDom />
		</StyledEngineProvider>
	</Provider>
	// <React.StrictMode>
	// </React.StrictMode>
);
