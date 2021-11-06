import React, { ChangeEventHandler, FC, FormEventHandler, ReactElement, useEffect, useState } from 'react'
import classNames from 'classnames'

import { Button, FlexContainer, Input, Modal, Option, PrivacyPolicy, RegisterFooter, Select, TermsConditions, Typography } from 'Components'

import { validateEmail, validateNumber, validatePassword } from 'Utils/validations'
import { FunctionWithParam, Nullable } from 'Utils/Types/main'

import styles from 'styles/Register/Register.module.scss'
import { UserAccountType, UserCategory } from '../../Utils/enum'

interface RegistrationFormProps {
    selectedUserCategory: UserCategory,
    isSubmitting: boolean,
    onSubmit: FunctionWithParam<RegistrationFormState>,
    errorMessage: Nullable<string>,
}

interface LegalDocsProps {
    termsConditions: boolean,
    privacyPolicy: boolean
}

export interface RegistrationFormState {
    name: string
    username: string
    password: string
    confirmPassword: string
    accountType: UserAccountType
    profession?: string
}

interface errorStateType {
    name?: string
    username?: string
    password?: string
    confirmPassword?: string
}

const initialState = {
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
  accountType: UserAccountType.INDIVIDUAL,
  profession: '',
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ selectedUserCategory, isSubmitting, onSubmit, errorMessage }) => {

  const [formState, setFormState] = useState<RegistrationFormState>(initialState)
  const [errorState, setErrorState] = useState<Nullable<errorStateType>>(null)
  const [showModal, setShowModal] = useState<Nullable<'termsConditions' | 'privacyPolicy'>>(null)
  const [legalDocs, setLegalDocs] = useState<LegalDocsProps>({
    termsConditions: true,
    privacyPolicy: true
  })

  useEffect(() => {
    if(errorMessage)
      setErrorState(prevState => prevState ? ({ ...prevState, username: errorMessage }) : ({ username: errorMessage }))
    else
      delete errorState?.username
  }, [errorMessage])


  const handleChange:ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
    errorState && delete errorState[name]
  }

  const handleSelectChange:FunctionWithParam<{ name: string; value: string | string[]; }> = ({ name, value }) => {
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleLegalDocsChange:FunctionWithParam<{ name: 'termsConditions' | 'privacyPolicy', value: boolean }> = ({ value, name }) => {
    setLegalDocs({ ...legalDocs, [name]: value })
  }

  const handleSignUp:FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if(validFormState() && legalDocs.termsConditions && legalDocs.privacyPolicy){
      await onSubmit(formState)
    }
  }

  const validFormState = ():boolean => {
    let _error:RegistrationFormState = {} as RegistrationFormState
    if(!formState.name) _error.name = 'Your name is required.'
    if(!formState.password) _error.password = 'Password is required.'
    if(!validatePassword(formState.password)) _error.password = 'Password must contain one special character, one number, once uppercase and must be more than 6 characters'
    if(!validateEmail(formState.username) && !validateNumber(formState.username) || (validateNumber(formState.username) && formState.username.length !== 10))
      _error.username = 'Please enter valid email or number.'
    if(!formState.username) _error.username = 'Email or Number is required.'
    if(!formState.confirmPassword) _error.confirmPassword = 'Re-enter your password.'
    if(formState.confirmPassword !==  formState.password) _error.password = 'Password did not match.'
    setErrorState(_error)
    return Object.keys(_error).length === 0
  }

  const modalFooter:ReactElement =
      <>
        <Button variant='secondary' onClick={() => handleLegalDocsChange({ name: showModal as 'termsConditions' | 'privacyPolicy', value: false })}>Decline</Button>
        <Button type='submit' onClick={() => handleLegalDocsChange({ name: showModal as 'termsConditions' | 'privacyPolicy', value: true })}>Accept</Button>
      </>
  return (
    <>
      {/* <div className={styles.motionInputWrapper}>
        {inputFields.map((inpItem, index) => (
          <>
            <motion.input
              id={`input_${inpItem}`}
              key={inpItem}
              className={styles.motionInputStyle}
              animate={{
                top: index * CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: INPUT_FIELDS.length - index,
              }}
              name={inpItem}
              placeholder={placeholderValue[inpItem]}
              value={formState[inpItem]}
              //   onChange={event => handleChange(event, inpItem)}
              //   onKeyPress={e => onEnter(e, inpItem)}
              type={inpItem === 'confirmPassword' ? 'password' : inpItem}
            // onKeyDown={onKeyDown}
            />
          </>
        )
        )}
      </div> */}
      <form onSubmit={handleSignUp}>
        {selectedUserCategory === UserCategory.INSTRUCTOR
          ?
          <Select wrapperStyle={styles.inputStyle} name='accountType' value={formState.accountType} mode='single' onChange={handleSelectChange}>
            <Option value={UserAccountType.INDIVIDUAL}>Individual</Option>
            <Option value={UserAccountType.ORGANIZATION}>Organization</Option>
          </Select>
          : null}
        <Input
          name='name'
          value={formState.name}
          category='small'
          type='text'
          placeholder={formState.accountType === UserAccountType.INDIVIDUAL ? 'Full Name' : 'Organization Name'}
          wrapperStyle={styles.inputStyle}
          onChange={handleChange}
          error={errorState?.name || null}
        />
        {formState.accountType === UserAccountType.INDIVIDUAL && selectedUserCategory === UserCategory.INSTRUCTOR
          ?
          <Select name='profession' wrapperStyle={styles.inputStyle} placeholder='Profession' value={formState.profession as string} mode='single' onChange={handleSelectChange}>
            <Option value='artist'>Artist</Option>
            <Option value='academic'>Academic</Option>
            <Option value='entrepreneur'>Entrepreneur</Option>
            <Option value='educator'>Educator</Option>
          </Select>
          : null}
        <Input
          name='username'
          value={formState.username}
          category='small'
          type='text'
          placeholder='Email / Number'
          wrapperStyle={styles.inputStyle}
          onChange={handleChange}
          error={errorState?.username || null}
        />
        <Input
          name='password'
          value={formState.password}
          category='small'
          type='password'
          placeholder='Password'
          wrapperStyle={styles.inputStyle}
          onChange={handleChange}
          error={errorState?.password || null}
        />
        <Input
          name='confirmPassword'
          value={formState.confirmPassword}
          category='small'
          type='password'
          placeholder='Confirm Password'
          wrapperStyle={styles.inputStyle}
          onChange={handleChange}
          error={errorState?.confirmPassword || null}
        />
        <FlexContainer justify='start' classList={styles.legalDocsModal}>
          <input type='checkbox' id='termsConditions' name='termsConditions' checked={legalDocs.termsConditions} onChange={({ target: { checked } }) => handleLegalDocsChange({ name: 'termsConditions', value: checked })}/>
          <label className={classNames(styles.legalDocsLabel, legalDocs.termsConditions ? '' : styles.legalDocsLabelError)}> I agree with the <span onClick={() => setShowModal('termsConditions')}>Terms and condition</span></label>
        </FlexContainer>
        <FlexContainer justify='start' classList={styles.legalDocsModal}>
          <input type='checkbox' id='privacyPolicy' name='privacyPolicy' checked={legalDocs.privacyPolicy} onChange={({ target: { checked } }) => handleLegalDocsChange({ name: 'privacyPolicy', value: checked })}/>
          <label className={classNames(styles.legalDocsLabel, legalDocs.privacyPolicy ? '' : styles.legalDocsLabelError)}> I agree with the <span onClick={() => setShowModal('privacyPolicy')}>Privacy Policy</span></label>
        </FlexContainer>
        <Button
          loading={isSubmitting}
          type='submit'
          disabled={errorState ? Object.keys(errorState).length > 0 : !legalDocs.termsConditions || !legalDocs.privacyPolicy}
        >
            Submit
        </Button>
      </form>
      <RegisterFooter />
      <Modal title={'Add new experience'} modalVisibility={!!showModal} onCancel={() => setShowModal(null)} footer={modalFooter}>
        <Typography>
          {showModal === 'termsConditions'
            ? <TermsConditions/>
            : <PrivacyPolicy/>}
        </Typography>
      </Modal>
    </>
  )
}
