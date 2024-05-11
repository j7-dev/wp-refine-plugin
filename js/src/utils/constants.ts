export const backordersOptions = [
  { label: '不允許', value: 'no' },
  { label: '允許', value: 'yes' },
  { label: '只有缺貨時允許', value: 'notify' },
]
export const stockStatusOptions = [
  { label: '有庫存', value: 'instock' },
  { label: '缺貨', value: 'outofstock' },
  { label: '預定', value: 'onbackorder' },
]

export const statusOptions = [
  { label: '已發佈', value: 'publish' },
  { label: '送交審閱', value: 'pending' },
  { label: '草稿', value: 'draft' },
  { label: '私密', value: 'private' },
]

/**
 * used in WooCommerce wc_get_products() PHP function
 */

export const dateRelatedFields = [
  {
    label: '商品發佈日期',
    value: 'date_created',
  },
  {
    label: '商品修改日期',
    value: 'date_modified',
  },
  {
    label: '特價開始日期',
    value: 'date_on_sale_from',
  },
  {
    label: '特價結束日期',
    value: 'date_on_sale_to',
  },
]

export const productTypes = [
  {
    value: 'simple',
    label: '簡單商品',
    color: 'processing', // 藍色
  },
  {
    value: 'grouped',
    label: '組合商品',
    color: 'orange', // 綠色
  },
  {
    value: 'external',
    label: '外部商品',
    color: 'lime', // 橘色
  },
  {
    value: 'variable',
    label: '可變商品',
    color: 'magenta', // 紅色
  },
  {
    value: 'variation',
    label: '商品變體',
    color: 'magenta', // 紅色
  },
  {
    value: 'subscription',
    label: '簡易訂閱',
    color: 'cyan', // 紫色
  },
  {
    value: 'variable-subscription',
    label: '可變訂閱',
    color: 'purple', // 青色
  },
  {
    value: 'subscription_variation',
    label: '訂閱變體',
    color: 'purple',
  },
]
