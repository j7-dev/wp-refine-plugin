/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


const APP_DOMAIN = 'my_refine_app_data' as string

const env = window?.[APP_DOMAIN]?.env

export const SITE_URL = env?.SITE_URL
export const API_URL = env?.API_URL || '/wp-json'
export const CURRENT_USER_ID = env?.CURRENT_USER_ID || 0
export const POST_ID = env?.POST_ID || 0
export const PERMALINK = env?.PERMALINK || ''
export const AJAX_URL = env?.AJAX_URL || '/wp-admin/admin-ajax.php'
export const APP_NAME = env?.APP_NAME || 'My Refine App'
export const KEBAB = env?.KEBAB || 'my-refine-app'
export const SNAKE = env?.SNAKE || 'my_refine_app'
export const NONCE = env?.NONCE || ''
export const APP1_SELECTOR = env?.APP1_SELECTOR || 'my_refine_app'
export const APP2_SELECTOR = env?.APP2_SELECTOR || 'my_refine_app_metabox'
export const ELEMENTOR_ENABLED = env?.ELEMENTOR_ENABLED || false
