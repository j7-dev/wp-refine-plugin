import { CrudFilter } from '@refinedev/core'
import dayjs, { Dayjs } from 'dayjs'
import {
  dateRelatedFields,
  parseRangePickerValue,
  parseDatePickerValue,
} from '@/utils'

type TMapOperatorReturn = {
  formattedField: string
  formattedValue: string
}

type TFilter = CrudFilter & {
  field: string
}

const dateRelatedFieldValues = dateRelatedFields.map((field) => field.value)

/**
 * Map operator
 * @see https://refine.dev/docs/core/interface-references/#crudoperators
 * TODO map all CrudOperators
 *
 * @param filter
 * @return
 * @example
 * mapOperator({ field: 'name', operator: 'contains', value: 'test' })
 */

export function mapOperator(filter: TFilter): TMapOperatorReturn {
  const { field } = filter

  if (dateRelatedFieldValues.includes(field)) {
    return dateMapOperator(filter)
  }

  return normalMapOperator(filter)
}

/**
 *  Date map operator
 */

function dateMapOperator(filter: TFilter): TMapOperatorReturn {
  const { field, operator, value } = filter
  switch (operator) {
    case 'between':
      return {
        formattedField: field,
        formattedValue: parseRangePickerValue(value).join('...'),
      }
    case 'gt':
      return {
        formattedField: field,
        formattedValue: `>${parseDatePickerValue(value)}`,
      }
    case 'gte':
      return {
        formattedField: field,
        formattedValue: `>=${parseDatePickerValue(value)}`,
      }
    case 'lt':
      return {
        formattedField: field,
        formattedValue: `<${parseDatePickerValue(value)}`,
      }
    case 'lte':
      return {
        formattedField: field,
        formattedValue: `<=${parseDatePickerValue(value)}`,
      }
    case 'eq':
      return {
        formattedField: field,
        formattedValue: parseDatePickerValue(value),
      }
    default:
      return {
        formattedField: field,
        formattedValue: value,
      }
  }
}

/**
 *  Normal map operator
 */

function normalMapOperator(filter: TFilter): TMapOperatorReturn {
  const { field, operator, value } = filter
  switch (operator) {
    case 'in': // because query-string help us to handle array values
    case 'eq':
    default:
      return {
        formattedField: field,
        formattedValue: value,
      }
  }
}
