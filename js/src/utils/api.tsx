import { TDataProvider } from '@/types'

export const getDataProviderUrlParams = (dataProvider: TDataProvider) => {
	switch (dataProvider) {
		case 'wp-rest':
			return 'wp/v2'
		case 'wc-rest':
			return 'wc/v3'
		case 'wc-store':
			return 'wc/store/v1'
		default:
			return 'wp/v2'
	}
}
