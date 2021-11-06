import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthLayout, EnterEmailForm, OTPForm } from 'Components'

import { apiConfirmSignUp, apiResendOtpCode } from 'ApiCalls/AuthApi'

import { generateDisplayEmail } from 'Utils/UtilFunctions'
import { AuthPagesLabels, LocalStorageKeys } from 'Utils/enum'
import {
  FieldTypeResendOTP,
  FunctionWithNoParam,
  FunctionWithNoParamButReturn,
  FunctionWithParam,
  Nullable
} from 'Utils/Types'

const initialResendSignUpCode = {
  username: '',
  isChanging: {
    status: false,
    time: 0
  },
}

interface ResendCodeFieldType extends FieldTypeResendOTP{
  isChanging: {
      status: boolean,
      time: number
  },
}

interface ErrorStateType {
    username: Nullable<string>,
    OtpCode: Nullable<string>,
}

const initialErrorState = {
  username: null,
  OtpCode: null,
}

const ConfirmUser:FC = () => {
  const [currentState, setCurrentState] = useState<AuthPagesLabels>(AuthPagesLabels.CONFIRM_USER)
  const [resendCodeState, setResendCodeState] = useState<ResendCodeFieldType>(initialResendSignUpCode)
  const [errorState, setErrorState] = useState<ErrorStateType>(initialErrorState)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    setErrorState(prevState => ({ ...prevState, username: 'User not confirmed.' }))
  }, [])

  useEffect(() => {
    const getDataFromLocal = async () => {
      try {
        const localData = await localStorage.getItem(LocalStorageKeys.CONFIRM_USER)
        if(localData && JSON.parse(localData)){
          const parsedData:ResendCodeFieldType = JSON.parse(localData)
          if(parsedData.isChanging.status && (parsedData.isChanging.time + 120000) > Date.now()){
            let toUpdateData:ResendCodeFieldType = {} as ResendCodeFieldType
            Object.keys(parsedData).map(pd => {
              if(parsedData[pd]){
                toUpdateData = { ...toUpdateData, [pd]: parsedData[pd] }
              }
            })
            if(toUpdateData.username) setCurrentState(AuthPagesLabels.OTP)
            setResendCodeState(toUpdateData)
          }else{
            await localStorage.removeItem(LocalStorageKeys.CONFIRM_USER)
          }
        }
      }catch (err){
        console.error(err)
      }
    }
    getDataFromLocal()
  }, [])

  useEffect(() => {
    if(resendCodeState.isChanging.status)
      localStorage.setItem(LocalStorageKeys.CONFIRM_USER, JSON.stringify(resendCodeState))
  }, [resendCodeState])


  const onEnterEmailFinish:FunctionWithParam<string> = async username => {
    setIsSubmitting(true)
    setResendCodeState(prevState => ({ ...prevState, username, isChanging: { status: true, time: Date.now() } }))
    const res = await apiResendOtpCode({ username })
    if(!res || !res.success){
      const { message } = res
      setErrorState(prevState => ({ ...prevState, username: message || 'Error sending Otp.' }))
    } else{
      setCurrentState(AuthPagesLabels.OTP)
      setErrorState(prevState => ({ ...prevState, username: null }))
    }
    setIsSubmitting(false)
  }

  const onOTPFinish:FunctionWithParam<string> = async OtpCode => {
    const res = await apiConfirmSignUp({ username: resendCodeState.username, OtpCode })
    if(!res || !res.success){
      const { message } = res
      setErrorState(prevState => ({ ...prevState, OtpCode: message }))
    } else{
      await router.push('/login')
      await clearStates()
    }
  }

  const handleOtpResend:FunctionWithNoParamButReturn<Promise<'SUCCESS' | 'FAILURE'>> = async () => {
    const res = await apiResendOtpCode({ username: resendCodeState.username })
    if(!res || !res.success){
      const { message } = res
      setErrorState(prevState => ({ ...prevState, OtpCode: message }))
      return 'FAILURE'
    } else{
      setErrorState(prevState => ({ ...prevState, OtpCode: null }))
      return 'SUCCESS'
    }
  }

  const clearStates = async () => {
    setCurrentState(AuthPagesLabels.CONFIRM_USER)
    setErrorState(initialErrorState)
    setResendCodeState(initialResendSignUpCode)
    await localStorage.removeItem(LocalStorageKeys.CONFIRM_USER)
  }

  const clearError:FunctionWithNoParam = () => {
    setErrorState(prevState => ({ ...prevState, OtpCode: null }))
  }

  return (
    <AuthLayout authPageLabel={currentState} additionalData={{ description: currentState === AuthPagesLabels.OTP ? generateDisplayEmail(resendCodeState.username) : '' }}>
      {currentState === AuthPagesLabels.CONFIRM_USER
        ? <EnterEmailForm isSubmitting={isSubmitting} submitForm={onEnterEmailFinish} propError={errorState.username} />
        : currentState === AuthPagesLabels.OTP
          ?
          <OTPForm
            otpResendFunction={handleOtpResend}
            error={errorState.OtpCode}
            clearError={clearError}
            handleSubmit={onOTPFinish}
            otpLength={6}
          />
          : null}
    </AuthLayout>
  )
}

export default ConfirmUser
