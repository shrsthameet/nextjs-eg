import { API } from 'aws-amplify'

import { apiEndPoints } from 'ApiCalls/ApiConstants'

import { AWSEndPointName, UserPrivacy } from 'Utils/enum'
import {
  ApiReturn, BodyTypeEducationInfo, BodyTypeWorkExperience,
  FieldTypeBasicInfo, FieldTypeEducationInfo,
  FieldTypeUserProfile, FieldTypeWorkExperience,
  FunctionWithNoParamButReturn, FunctionWithParamAndReturn
} from '../Utils/Types'
import { apiTryCatch } from '../CustomHooks'

const { userMgmt: { profile: profileApi, deactivateAccount, togglePrivacy, deleteAccount } } = apiEndPoints

const get:FunctionWithNoParamButReturn<ApiReturn<FieldTypeUserProfile>> =
    async () => await apiTryCatch<FieldTypeUserProfile>(API.get(AWSEndPointName.SECURE, profileApi.get, { response: true }))

const updateBasicInfo:FunctionWithParamAndReturn<FieldTypeBasicInfo, ApiReturn<FieldTypeUserProfile>> =
  async data => await apiTryCatch<FieldTypeUserProfile>(API.post(AWSEndPointName.SECURE, profileApi.basicInfo, { body: data, response: true }))

const updateEducationInfo:FunctionWithParamAndReturn<BodyTypeEducationInfo, ApiReturn<FieldTypeEducationInfo[]>> =
    async data => await apiTryCatch<FieldTypeEducationInfo[]>(API.post(AWSEndPointName.SECURE, profileApi.education, { body: data , response: true }))

const updateExperience:FunctionWithParamAndReturn<BodyTypeWorkExperience, ApiReturn<FieldTypeWorkExperience[]>> =
    async data => await apiTryCatch<FieldTypeWorkExperience[]>(API.post(AWSEndPointName.SECURE, profileApi.experience, { body: data , response: true }))

const apiDeactivateAccount:FunctionWithParamAndReturn<string,ApiReturn<null>> =
    async reason => await apiTryCatch<null>(API.post(AWSEndPointName.SECURE, deactivateAccount, { body: { reason } , response: true }))

const apiDeleteAccount:FunctionWithParamAndReturn<string,ApiReturn<null>> =
    async reason => await apiTryCatch<null>(API.post(AWSEndPointName.SECURE, deleteAccount, { body: { reason } , response: true }))

const apiTogglePrivacy:FunctionWithParamAndReturn<{ privacy: UserPrivacy }, ApiReturn<FieldTypeWorkExperience[]>> =
    async data => await apiTryCatch<FieldTypeWorkExperience[]>(API.post(AWSEndPointName.SECURE, togglePrivacy, { body: data , response: true }))

export const apiUserProfile = { get, updateBasicInfo, updateEducationInfo, updateExperience, apiDeactivateAccount, apiTogglePrivacy, apiDeleteAccount }
