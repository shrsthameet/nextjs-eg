import { ComponentPropsWithoutRef, FC, RefObject, createRef, useEffect, useState } from 'react'
import classNames from 'classnames'

import { FlexContainer, Typography } from 'Components'

import {
  FunctionWithNoParam,
  FunctionWithNoParamButReturn,
  FunctionWithParam,
  GenericObject,
  Nullable
} from 'Utils/Types'
import { LocalStorageKeys } from 'Utils/enum'

import styles  from './OTPForm.module.scss'

interface OTPFormProps {
  otpLength: number,
  handleSubmit: FunctionWithParam<string>,
  error: Nullable<string>,
  otpResendFunction: FunctionWithNoParamButReturn<Promise<'SUCCESS' | 'FAILURE'>>,
  clearError: FunctionWithNoParam,
}

export const OTPForm:FC<ComponentPropsWithoutRef<'input'> & OTPFormProps> = ({ clearError, otpLength, otpResendFunction, readOnly, error, handleSubmit, ...props }) => {
  const arr = [...new Array(otpLength)]
  let refs:GenericObject<RefObject<HTMLInputElement>> = {}
  arr.map((_e, i) => (refs[`input${i + 1}`] = createRef()))

  const [otpArray, setOtpArray] = useState(arr)
  const [disableOtpResend, setDisableOtpResend] = useState<boolean>(false)
  const [counter, setCounter] = useState<number>(60)

  const disableOtpResendText:FunctionWithNoParam = async () => {
    setDisableOtpResend(true)
    const resendAct = (Date.now() / 1000) + 60
    await localStorage.setItem(LocalStorageKeys.OTP_ACTIVATE_TIME, JSON.stringify({ activateTime: resendAct }))
    const resendInterval = setInterval(() => {
      setCounter(Math.floor(resendAct - (Date.now()/1000)))
    }, 1000)
    const resendTimeout = setTimeout(() => {
      clearInterval(resendInterval)
      setCounter(60)
      setDisableOtpResend(false)
      localStorage.removeItem(LocalStorageKeys.OTP_ACTIVATE_TIME)
      clearTimeout(resendTimeout)
    }, 60000)
  }

  useEffect(()=> {
    const getDataFromLocal = async () => {
      try {
        const localData = await localStorage.getItem(LocalStorageKeys.OTP_ACTIVATE_TIME)
        if(localData && JSON.parse(localData)){
          const parsedData:{activateTime: number} = JSON.parse(localData)
          if(parsedData.activateTime && parsedData.activateTime > (Date.now() / 1000) ){
            setDisableOtpResend(true)
            const diff = parsedData.activateTime - (Date.now() / 1000)
            const resendInterval = setInterval(() => {
              setCounter(Math.floor((parsedData.activateTime ? parsedData.activateTime : 0) - (Date.now()/1000)))
            }, 1000)
            const resendTimeout = setTimeout(() => {
              setDisableOtpResend(false)
              clearTimeout(resendTimeout)
              clearInterval(resendInterval)
              setCounter(60)
              localStorage.removeItem(LocalStorageKeys.OTP_ACTIVATE_TIME)
            }, (diff * 1000))
          }
        }else{
          disableOtpResendText()
        }
      }catch (err){
        console.error(err)
      }
    }
    getDataFromLocal()

  } ,[])

  function handleChange(e, key) {
    const value = e.target.value
    const checkNum = new RegExp('^[0-9]$')
    let newOtpArray = [...otpArray]
    newOtpArray[key - 1] = checkNum.test(value) ? value : ''
    setOtpArray(newOtpArray)
    const valueToUplift = newOtpArray.join('')
    if (valueToUplift.length === otpLength) {
      handleSubmit(valueToUplift)
    }
    if (key === 1) {
      //  for first input field, shift focus to second one if its value is present
      if (value && checkNum.test(value))
        refs[`input${key + 1}`]?.current?.focus()
    }

    if (key > 1 && key < otpLength) {
      // for second to second last input field, shift focus to previous /next one according to value
      if (value && checkNum.test(value)) {
        refs[`input${key + 1}`]?.current?.focus()
      } else {
        refs[`input${key - 1}`]?.current?.focus()
      }
    }

    if (key === otpLength) {
      // for last input child, shift focus to previous on no value
      if (!value) refs[`input${key - 1}`]?.current?.focus()
    }
    clearError()
  }

  const handleOtpResend:FunctionWithNoParam = async () => {
    const res = await otpResendFunction()
    if(res === 'SUCCESS') {
      await disableOtpResendText()
    }
  }

  return (
    <FlexContainer direction='col' classList={styles.otpWrapper}>
      <form onSubmit={e => e.preventDefault()} className={styles.otpForm} >
        {arr.map((_e, i) => (
          <input
            autoFocus={i === 0}
            className={classNames(styles.otpInput, error ? styles.codeError : otpArray[i] ? styles.codeEntered : '')}
            key={i + 1}
            ref={refs[`input${i+1}`]}
            value={otpArray[i] || ''}
            onChange={e => handleChange(e, i + 1)}
            type='text'
            maxLength={1}
            autoComplete='off'
            name={props.name}
            readOnly={readOnly}
          />
        ))}
      </form>
      <Typography variant='p' classList={styles.otpResendLabel}>Don&apos;t have code?&nbsp;
        <span
          className={classNames(styles.otpResendAction, disableOtpResend ? styles.otpResendDisabled : '')}
          onClick={!disableOtpResend ? handleOtpResend : () => null}
        >
          {disableOtpResend ? `in ${counter} seconds...` : 'Resend Code'}
        </span>
      </Typography>
      {error ? <Typography classList={styles.otpError}>{error}</Typography> : null}
    </FlexContainer>
  )
}
