import { ApiResponseType, Nullable } from '../Utils/Types'
import { AxiosError, AxiosResponse } from 'axios'

const apiTryCatch = async <RT>(func):Promise<ApiResponseType<Nullable<RT>>> => {
  try {
    const res:AxiosResponse<ApiResponseType<RT>> = await func
    console.log('main: ', res)
    if(res.data.success)
      return res.data
    else
      throw new Error('Internal Server Error')
  } catch (err) {
    if(!(err as AxiosError<ApiResponseType<null>>).response?.data.success)
      return err.response?.data
    else
      return {
        data: null,
        success: false,
        message: err
      }
  }
}

export { apiTryCatch }
