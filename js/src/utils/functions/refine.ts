import { BaseRecord, CrudFilters } from '@refinedev/core'

/**
 * Get initial filters
 * @param initialValues
 * @return RefineCrudFilters
 */

export function getInitialFilters(values: BaseRecord) {
  return Object.keys(values).reduce((acc: CrudFilters, key) => {
    if (values[key]) {
      acc.push({
        field: key,
        operator: 'eq',
        value: values[key],
      })
    }
    return acc
  }, [])
}
