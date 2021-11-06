import React, { ChangeEventHandler, FC, FormEventHandler, createRef, useEffect, useMemo, useState } from 'react'
import { Button, FlexContainer, Input, Typography } from 'Components'
import styles from 'styles/profile/account-settings/AccountSettings.module.scss'
import { FieldTypeChangePassword, FunctionWithParamAndReturn, Nullable } from '../../../../Utils/Types'
import { validatePassword } from '../../../../Utils/validations'

interface FormStateType {
    password: string,
    newPassword: string,
    confirmPassword: string
}

const initialFormState = {
  password: '',
  newPassword: '',
  confirmPassword: ''
}

interface ErrorStateType {
    field: 'password' | 'newPassword' | 'confirmPassword',
    message: string
}

interface ChangePasswordProps {
  onSubmit: FunctionWithParamAndReturn<FieldTypeChangePassword, Promise<{ status: 'SUCCESS' | 'FAILURE', message: string }>>,
}

export const ChangePassword:FC<ChangePasswordProps> = ({ onSubmit }) => {

  const [formState, setFormState] = useState<FormStateType>(initialFormState)
  const [errorState, setErrorState] = useState<Nullable<ErrorStateType>>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const inputRefs = useMemo(() => ({
    password: createRef<HTMLInputElement>(),
    newPassword: createRef<HTMLInputElement>(),
    confirmPassword: createRef<HTMLInputElement>(),
  }) ,[])

  useEffect(() => {
    if(errorState?.field && inputRefs[errorState.field].current)
      inputRefs[errorState.field].current?.focus()

  }, [errorState, inputRefs])

  const handleChange:ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) =>{
    setFormState(prevState => ({ ...prevState, [name]: value }))
    if(errorState && errorState.field === name)
      setErrorState(null)
  }

  const passwordValidation = () => {
    let _error:Nullable<string> = null
    if(!validatePassword(formState.newPassword)) _error = 'Password is invalid.'
    if(!formState.password) _error = 'Password is required'
    if(_error)
      setErrorState({ field: 'newPassword', message: _error })
    return !_error
  }

  const matchPassword = () => {
    let _error:Nullable<string> = null
    const matched = formState.newPassword === formState.confirmPassword
    if(!matched) _error = 'Passwords didn\'t match.'
    if(!formState.confirmPassword) _error = 'Confirm Password is required'
    if(_error)
      setErrorState({ field: 'confirmPassword', message: _error })
    return !_error
  }

  const handleSubmit:FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if(!formState.password){
      setErrorState({ field: 'password', message: 'Please enter current password.' })
    }else{
      if(passwordValidation() && matchPassword()){
        setIsSubmitting(true)
        const res = await onSubmit({ oldPassword: formState.password, password: formState.newPassword })
        if(res.status === 'FAILURE')
          setErrorState({ field: 'password', message: res.message })
        else
          console.log('CHANGED: ', res.message)
        setIsSubmitting(false)
      }
    }
  }

  return(
    <form name='changePasswordForm' onSubmit={handleSubmit}>
      <FlexContainer classList={styles.accountSettingsLabelInputWrapper}>
        <Typography variant='h5' classList={styles.accountSettingsLabel}>Current Password</Typography>
        <Input ref={inputRefs.password} type='password' error={errorState?.field === 'password' ? errorState.message : null} name='password' onChange={handleChange} value={formState.password} placeholder='Current Password' category='small' wrapperStyle={styles.accountSettingsInput} disabled={isSubmitting} />
      </FlexContainer>
      <FlexContainer classList={styles.accountSettingsLabelInputWrapper}>
        <Typography variant='h5' classList={styles.accountSettingsLabel}>New Password</Typography>
        <Input ref={inputRefs.newPassword} type='password' error={errorState?.field === 'newPassword' ? errorState.message : null} onBlur={_e => passwordValidation()} name='newPassword' onChange={handleChange} value={formState.newPassword} placeholder='New Password' category='small' wrapperStyle={styles.accountSettingsInput} disabled={isSubmitting} />
      </FlexContainer>
      <FlexContainer classList={styles.accountSettingsLabelInputWrapper}>
        <Typography variant='h5' classList={styles.accountSettingsLabel}>Re-Type New Password</Typography>
        <Input ref={inputRefs.confirmPassword} type='password' error={errorState?.field === 'confirmPassword' ? errorState.message : null} name='confirmPassword' onChange={handleChange} value={formState.confirmPassword} placeholder='Re-Type New Password' category='small' wrapperStyle={styles.accountSettingsInput} disabled={isSubmitting} />
      </FlexContainer>
      <Button variant='primary' type='submit' loading={isSubmitting}>Update</Button>
    </form>
  )
}
