/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { removeTrailingSlash } from '@/utils'

const APP_DOMAIN = 'my_refine_app_data' as string
export const snake = window?.[APP_DOMAIN]?.env?.SNAKE || 'my_refine_app'
export const appName = window?.[APP_DOMAIN]?.env?.APP_NAME || 'My Refine App'
export const kebab = window?.[APP_DOMAIN]?.env?.KEBAB || 'my-refine-app'
export const app1Selector =
  window?.[APP_DOMAIN]?.env?.APP1_SELECTOR || 'my_refine_app'
export const app2Selector =
  window?.[APP_DOMAIN]?.env?.APP2_SELECTOR || 'my_refine_app_metabox'
export const apiUrl =
  removeTrailingSlash(window?.wpApiSettings?.root) || '/wp-json'
export const ajaxUrl =
  removeTrailingSlash(window?.[APP_DOMAIN]?.env?.ajaxUrl) ||
  '/wp-admin/admin-ajax.php'
export const siteUrl =
  removeTrailingSlash(window?.[APP_DOMAIN]?.env?.siteUrl) || '/'
export const currentUserId = window?.[APP_DOMAIN]?.env?.userId || '0'
export const postId = window?.[APP_DOMAIN]?.env?.postId || '0'
export const permalink =
  removeTrailingSlash(window?.[APP_DOMAIN]?.env?.permalink) || '/'
export const apiTimeout = '30000'
export const ajaxNonce = window?.[APP_DOMAIN]?.env?.nonce || ''
