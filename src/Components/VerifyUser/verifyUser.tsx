import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useUserContext } from 'Context/UserProvider'

import { AuthLayout, OTPForm } from 'Components'

import { AuthPagesLabels, LocalStorageKeys } from 'Utils/enum'
import {
  FunctionWithNoParam,
  FunctionWithNoParamButReturn,
  FunctionWithParam,
  Nullable
} from 'Utils/Types'
import { generateDisplayEmail } from 'Utils/UtilFunctions'

export const VerifyUser:NextPage = () => {

  const { user: { cognitoData } } = useUserContext()
  const [loginFieldData, setLoginFieldData] = useState<Nullable<{ field: string, value: string }>>(null)
  const [error, setError] = useState<Nullable<string>>(null)

  const router = useRouter()

  useEffect(() => {
    const _data = localStorage.getItem(LocalStorageKeys.LOGIN_FIELD)
    if(_data){
      const parsedData:{ field: string, value: string } = JSON.parse(_data)
      setLoginFieldData({ ...parsedData })
    }
  }, [])

  const handleSubmit:FunctionWithParam<string> = value => {
    cognitoData?.verifyAttribute('email', value, {
      onSuccess: async () => {
        setError(null)
        await router.push('/')
      },
      onFailure: err => {
        setError(err.message)
      },
    })
  }

  const handleOtpResend:FunctionWithNoParamButReturn<Promise<'SUCCESS' | 'FAILURE'>> = () => {
    return new Promise(res => {
      cognitoData?.getAttributeVerificationCode('email', {
        onSuccess: () => {
          setError(null)
          res('SUCCESS')
        },
        onFailure: err => {
          setError(err.message)
          res('FAILURE')
        },
      })
    })
  }

  const clearOtpError:FunctionWithNoParam = () => {
    setError(null)
  }

  return (
    <AuthLayout authPageLabel={AuthPagesLabels?.VERIFY_USER} additionalData={loginFieldData ? { description: loginFieldData.field === 'email' ? generateDisplayEmail(loginFieldData.value) : loginFieldData.value } : undefined}>
      <OTPForm
        otpResendFunction={handleOtpResend}
        error={error}
        clearError={clearOtpError}
        handleSubmit={handleSubmit}
        otpLength={6}
      />
    </AuthLayout>
  )
}
