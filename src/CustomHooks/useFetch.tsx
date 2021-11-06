import { useCallback, useEffect, useState } from 'react'

import { Nullable } from 'Utils/Types'

const useFetch = (initialValue: any, fetch: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState(initialValue)
  const [dataObj, setDataObj] = useState<{}>({})
  const [isError, _setIsError] = useState<Nullable<string>>(null)

  const fetchAPI = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch()
      console.log(response)
      setDataObj(response.data)
      setData(response.data.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      //   const e = error?.request.response
      //   if(e === null)
      //     setIsError('Something went wrong. Please try again later.')
      //   if(e !== null)
      //     setIsError(e)
      setIsLoading(false)
    }
  }, [fetch])

  useEffect(() => {
    fetchAPI()
  }, [fetchAPI])

  return { isLoading, data, dataObj, isError }
}

export default useFetch
