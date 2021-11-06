import { ChangeEventHandler, FC, FormEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { AuthLayout, Button, FlexContainer, Input, Modal, OTPForm, Typography } from 'Components'

import { useUserContext } from 'Context'
import { apiReactivateAccount, apiResendOtpCode, apiSignIn } from 'ApiCalls/AuthApi'

import { validateEmail, validateNumber } from 'Utils/validations'
import {
  ErrorObject,
  FunctionWithNoParam,
  FunctionWithNoParamButReturn,
  FunctionWithParam,
  Nullable
} from 'Utils/Types/main'
import { AWSExceptionCode, AuthPagesLabels, UserAccountStatus } from 'Utils/enum'
import { nepalCountryCode } from 'Utils/constants'

import styles from 'styles/login/Login.module.scss'
import { generateDisplayEmail } from '../../Utils/UtilFunctions'
import { loginExceptionLabels } from '../../Utils/en'

interface FieldTypeLogin {
    username: string,
    password: string,
}

const initialState = {
  username: '',
  password: ''
}

const Login:FC = () => {
  const [formState, setFormState] = useState<FieldTypeLogin>(initialState)
  const [errorState, setErrorState] = useState<Nullable<{username?: string, password?: string}>>(null)
  const [otpError, setOtpError] = useState<Nullable<string>>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [needReactivation, setNeedReactivation] = useState<boolean>(false)
  const [activeLoginExceptionLabel, setActiveLabel] = useState<Nullable<{ title: string, description: string }>>(null)
  const updatedUsername: string = useMemo(() => validateNumber(formState.username) ? `${nepalCountryCode}${formState.username}` : formState.username, [formState.username])

  const router = useRouter()
  const { isLoggedIn, user: { isAccountActive } } = useUserContext()

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleChange:ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
    setErrorState(null)
  }

  useEffect(() => {
    if(isLoggedIn && isAccountActive)
      router.push('/')
  }, [isLoggedIn, router, isAccountActive])

  const handleSubmit:FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if(validFormState()){
      setIsSubmitting(true)
      const res = await apiSignIn({ ...formState, username: updatedUsername })
      if((res as ErrorObject)?.error) {
        const { error } = res as ErrorObject
        if(error === AWSExceptionCode.UNCONFIRMED_LOGIN) await router.push('/confirm-user')
        if(error === UserAccountStatus.DEACTIVATED) setNeedReactivation(true)
        if(error === UserAccountStatus.TO_BE_DELETED) setActiveLabel(loginExceptionLabels.deleted)
        if(error === UserAccountStatus.SUSPENDED) setActiveLabel(loginExceptionLabels.suspended)
        setErrorState({ password: error })
        passwordRef.current?.focus()
      }else{
        await router.push('/')
      }
      setIsSubmitting(false)
    }
  }

  const validFormState = ():boolean => {
    let _error:FieldTypeLogin = {} as FieldTypeLogin
    if(!formState.password) {
      _error.password = 'Password is required.'
      passwordRef.current?.focus()
    }
    if(!validateEmail(formState.username) && !validateNumber(formState.username) || (validateNumber(formState.username) && formState.username.length !== 10)) {
      _error.username = 'Please enter valid email or number.'
      usernameRef.current?.focus()
    }
    if(!formState.username) {
      _error.username = 'username is required.'
      usernameRef.current?.focus()
    }
    setErrorState(_error)
    return Object.keys(_error).length === 0
  }

  const handleOtpResend:FunctionWithNoParamButReturn<Promise<'SUCCESS' | 'FAILURE'>> = async () => {
    const res = await apiResendOtpCode({ username: formState.username })
    if(res && !res.success){
      const { message } = res
      setOtpError(message)
      return 'FAILURE'
    } else{
      setOtpError(null)
      return 'SUCCESS'
    }
  }

  const clearOtpError:FunctionWithNoParam = () => {
    setErrorState(null)
  }

  const reactivateAccount: FunctionWithParam<string> = async otpCode => {
    const res = await apiReactivateAccount({ OtpCode: otpCode, username: updatedUsername })
    if(res && !res.success){
      const { message } = res
      setOtpError(message)
    } else{
      setOtpError(null)
      router.push('/')
    }
  }

  return isLoggedIn && isAccountActive
    ? null
    :
    <AuthLayout
      hasCompanyLogo
      hasFooter
      authPageLabel={needReactivation ? AuthPagesLabels.REACTIVATE : AuthPagesLabels?.LOGIN}
      {...Object.assign({}, needReactivation ? { additionalData: { description: generateDisplayEmail(updatedUsername) } } : null)}
    >
      {needReactivation
        ? <OTPForm otpResendFunction={handleOtpResend} error={otpError} otpLength={6} clearError={clearOtpError} handleSubmit={reactivateAccount} />
        :
        <>
          <form onSubmit={handleSubmit}>
            <Input ref={usernameRef} autoFocus={true} error={errorState?.username || null} type='text' name='username' placeholder='Email Address' value={formState.username} category='small' onChange={handleChange} />
            <Input ref={passwordRef} error={errorState?.password || null} type='password' name='password' placeholder='Password' value={formState.password} category='small' onChange={handleChange} />
            <Button loading={isSubmitting} type='submit' disabled={errorState ? Object.keys(errorState).length > 0 : false} >Submit</Button>
          </form>
          <FlexContainer direction='col' classList={styles.helpingLinksWrapper}>
            <Typography variant='p' classList={styles.helpingRegister}>Don’t have an account? <Link href={{ pathname: '/register' }}>Sign up</Link></Typography>
            <Typography variant='p' classList={styles.helpingForgotPass}><Link href={{ pathname: '/trouble-login' }}>Forgot Password?</Link></Typography>
          </FlexContainer>
        </>
      }
      <Modal modalVisibility={!!activeLoginExceptionLabel} onCancel={() => setActiveLabel(null)} footer={null} header={null} disableClose={false} >
        {activeLoginExceptionLabel
          ?
          <FlexContainer direction='col' >
            <Typography variant='h6' weight='bold'>{activeLoginExceptionLabel.title}</Typography>
            <Typography variant='p'>{activeLoginExceptionLabel.description}</Typography>
          </FlexContainer>
          : null}
      </Modal>
    </AuthLayout>
}

export default Login
