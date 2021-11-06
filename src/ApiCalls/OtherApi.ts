import { ApiReturn, FieldTypeBanner, FunctionWithNoParamButReturn, UpcomingEventsType } from '../Utils/Types'
import { apiTryCatch } from '../CustomHooks'
import { API } from 'aws-amplify'
import { AWSEndPointName } from '../Utils/enum'
import { apiEndPoints } from './ApiConstants'

const apiGetBannerList:FunctionWithNoParamButReturn<ApiReturn<FieldTypeBanner[]>> =
    async () => await apiTryCatch<FieldTypeBanner[]>(API.get(AWSEndPointName.UN_SECURE, apiEndPoints.others.banner, { response: true }))

const apiGetUpcomingEvents:FunctionWithNoParamButReturn<ApiReturn<UpcomingEventsType[]>> =
    async () => await apiTryCatch<UpcomingEventsType[]>(API.get(AWSEndPointName.UN_SECURE, apiEndPoints.others.upcomingEvents, { response: true }))

export { apiGetBannerList, apiGetUpcomingEvents }
