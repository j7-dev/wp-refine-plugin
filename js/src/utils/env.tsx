function removeTrailingSlash(str: string) {
  if (str.endsWith('/')) {
    // 如果字符串以斜杠结尾，使用 slice 方法去除最后一个字符

    return str.slice(0, -1)
  }

  // 否则，返回原字符串

  return str
}

export const appName = import.meta.env.APP_NAME || 'Power Shop'
export const kebab = appName.toLowerCase().replace(/\s+/g, '-')
export const snake = appName.toLowerCase().replace(/\s+/g, '_')
export const renderId1 = import.meta.env.VITE_RENDER_ID_1 || 'my-app'
export const renderId2 = import.meta.env.VITE_RENDER_ID_2 || 'my-app'
export const renderId3 = import.meta.env.VITE_RENDER_ID_3 || 'my-app'
export const renderId4 = import.meta.env.VITE_RENDER_ID_4 || 'my-app'

export const apiUrl = removeTrailingSlash(
  window?.wpApiSettings?.root || '/wp-json',
)
export const ajaxUrl = removeTrailingSlash(
  window?.appData?.ajaxUrl || '/wp-admin/admin-ajax.php',
)
export const siteUrl = removeTrailingSlash(window?.appData?.siteUrl || '/')
export const checkoutUrl = removeTrailingSlash(
  window?.appData?.checkoutUrl || '/checkout',
)
export const ajaxNonce = window?.appData?.ajaxNonce || ''
export const currentUserId = window?.appData?.userId || '0'
export const postId = window?.appData?.postId || '0'
export const permalink = window?.appData?.permalink || '/'

export const apiTimeout = import.meta.env.VITE_API_TIMEOUT || '30000'
export const defaultImage = `${siteUrl}/wp-content/power-shop-release/js/dist/defaultImage.jpg`
