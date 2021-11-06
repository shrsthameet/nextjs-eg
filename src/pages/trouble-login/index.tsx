import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthLayout, EnterEmailForm, EnterPasswordForm, OTPForm } from 'Components'

import { AuthPagesLabels, LocalStorageKeys } from 'Utils/enum'

import { apiForgotPassword, apiResetPassword, apiVerifyOTP } from 'ApiCalls/AuthApi'

import {
  FunctionWithNoParam,
  FunctionWithNoParamButReturn,
  FunctionWithParam,
  Nullable
} from 'Utils/Types/main'
import { generateDisplayEmail } from 'Utils/UtilFunctions'
import { FieldTypeResetPassword } from 'Utils/Types'

const initialResetPasswordState = {
  username: '',
  otp: '',
  password: '',
  isChanging: {
    status: false,
    time: 0
  }
}

interface ResetPasswordFieldType extends FieldTypeResetPassword{
  isChanging: {
    status: boolean,
    time: number
  }
}

interface ErrorStateType {
  username: Nullable<string>,
  otp: Nullable<string>,
  password: Nullable<string>
}

const initialErrorState = {
  username: null,
  otp: null,
  password: null,
}

const TroubleLogin:FC = () => {
  const [currentState, setCurrentState] = useState<AuthPagesLabels>(AuthPagesLabels.EMAIL)
  const [resetPasswordState, setResetPasswordState] = useState<ResetPasswordFieldType>(initialResetPasswordState)
  const [errorState, setErrorState] = useState<ErrorStateType>(initialErrorState)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    const getDataFromLocal = async () => {
      try {
        const localData = await localStorage.getItem(LocalStorageKeys.RESET_STATE)
        if(localData && JSON.parse(localData)){
          const parsedData:ResetPasswordFieldType = JSON.parse(localData)
          if(parsedData.isChanging.status && (parsedData.isChanging.time + 300000) > Date.now()){
            let toUpdateData:ResetPasswordFieldType = {} as ResetPasswordFieldType
            Object.keys(parsedData).map(pd => {
              if(parsedData[pd]){
                toUpdateData = { ...toUpdateData, [pd]: parsedData[pd] }
              }
            })
            if(toUpdateData.username) setCurrentState(AuthPagesLabels.OTP)
            if(toUpdateData.password) setCurrentState(AuthPagesLabels.PASSWORD)
            setResetPasswordState(toUpdateData)
          }else{
            await localStorage.removeItem(LocalStorageKeys.RESET_STATE)
          }
        }
      }catch (err){
        console.error(err)
      }
    }
    getDataFromLocal()
  }, [])

  useEffect(() => {
    if(resetPasswordState.isChanging.status)
      localStorage.setItem(LocalStorageKeys.RESET_STATE, JSON.stringify(resetPasswordState))
  }, [resetPasswordState])


  const onEnterUsernameFinish:FunctionWithParam<string> = async username => {
    setIsSubmitting(true)
    setResetPasswordState(prevState => ({ ...prevState, username, isChanging: { status: true, time: Date.now() } }))
    const res = await apiForgotPassword({ username })
    if(!res || !res.success){
      const { message } = res
      setErrorState(prevState => ({ ...prevState, username: message }))
    } else{
      setCurrentState(AuthPagesLabels.OTP)
      setErrorState(prevState => ({ ...prevState, username: null }))
    }
    setIsSubmitting(false)
  }

  const onOTPFinish:FunctionWithParam<string> = async otp => {
    setIsSubmitting(true)
    setResetPasswordState(prevState => ({ ...prevState, otp, isChanging: { status: true, time: Date.now() } }))
    const res = await apiVerifyOTP({ username: resetPasswordState.username, OtpCode: otp })
    if(!res || !res.success){
      const { message } = res
      setErrorState(prevState => ({ ...prevState, otp: message }))
    } else{
      setCurrentState(AuthPagesLabels.PASSWORD)
      setErrorState(prevState => ({ ...prevState, otp: null }))
    }
    setIsSubmitting(false)
  }

  const onChangePasswordFinish:FunctionWithParam<string> = async password => {
    setIsSubmitting(true)
    const res = await apiResetPassword({ username: resetPasswordState.username, password })
    if(!res || !res.success){
      const { message } = res
      setErrorState(prevState => ({ ...prevState, password: message }))
    } else{
      setErrorState(initialErrorState)
      setResetPasswordState(initialResetPasswordState)
      localStorage.removeItem(LocalStorageKeys.RESET_STATE)
      await router.push('/login')
    }
    setIsSubmitting(false)
  }

  const handleOtpResend:FunctionWithNoParamButReturn<Promise<'SUCCESS' | 'FAILURE'>> = async () => {
    const res = await apiForgotPassword({ username: resetPasswordState.username })
    if(!res || !res.success){
      const { message } = res
      setErrorState(prevState => ({ ...prevState, otp: message }))
      return 'FAILURE'
    } else{
      setErrorState(prevState => ({ ...prevState, otp: null }))
      return 'SUCCESS'
    }
  }

  const clearOtpError:FunctionWithNoParam = () => {
    setErrorState(prevState => ({ ...prevState, otp: null }))
  }

  return (
    <AuthLayout hasCompanyLogo authPageLabel={currentState} additionalData={{ description: currentState === AuthPagesLabels.OTP ? generateDisplayEmail(resetPasswordState.username) : '' }}>
      {currentState === AuthPagesLabels.EMAIL
        ? <EnterEmailForm isSubmitting={isSubmitting} submitForm={onEnterUsernameFinish} propError={errorState.username} />
        : currentState === AuthPagesLabels.OTP
          ? <OTPForm
            otpResendFunction={handleOtpResend}
            error={errorState.otp}
            clearError={clearOtpError}
            handleSubmit={onOTPFinish}
            otpLength={6}
          />
          : currentState === AuthPagesLabels.PASSWORD
            ? <EnterPasswordForm isSubmitting={isSubmitting} submitForm={onChangePasswordFinish} propError={errorState.password}/>
            : null}
    </AuthLayout>
  )
}

export default TroubleLogin
