import { CrudFilters } from '@refinedev/core'
import { mapOperator } from './mapOperator'

/*
[
	{
			"field": "name",
			"operator": "contains",
			"value": "111"
	}
]
*/

export const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {}

  if (filters) {
    filters.map((filter) => {
      if (filter.operator === 'or' || filter.operator === 'and') {
        throw new Error(
          `[@refinedev/simple-rest]: \`operator: ${filter.operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`,
        )
      }

      if ('field' in filter) {
        const { formattedField, formattedValue } = mapOperator(filter)
        queryFilters[formattedField] = formattedValue
      }
    })
  }

  return queryFilters
}
