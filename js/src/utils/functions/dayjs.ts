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
