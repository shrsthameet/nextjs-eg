import { API, Auth } from 'aws-amplify'
import { AxiosResponse } from 'axios'

import { apiEndPoints } from 'ApiCalls/ApiConstants'

import { AWSEndPointName, AWSExceptionCode, CognitoCustomAttributes, UserAccountStatus } from 'Utils/enum'
import {
  ApiReturn,
  ErrorObject,
  FieldTypeChangePassword,
  FieldTypeForgotPassword,
  FieldTypeLogin,
  FieldTypeResendOTP,
  FieldTypeResetPassword,
  FieldTypeSignUp,
  FieldTypeUserProfile,
  FieldTypeVerifyOTP,
  FunctionWithNoParamButReturn,
  FunctionWithParamAndReturn
} from 'Utils/Types'
import { apiTryCatch } from '../CustomHooks'

const { reactivateAccount, verifyAccount, verifyOtp, resendOtp, resetPassword, forgotPassword, signUp } = apiEndPoints.auth

// COGNITO API //
const apiChangePassword:FunctionWithParamAndReturn<FieldTypeChangePassword, Promise<'SUCCESS'>> = async ({ oldPassword, password } ) => {
  const user = await Auth.currentAuthenticatedUser()
  if(user) return Auth.changePassword(user, oldPassword, password)
  else return Auth.signOut()
}

const apiSignIn:FunctionWithParamAndReturn<FieldTypeLogin, Promise<boolean | ErrorObject>> = async ({ username, password }) => {
  try {
    const res = await Auth.signIn(username, password)
    return res.attributes[CognitoCustomAttributes.ACCOUNT_STATUS] !== UserAccountStatus.ACTIVE ? { error: res.attributes[CognitoCustomAttributes.ACCOUNT_STATUS] } : res.attributes.email_verified
  }catch(err){
    return err.code === AWSExceptionCode.UNCONFIRMED_LOGIN
      ? { error: err.code }
      : { error: err.message }
  }
}

const apiSignOut:FunctionWithNoParamButReturn<Promise<AxiosResponse>> = () => {
  return Auth.signOut()
}

// BACKEND API //
const apiSignUp:FunctionWithParamAndReturn<FieldTypeSignUp, ApiReturn<FieldTypeUserProfile>> =
    async data => await apiTryCatch<FieldTypeUserProfile>(API.post(AWSEndPointName.UN_SECURE, signUp, { body: data, response: true }))

const apiConfirmSignUp:FunctionWithParamAndReturn<FieldTypeVerifyOTP, ApiReturn<null>> =
    async data => await apiTryCatch<null>(API.post(AWSEndPointName.UN_SECURE, verifyAccount, { body: data, response: true }))

const apiResendOtpCode:FunctionWithParamAndReturn<FieldTypeResendOTP, ApiReturn<null>> =
    async data => await apiTryCatch<null>(API.post(AWSEndPointName.UN_SECURE, resendOtp, { body: data, response: true }))

const apiForgotPassword:FunctionWithParamAndReturn<FieldTypeForgotPassword, ApiReturn<null>> =
    async data => await apiTryCatch<null>(API.post(AWSEndPointName.UN_SECURE, forgotPassword, { body: data, response: true }))

const apiVerifyOTP:FunctionWithParamAndReturn<FieldTypeVerifyOTP, ApiReturn<null>> =
    async data => await apiTryCatch<null>(API.post(AWSEndPointName.UN_SECURE, verifyOtp, { body: data, response: true }))

const apiResetPassword:FunctionWithParamAndReturn<FieldTypeResetPassword, ApiReturn<null>> =
    async data => await apiTryCatch<null>(API.post(AWSEndPointName.UN_SECURE, resetPassword, { body: data, response: true }))

const apiReactivateAccount:FunctionWithParamAndReturn<FieldTypeVerifyOTP,ApiReturn<FieldTypeUserProfile>> =
    async data => await apiTryCatch<FieldTypeUserProfile>(API.post(AWSEndPointName.SECURE, reactivateAccount , { body: data , response: true }))

export { apiSignUp, apiResendOtpCode, apiForgotPassword, apiVerifyOTP, apiResetPassword, apiReactivateAccount, apiChangePassword, apiSignIn, apiSignOut, apiConfirmSignUp }
