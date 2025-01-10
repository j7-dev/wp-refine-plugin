import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import alias from '@rollup/plugin-alias'
import path from 'path'

// import liveReload from 'vite-plugin-live-reload'

import { v4wp } from '@kucrut/vite-for-wp'

export default {
	plugins: [
		alias(),
		react(),
		tsconfigPaths(),

		// liveReload(__dirname + '/**/*.php'), // Optional, if you want to reload page on php changed

		v4wp({
			input: 'js/src/main.tsx', // Optional, defaults to 'src/main.js'.
			outDir: 'js/dist', // Optional, defaults to 'dist'.
		}),
	],

	// build: {
	// 	rollupOptions: {
	// 		output: {
	// 			// 修改入口檔案名稱
	// 			entryFileNames: 'index.js',

	// 			// 修改代碼分割後的檔案名稱
	// 			chunkFileNames: '[name]-[hash].js',

	// 			// 修改資源檔案名稱
	// 			assetFileNames: '[name]-[hash].[ext]',
	// 		},
	// 	},
	// },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'js/src'),
		},
	},
}
