import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'

import { FieldTypeOtherInfo } from 'Utils/Types'

import styles from '../Profile.module.scss'
import { Button, FlexContainer, Input, Typography } from 'Components'

const initialOtherInfoState:FieldTypeOtherInfo = {
  areasOfInterest: '',
  preferredSubjects: '',
  learningPreferences: ''
}

export const OtherInfo = () => {
  const [formState, setFormState] = useState<FieldTypeOtherInfo>(initialOtherInfoState)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = event => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log(formState)
    setIsSubmitting(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Area of Interest</Typography>
          <Input autoFocus={true} type='text' error={null} name='areasOfInterest' onChange={handleChange} value={formState.areasOfInterest} placeholder='Areas of interest' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Preferred Subjects</Typography>
          <Input autoFocus={true} type='text' error={null} name='preferredSubjects' onChange={handleChange} value={formState.preferredSubjects} placeholder='Preferred Subjects' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Learning Preferences</Typography>
          <Input autoFocus={true} type='text' error={null} name='learningPreferences' onChange={handleChange} value={formState.learningPreferences} placeholder='Learning Preferences' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <Button type='submit' loading={isSubmitting}>Update</Button>
      </form>
    </>
  )
}
