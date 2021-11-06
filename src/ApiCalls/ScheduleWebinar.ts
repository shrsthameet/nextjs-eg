import { API } from 'aws-amplify'
import { apiTryCatch } from 'CustomHooks'
import { WebinarRegistrationFieldType } from 'pages/webinar-registration/[id]'
import { ApiReturn, FunctionWithParamAndReturn, WebinarFieldType } from 'Utils/Types'
import { AWSEndPointName } from '../Utils/enum'

const scheduleWebinar = {
  add: data => {
    return API.post(AWSEndPointName.SECURE, '/events/create', { body: data, response: true })
  },
  update: (data, id) => {
    return API.put(AWSEndPointName.SECURE, `/events/${id}/update`, { body: data, response: true })
  },
  updatePhoto: (data, url) => {
    return fetch(url, { method: 'PUT', body: data })
  },
}

const registerForWebinar: FunctionWithParamAndReturn<WebinarRegistrationFieldType, ApiReturn<WebinarFieldType>> = async data =>
  await apiTryCatch<WebinarFieldType>(API.post(AWSEndPointName.SECURE, '/events/register-user',  { body: data, response: true }))

const cancelWebinar: FunctionWithParamAndReturn<any, ApiReturn<any>> = async data => {
  const { id, ...reason } = data
  return (
    await apiTryCatch<any>(API.put(AWSEndPointName.SECURE, `/events/${id}/cancel`, { body: reason, response: true }))
  )
}

const getWebinar: FunctionWithParamAndReturn<string, ApiReturn<any>> =  async id =>
  await apiTryCatch<any>(API.get(AWSEndPointName.UN_SECURE, `/events/${id}/detail`, { response: true }))

const getInstrcutor = {
  userIntructors: key => {
    return API.get(AWSEndPointName.SECURE, `/user/search-instructor?q=${key}`, { response: true })
  },
}

export const apiWebinar = {
  scheduleWebinar,
  getWebinar,
  getInstrcutor,
  registerForWebinar,
  cancelWebinar
}
