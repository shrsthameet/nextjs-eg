import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  Button,
  EduOrExpCard,
  FieldTypeEduOrExpCard,
  FlexContainer,
  Input,
  Modal,
  Typography
} from 'Components'

import {
  FieldTypeEducationInfo,
  FunctionWithNoParam, FunctionWithNoParamButReturn,
  FunctionWithParam,
  Nullable
} from 'Utils/Types'

import styles from '../Profile.module.scss'
import educationStyles  from './Education.module.scss'
import { getYearList, isNumber } from 'Utils/UtilFunctions'
import { useUserProfile } from 'Context/UserProfileProvider'
import { apiUserProfile } from '../../../ApiCalls/UserProfile'
import { fallBackImagesUrl } from '../../../Utils/constants'

const initialFormState: FieldTypeEducationInfo = {
  school: {
    name: '',
    id: ''
  },
  degree: '',
  startYear: '',
  endYear: '',
}

export const Education:FC = () => {
  const [formState, setFormState] = useState<FieldTypeEducationInfo>(initialFormState)
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [toEditEducationInfo, setToEditEducationInfo] = useState<Nullable<FieldTypeEducationInfo>>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [modalVisibility, setModalVisibility] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const { profileData, updateUserProfile } = useUserProfile()

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = ({ target: { name, value } }) => {
    if((name === 'startYear' || name === 'endYear') && (value !== '') && (!isNumber(value) || value.length > 4))
      return null
    setFormState({ ...formState, [name]: name === 'school' ? { id: null, name: value } :value })
    setHasChanges(toEditEducationInfo ? toEditEducationInfo[name] !== value : true)
  }

  const getPreviousData:FunctionWithNoParamButReturn<FieldTypeEducationInfo[]> = () => {
    return profileData && profileData.educations.length > 0 ?
      toEditEducationInfo ?
        profileData.educations.filter(exp => exp.degree !== toEditEducationInfo.degree && exp.school.name !== toEditEducationInfo.school.name && exp.endYear !== toEditEducationInfo.endYear && exp.startYear !== toEditEducationInfo.startYear)
        : profileData.educations
      : []
  }

  const handleSubmit:MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    const res = await apiUserProfile.updateEducationInfo({ update: formState, data: getPreviousData() })
    if(res && res.success && res.data){
      updateUserProfile(profileData ? { ...profileData, educations: res.data } : null)
      setModalVisibility(false)
    }
    else
      console.error('err: ', res)
    setIsSubmitting(false)
  }

  const resetState:FunctionWithNoParam = () => {
    setFormState(initialFormState)
    setHasChanges(false)
    setToEditEducationInfo(null)
    setIsSubmitting(false)
    setModalVisibility(false)
  }

  useEffect(() => {
    if(toEditEducationInfo) {
      setFormState(toEditEducationInfo)
      setModalVisibility(true)
    }
  }, [toEditEducationInfo])

  const handleEdit:FunctionWithParam<string> = id => {
    setToEditEducationInfo(profileData ? profileData?.educations.filter((_sd, i) => i === parseInt(id))[0] : null)
  }

  const handleDelete:FunctionWithParam<string> = id => {
    setToEditEducationInfo(profileData ? profileData?.educations.filter((_sd, i) => i === parseInt(id))[0] : null)
  }

  const formFooter:ReactElement =
      <>
        <Button variant='secondary' onClick={resetState}>Cancel</Button>
        <Button type='submit' onClick={handleSubmit} disabled={!hasChanges} loading={isSubmitting}>Confirm</Button>
      </>

  return (
    <FlexContainer direction='col' justify='start' classList={educationStyles.educationWrapper}>
      {profileData && profileData.educations.length > 0
        ? profileData.educations.map((edu, i) => {
          const data:FieldTypeEduOrExpCard = { id: `${i}`, imageUrl: fallBackImagesUrl.school, title: edu.degree, subTitle: edu.school.name, startDate: edu.startYear, endDate: edu.endYear }
          return <EduOrExpCard key={i} data={data} onEdit={handleEdit} onDelete={handleDelete} />
        })
        : <Typography variant='h6'>Please add new education degree</Typography>}
      <Button variant='secondary' onClick={() => setModalVisibility(true)} className={styles.addNewButton}><span>+</span> Add More Education</Button>
      <Modal title={'Add new experience'} modalVisibility={modalVisibility} onCancel={resetState} footer={formFooter}>
        <form name='experienceForm' ref={formRef}>
          <FlexContainer classList={styles.profileLabelInputWrapper}>
            <Typography variant='h5' classList={styles.profileLabel}>School</Typography>
            <Input autoFocus={true} type='text' error={null} name='school' onChange={handleChange} value={formState.school.name} placeholder='School' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
          </FlexContainer>
          <FlexContainer classList={styles.profileLabelInputWrapper}>
            <Typography variant='h5' classList={styles.profileLabel}>Degree</Typography>
            <FlexContainer direction='col' align='start' justify='start'>
              <Input type='text' error={null} name='degree' onChange={handleChange} value={formState.degree} placeholder='Degree' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
            </FlexContainer>
          </FlexContainer>
          <FlexContainer classList={styles.profileLabelInputWrapper}>
            <Typography variant='h5' classList={styles.profileLabel}>Start Year</Typography>
            <Input list='startYearList' type='text' autoComplete='none' placeholder='Start year' error={null} name='startYear' onChange={handleChange} value={formState.startYear} category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
          </FlexContainer>
          <FlexContainer classList={styles.profileLabelInputWrapper}>
            <Typography variant='h5' classList={styles.profileLabel}>End Year</Typography>
            <Input list='endYearList' type='text' autoComplete='none' placeholder='End year' error={null} name='endYear' onChange={handleChange} value={formState.endYear} category='small' wrapperStyle={styles.profileInput} disabled={!formState.startYear || isSubmitting} />
          </FlexContainer>
        </form>
        <datalist id='startYearList' >
          {getYearList().map(year => <option key={year} value={year} disabled={parseInt(formState.endYear) <= parseInt(year)} />)}
        </datalist>
        <datalist id='endYearList' >
          {getYearList().map(year => <option key={year} value={year} disabled={parseInt(formState.startYear) >= parseInt(year)} />)}
        </datalist>
      </Modal>
    </FlexContainer>
  )
}
