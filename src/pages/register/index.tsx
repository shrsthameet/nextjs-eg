import React, { useState } from 'react'

import {
  AuthLayout,
  FlexContainer,
  OTPForm,
  RegistrationForm,
  RegistrationFormState,
  UserTypeSelection
} from 'Components'

import { AuthPagesLabels, LocalStorageKeys, UserAccountType, UserCategory } from 'Utils/enum'
import { FunctionWithNoParam, FunctionWithNoParamButReturn, FunctionWithParam, Nullable } from 'Utils/Types/main'

import styles from 'styles/Register/Register.module.scss'
import { validateNumber } from '../../Utils/validations'
import { FieldTypeLogin, FieldTypeSignUp } from '../../Utils/Types'
import { nepalCountryCode } from '../../Utils/constants'
import { apiConfirmSignUp, apiResendOtpCode, apiSignUp } from '../../ApiCalls/AuthApi'
import { getFromStorage, removeStorage, updateStorage } from '../../Utils/localStorage'
import { useRouter } from 'next/router'

enum RegistrationPages {
    SELECT_TYPE = 'selectType',
    FORM = 'form',
    VERIFICATION = 'verification'
}

interface ErrorStateType {
    form: Nullable<string>,
    verification: Nullable<string>
}

const initialErrorState = {
  form: null,
  verification: null
}

const Register = () => {
  const [selectedUserCategory, setSelectedUserCategory] = useState<Nullable<UserCategory>>(null)
  const [currentPage, setCurrentPage] = useState<RegistrationPages>(RegistrationPages.SELECT_TYPE)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorState, setErrorState] = useState<ErrorStateType>(initialErrorState)

  const router = useRouter()

  const handleSelectUserType: FunctionWithParam<UserCategory> = category => {
    setSelectedUserCategory(category)
    setCurrentPage(RegistrationPages.FORM)
  }

  const handleSignUp:FunctionWithParam<RegistrationFormState> = async data => {
    setIsSubmitting(true)
    const isNumber = validateNumber(data.username)
    const isInstructor = selectedUserCategory === UserCategory.INSTRUCTOR
    const finalData:FieldTypeSignUp = {
      name: data.name,
      username: isNumber ? `${nepalCountryCode}${data.username}` : data.username,
      password: data.password,
      accountType: data.accountType,
      isLearner: !isInstructor,
      isInstructor: isInstructor,
    }
    Object.assign(finalData, data.accountType === UserAccountType.INDIVIDUAL && isInstructor ? { profession: data.profession } : null)
    const res = await apiSignUp(finalData)
    console.log('res: ', res)
    if(res && res.success) {
      updateStorage(LocalStorageKeys.SIGN_UP, JSON.stringify({ username: isNumber ? `${nepalCountryCode}${data.username}` : data.username }))
      setCurrentPage(RegistrationPages.VERIFICATION)
    }else{
      setErrorState(prevState => ({ ...prevState, form: res.message || 'Error submitting form data.' }))
    }
    setIsSubmitting(false)
  }

  const handleOtpSubmit = async (value: string) => {
    const signUpData = getFromStorage<{ username: string }>(LocalStorageKeys.SIGN_UP) as {username: string}
    if(signUpData) {
      const username = signUpData.username || ''
      const res = await apiConfirmSignUp({ OtpCode: value, username })
      if(!res || !res.success) {
        setErrorState(prevState => ({ ...prevState, verification: res.message || 'Error verifying user.' }))
      }else{
        removeStorage(LocalStorageKeys.SIGN_UP)
        await router.push('/login')
      }
    }
  }

  const handleOtpResend:FunctionWithNoParamButReturn<Promise<'SUCCESS' | 'FAILURE'>> = async () => {
    const signUpData = getFromStorage<FieldTypeLogin>(LocalStorageKeys.SIGN_UP) as { username: string }
    const res = await apiResendOtpCode({ username: signUpData.username || '' })
    if(res && !res.success){
      const { message } = res
      setErrorState(prevState => ({ ...prevState, verification: message || 'Error sending OTP.' }))
      return 'FAILURE'
    } else{
      clearErrors()
      return 'SUCCESS'
    }
  }

  const clearErrors:FunctionWithNoParam = () => {
    setErrorState(initialErrorState)
  }


  return currentPage === RegistrationPages.SELECT_TYPE
    ? <UserTypeSelection handleSelectUserType={handleSelectUserType}/>
    :
    <AuthLayout hasCompanyLogo hasFooter authPageLabel={AuthPagesLabels.USERTYPE}>
      {currentPage === RegistrationPages.FORM && selectedUserCategory
        ?
        <FlexContainer direction='col' justify='center' classList={styles.container}>
          <RegistrationForm
            selectedUserCategory={selectedUserCategory}
            isSubmitting={isSubmitting}
            onSubmit={handleSignUp}
            errorMessage={errorState.form}
          />
        </FlexContainer>
        :
        <OTPForm
          otpResendFunction={handleOtpResend}
          error={errorState.verification}
          clearError={clearErrors}
          otpLength={6}
          handleSubmit={handleOtpSubmit}
        />
      }
    </AuthLayout>
}

export default Register
