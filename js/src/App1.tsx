/* eslint-disable quote-props */
import '@/assets/scss/index.scss'
import DefaultPage from '@/pages'
import About from '@/pages/about'

import { Refine } from '@refinedev/core'

import { ErrorComponent, useNotificationProvider } from '@refinedev/antd'
import '@refinedev/antd/dist/reset.css'
import routerBindings, {
	DocumentTitleHandler,
	UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import { dataProvider } from './rest-data-provider'
import { HashRouter, Outlet, Route, Routes } from 'react-router-dom'
import { apiUrl, kebab } from '@/utils'
import { resources } from '@/resources'

function App() {
	return (
		<HashRouter>
			<Refine
				dataProvider={{
					default: dataProvider(`${apiUrl}/${kebab}`),
					'wp-rest': dataProvider(`${apiUrl}/wp/v2`),
					'wc-rest': dataProvider(`${apiUrl}/wc/v3`),
					'wc-store': dataProvider(`${apiUrl}/wc/store/v1`),
				}}
				notificationProvider={useNotificationProvider}
				routerProvider={routerBindings}
				resources={resources}
				options={{
					syncWithLocation: false,
					warnWhenUnsavedChanges: true,
					projectId: 'wp-refine-plugin',
				}}
			>
				<Routes>
					<Route element={<Outlet />}>
						<Route index element={<DefaultPage />} />
						<Route path="/about" element={<About />} />

						<Route path="*" element={<ErrorComponent />} />
					</Route>
				</Routes>
				<UnsavedChangesNotifier />
				<DocumentTitleHandler />
			</Refine>
		</HashRouter>
	)
}

export default App
