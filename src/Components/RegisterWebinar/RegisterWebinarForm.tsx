import { FlexContainer, Input } from 'Components'
import { WebinarRegistrationFieldType } from 'pages/webinar-registration/[id]'
import React, { ChangeEventHandler, FC }  from 'react'
import styles from '../../styles/scheduleWebinar/ScheduleWebinar.module.scss'

interface RegisterWebinarFormProps {
    formState: WebinarRegistrationFieldType,
    handleChange: ChangeEventHandler<HTMLInputElement>
}

export const RegisterWebinarForm: FC<RegisterWebinarFormProps> = props => {
  const { formState, handleChange } = props
  const { name, email, phone } = formState
  return (
    <>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <p>Full Name</p>
        <Input autoComplete='off' type='text' error='' wrapperStyle={styles.inputFieldWrapper} category='small' name='name' value={name} placeholder='Full Name' onChange={handleChange} />
      </FlexContainer>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <p>Email Address</p>
        <Input autoComplete='off' type='email' error='' wrapperStyle={styles.inputFieldWrapper} category='small' name='email' value={email} placeholder='Email Address' onChange={handleChange} />
      </FlexContainer>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <p>Contact Number</p>
        <Input autoComplete='off' type='number' error='' wrapperStyle={styles.inputFieldWrapper} category='small' name='phone' value={phone} placeholder='Contact Number' onChange={handleChange}/>
      </FlexContainer>
    </>
  )
}
