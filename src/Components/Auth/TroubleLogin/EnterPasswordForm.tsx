import { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react'

import { Button, Input } from 'Components'

import { validatePassword } from 'Utils/validations'
import { FunctionWithParam, Nullable } from 'Utils/Types'

interface FieldTypeEnterPasswords {
    confirmPassword: string,
    password: string,
}

interface EnterPasswordFormProps{
  submitForm: FunctionWithParam<string>,
  propError: Nullable<string>,
  isSubmitting: boolean
}

const initialState = {
  confirmPassword: '',
  password: ''
}

const EnterPasswordForm:FC<EnterPasswordFormProps> = ({ submitForm, propError, isSubmitting }) => {
  const [formState, setFormState] = useState<FieldTypeEnterPasswords>(initialState)
  const [errorState, setErrorState] = useState<Nullable<{confirmPassword?: string, password?: string}>>(null)

  useEffect(() => {
    if(propError) setErrorState({ password: propError, confirmPassword: propError })
  },[propError])

  const passwordValidation = () => {
    let _error:Nullable<string> = null
    if(!validatePassword(formState.password)) _error = 'Password is invalid.'
    if(!formState.password) _error = 'Password is required'
    if(_error)
      setErrorState(prevState => ({ ...prevState, password: _error as string }))
    return !_error
  }

  const matchPassword = () => {
    let _error:Nullable<string> = null
    const matched = formState.password === formState.confirmPassword
    if(!matched) _error = 'Passwords didn\'t match.'
    if(!formState.confirmPassword) _error = 'Confirm Password is required'
    if(_error)
      setErrorState(prevState => ({ ...prevState, confirmPassword: _error as string }))
    return !_error
  }

  const handleFinish:FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if(passwordValidation() && matchPassword()){
      submitForm(formState.password)
    }
  }

  const handleChange:ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
    errorState && delete errorState[name]
  }

  return (
    <form name='change password' onSubmit={handleFinish}>
      <Input
        disabled={isSubmitting}
        error={errorState?.password || null}
        type='password'
        name='password'
        placeholder='Password'
        value={formState.password}
        category='small'
        onChange={handleChange}
        onBlur={passwordValidation}
      />
      <Input
        disabled={isSubmitting}
        error={errorState?.confirmPassword || null}
        type='password'
        name='confirmPassword'
        placeholder='Confirm Password'
        value={formState.confirmPassword}
        category='small'
        onChange={handleChange}
        onBlur={matchPassword}
      />
      <Button loading={isSubmitting} type='submit' disabled={errorState ? Object.keys(errorState).length > 0 : false} >Submit</Button>
    </form>
  )
}

export { EnterPasswordForm }
