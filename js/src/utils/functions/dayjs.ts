import dayjs, { Dayjs } from 'dayjs'

export function parseRangePickerValue(
  values: unknown,
  format = 'YYYY-MM-DD',
  fallback = [],
) {
  if (!Array.isArray(values)) {
    return fallback
  }

  if (values.length !== 2) {
    return fallback
  }

  if (!values.every((value) => value instanceof dayjs)) {
    return fallback
  }

  return (values as [Dayjs, Dayjs]).map((value) => value.format(format))
}

export function parseDatePickerValue(
  value: unknown,
  format = 'YYYY-MM-DD',
  fallback = '',
) {
  if (!(value instanceof dayjs)) {
    return fallback
  }

  return (value as Dayjs).format(format)
}


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
