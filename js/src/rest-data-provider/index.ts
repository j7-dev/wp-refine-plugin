import { DataProvider } from '@refinedev/core'
import { axiosInstance, generateSort, generateFilter } from './utils'
import { AxiosInstance } from 'axios'
import queryString from 'query-string'
import { TOrderBy, TOrder, THttpMethods, THttpMethodsWithBody } from '@/types'

export * from './utils'

const { stringify } = queryString

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<
  Required<DataProvider>,
  'createMany' | 'updateMany' | 'deleteMany'
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    // TODO

    console.log('⭐  filters:', filters)
    const url = `${apiUrl}/${resource}`

    const { current = 1, pageSize = 10, mode = 'server' } = pagination ?? {}

    const { headers: headersFromMeta, method } = meta ?? {}
    const requestMethod = (method as THttpMethods) ?? 'get'

    const queryFilters = generateFilter(filters)

    const query: {
      page?: number
      posts_per_page?: number
      orderby?: TOrderBy
      order?: TOrder
    } = {}

    if (mode === 'server') {
      query.page = current
      query.posts_per_page = pageSize
    }

    const generatedSort = generateSort(sorters)
    if (generatedSort) {
      const { _sort, _order } = generatedSort
      query.orderby = _sort.join(',')
      query.order = _order.join(',')
    }

    const { data, headers } = await httpClient[requestMethod](
      `${url}?${stringify(query)}&${stringify(queryFilters, { arrayFormat: 'bracket' })}`,
      {
        headers: headersFromMeta,
      },
    )

    const total = headers?.['x-wp-total'] || data.length

    return {
      data,
      total,
    }
  },

  getMany: async ({ resource, ids, meta }) => {
    const { headers, method } = meta ?? {}
    const requestMethod = (method as THttpMethods) ?? 'get'

    const { data } = await httpClient[requestMethod](
      `${apiUrl}/${resource}?${stringify({ id: ids })}`,
      { headers },
    )

    return {
      data,
    }
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resource}`

    const { headers, method } = meta ?? {}
    const requestMethod = (method as THttpMethodsWithBody) ?? 'post'

    const { data } = await httpClient[requestMethod](url, variables, {
      headers,
    })

    return {
      data,
    }
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`

    const { headers, method } = meta ?? {}
    const requestMethod = (method as THttpMethodsWithBody) ?? 'patch'

    const { data } = await httpClient[requestMethod](url, variables, {
      headers,
    })

    return {
      data,
    }
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`

    const { headers, method } = meta ?? {}
    const requestMethod = (method as THttpMethods) ?? 'get'

    const { data } = await httpClient[requestMethod](url, { headers })

    return {
      data,
    }
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`

    const { headers, method } = meta ?? {}
    const requestMethod = (method as THttpMethodsWithBody) ?? 'delete'

    const { data } = await httpClient[requestMethod](url, {
      data: variables,
      headers,
    })

    return {
      data,
    }
  },

  getApiUrl: () => {
    return apiUrl
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`

    if (sorters) {
      const generatedSort = generateSort(sorters)
      if (generatedSort) {
        const { _sort, _order } = generatedSort
        const sortQuery = {
          orderby: _sort.join(','),
          order: _order.join(','),
        }
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters)
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`
    }

    if (headers) {
      httpClient.defaults.headers = {
        ...httpClient.defaults.headers,
        ...headers,
      }
    }

    let axiosResponse
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await httpClient[method](url, payload)
        break
      case 'delete':
        axiosResponse = await httpClient.delete(url, {
          data: payload,
        })
        break
      default:
        axiosResponse = await httpClient.get(requestUrl)
        break
    }

    const { data } = axiosResponse

    return Promise.resolve({ data })
  },
})
