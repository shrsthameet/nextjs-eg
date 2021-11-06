import { ChangeEventHandler, FC, FormEventHandler, useEffect, useRef, useState } from 'react'

import { Button, Input } from 'Components'

import { validateEmail, validateNumber } from 'Utils/validations'
import { FunctionWithParam, Nullable } from 'Utils/Types'
import { nepalCountryCode } from '../../../Utils/constants'

interface EnterEmailFormProps {
  submitForm: FunctionWithParam<string>,
  propError: Nullable<string>,
  isSubmitting: boolean
}

const EnterEmailForm:FC<EnterEmailFormProps> = ({ submitForm, propError, isSubmitting }) => {
  const [username, setUsername] = useState<string>('')
  const [error, setError] = useState<Nullable<string>>(null)

  const usernameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(propError) {
      setError(propError)
      usernameRef.current?.focus()
    }
  }, [propError])

  const handleChange:ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setUsername(value)
    setError(null)
  }

  const handleSubmit:FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if(validFormState()){
      submitForm(validateNumber(username) ? `${nepalCountryCode}${username}` : username)
    }
  }

  const validFormState = ():boolean => {
    let _error:string = ''
    if(!validateEmail(username) && !validateNumber(username) || (validateNumber(username) && username.length !== 10))
      _error = 'Please enter valid email or number.'
    if(!username) _error = 'Email or Number is required.'
    if(_error){
      setError(_error)
      usernameRef?.current?.focus()
    }
    return _error.length === 0
  }

  return(
    <form onSubmit={handleSubmit}>
      <Input ref={usernameRef} autoFocus={true} error={error} type='text' name='email' placeholder='Email Address or Number' value={username} onChange={handleChange} />
      <Button loading={isSubmitting} type='submit' disabled={!!error} >Submit</Button>
    </form>
  )
}

export { EnterEmailForm }
