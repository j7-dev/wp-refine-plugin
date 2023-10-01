import { useState, useEffect } from 'react'
import { useCustomMutation } from '@refinedev/core'
import { ajaxUrl, ajaxNonce } from '@/utils'
import { UseCustomMutationReturnType } from '@refinedev/core/src/hooks/data/useCustomMutation'

type TProps = {
  action: string
  formatter?: (_response: object) => any
  [key: string]: any
}

export function useAjax<T>(
  props: TProps,
): { response: T | undefined } & UseCustomMutationReturnType {
  const [
    response,
    setResponse,
  ] = useState<T | undefined>(undefined)

  const mutation = useCustomMutation()
  const { mutate } = mutation

  useEffect(() => {
    mutate(
      {
        url: ajaxUrl,
        method: 'post',
        values: {
          ...props,
          nonce: ajaxNonce,
        },
      },
      {
        onSuccess: (data) => {
          const res = data?.data?.data || {}
          if (props.formatter) {
            const formattedResponse = props.formatter(res) as T
            setResponse(formattedResponse)
          } else {
            setResponse(res as T)
          }
        },
        onError: (error) => {
          console.log(error)
        },
      },
    )
  }, [])

  return {
    ...mutation,
    response,
  }
}
