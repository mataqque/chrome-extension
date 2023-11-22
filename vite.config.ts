import { defineConfig } from 'vite';
import vitePluginRequire from 'vite-plugin-require';
import react from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';
import svgLoader from 'vite-svg-loader';
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				app: './index.html',
			},
		},
	},
	server: {
		host: true,
		port: 3001,
		proxy: {
			'/api/v1': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
			},
			'/images': {
				target: 'http://localhost:5000/',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [react(), sassDts(), vitePluginRequire(), svgLoader()],
});
