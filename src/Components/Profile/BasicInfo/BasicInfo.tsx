import React, { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import classNames from 'classnames'

import { SocialMedia } from './SocialMedia'
import {
  Button,
  FlexContainer,
  Input,
  ScreenLoading,
  SelectOption,
  SvgIcons,
  TextArea,
  Typography,
  Upload,
  UploadType
} from 'Components'

import { useUserProfile } from 'Context/UserProfileProvider'
import { apiUserProfile } from 'ApiCalls/UserProfile'
import {
  FieldTypeBasicInfo,
  FieldTypeSocialLink,
  FunctionWithNoParam,
  FunctionWithParam, FunctionWithParamAndReturn,
  Nullable
} from 'Utils/Types'
import { SvgIconName, UploadFileTypes, UserGender } from 'Utils/enum'
import { validateNumber } from 'Utils/validations'
import styles from '../Profile.module.scss'

const initialFormState:FieldTypeBasicInfo = {
  name: '',
  about: '',
  gender: UserGender.MALE,
  phone: '',
  openToWork: false,
  image: '',
  email: '',
  socialLinks: []
}

export const BasicInfo: FC = () => {
  const [formState, setFormState] = useState<FieldTypeBasicInfo>(initialFormState)
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [_profilePic, setProfilePic] = useState<Nullable<File>>(null)

  const { profileData, loading, updateUserProfile, isUsernameNumber, fetchUserProfile } = useUserProfile()

  useEffect(() => {
    if(profileData)
      setFormState({
        name: profileData.name || '',
        about: profileData.about || '',
        gender: profileData.gender || UserGender.MALE,
        phone: profileData.phone || '',
        openToWork: profileData.openToWork,
        socialLinks: profileData.socialLinks,
        email: profileData.email
      })
  }, [profileData])



  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = ({ target: { name, value } }) => {
    if(name === 'phone' && value !== '' && (!validateNumber(value) || value.length > 10) )
      return null
    setFormState(prevState => ({ ...prevState, [name]: name === 'activeForDonation' ? value === 'on' : value }))
    setHasChanges(profileData ? profileData[name] !== value : true )
  }

  const handlePhoneNumberChange: FunctionWithParam<string> = (num = '') => {
    setFormState(prevState => ({ ...prevState, phone: num }))
    setHasChanges(profileData ? profileData.phone !== num : true)
  }

  const handleRadioChange:FunctionWithParam<boolean> = value => {
    setFormState(prevState => ({ ...prevState, openToWork: value }))
    setHasChanges(hasChanges ? hasChanges : profileData ? profileData?.openToWork !== value : true )
  }

  const handleSocialMediaSubmit:FunctionWithParamAndReturn<FieldTypeSocialLink[], Promise<'SUCCESS' | 'FAILED'>> = async data => {
    const { image, ...resetState } = formState
    const res = await apiUserProfile.updateBasicInfo({ ...resetState, socialLinks: data })
    if(res && res.success && res.data){
      updateUserProfile(res.data)
      return 'SUCCESS'
    }else{
      return 'FAILED'
    }
  }


  const handleFileChange:FunctionWithParam<UploadType> = ({ file, fileName }) => {
    setProfilePic(file)
    setFormState(prevState => ({ ...prevState, image: fileName }))
    setHasChanges(!!file && !!fileName)
  }

  const handleSubmit:FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    let submitFormState = { ...formState }
    if(!formState.image || !_profilePic) delete submitFormState.image
    const res = await apiUserProfile.updateBasicInfo(submitFormState)
    if(res && res.success && res.data){
      const { imagePreSignedUrl, ...restData } = res.data
      if(imagePreSignedUrl){
        try{
          await fetch(imagePreSignedUrl, { method: 'PUT', body: _profilePic })
          fetchUserProfile()
        } catch (err) {
          console.error('err: ', err)
        }
      }else{
        updateUserProfile(restData)
      }
    }
    else
      console.error('err: ', (res ? res.message : ''))
    clearStates()
  }

  const clearStates:FunctionWithNoParam = () => {
    setHasChanges(false)
    setIsSubmitting(false)
    setProfilePic(null)
  }

  const genderOptions = [
    { name: 'Male', value: UserGender.MALE },
    { name: 'Female', value: UserGender.FEMALE },
    { name: 'Other', value: UserGender.OTHER },
  ]

  return loading
    ? <ScreenLoading />
    :
    <>
      <form onSubmit={handleSubmit}>
        <FlexContainer classList={styles.profileLabelInputWrapper} align='start'>
          <Typography classList={styles.profileLabel}>Full Name</Typography>
          <Typography classList={styles.profileUnEditableValue}>{formState.name}</Typography>
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper} align='start'>
          <Typography classList={styles.profileLabel}>Profile Pic</Typography>
          <Upload imageUrl={profileData ? profileData.picUrl : null} draggable accept={UploadFileTypes.IMAGE} onChange={handleFileChange} sizeLimit={800} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper} align='start'>
          <Typography classList={styles.profileLabel}>About</Typography>
          <TextArea error={null} name='about' onChange={handleChange} value={formState.about} placeholder='About yourself' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper} align='start'>
          <Typography classList={styles.profileLabel}>Gender</Typography>
          <SelectOption category='small' error={null} name='gender' placeholder='Link' value={formState.gender} onChange={handleChange} wrapperStyle={styles.profileInput}>
            {genderOptions.map(gen => <option key={gen.value} value={gen.value}>{gen.name}</option>)}
          </SelectOption>
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper} align='start'>
          <Typography classList={styles.profileLabel}>Social Links</Typography>
          <SocialMedia socialLinks={profileData?.socialLinks || []} onSubmit={handleSocialMediaSubmit} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper} align='start'>
          <Typography classList={styles.profileLabel}>
            Phone Number
            {profileData?.phoneVerified
              ? <FlexContainer classList={styles.verifiedMark} justify='center'><SvgIcons iconName={SvgIconName.TICK_MARK}/></FlexContainer>
              : null}
          </Typography>
          {isUsernameNumber
            ? <Typography classList={styles.profileUnEditableValue}>{profileData?.phone}</Typography>
            :
            <PhoneInput
              limitMaxLength
              international={false}
              countryCallingCodeEditable={true}
              onChange={handlePhoneNumberChange}
              value={formState.phone}
              className={classNames(styles.profileInput, styles.profilePhoneNumber)}
              disabled={isSubmitting}
              defaultCountry={'NP'}
            />
          }
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper} align='start'>
          <Typography classList={styles.profileLabel}>
            Email
            {profileData?.emailVerified
              ? <FlexContainer classList={styles.verifiedMark} justify='center'><SvgIcons iconName={SvgIconName.TICK_MARK}/></FlexContainer>
              : null}
          </Typography>
          {isUsernameNumber
            ? <Input error={null} name='email' onChange={handleChange} value={formState.email} placeholder='Enter your email' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
            : <Typography classList={styles.profileUnEditableValue}>{profileData?.email}</Typography>
          }
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper} align='start'>
          <Typography classList={styles.profileLabel}>Open To Work</Typography>
          <Button type='button' className={styles.profileRadioButton} variant={formState.openToWork ? 'primary' : 'secondary'} onClick={() => handleRadioChange(true)}>Yes</Button>
          <Button type='button' className={styles.profileRadioButton} variant={!formState.openToWork ? 'primary' : 'secondary'} onClick={() => handleRadioChange(false)}>No</Button>
        </FlexContainer>
        <div className={styles.profileInput}>
          <Button disabled={!hasChanges} loading={isSubmitting} type='submit'>Update</Button>
        </div>
      </form>
    </>
}
