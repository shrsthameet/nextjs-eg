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
  FieldTypeWorkExperience,
  FunctionWithNoParam,
  FunctionWithNoParamButReturn,
  FunctionWithParam, FunctionWithParamAndReturn,
  Nullable
} from 'Utils/Types'

import styles from '../Profile.module.scss'
import workExperienceStyles  from './WorkExperience.module.scss'
import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import { useUserProfile } from 'Context/UserProfileProvider'
import { apiUserProfile } from '../../../ApiCalls/UserProfile'
import { ProfileYearMonthForm, getMonthName } from '../ProfileYearMonthForm'
import { fallBackImagesUrl } from '../../../Utils/constants'

const initialFormState: FieldTypeWorkExperience = {
  company: {
    name: '',
    id: ''
  },
  title: '',
  workedFrom: '',
  workedTill: '',
}

export const WorkExperience:FC = () => {
  const [formState, setFormState] = useState<FieldTypeWorkExperience>(initialFormState)
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [toEditExperience, setToEditExperience] = useState<Nullable<FieldTypeWorkExperience>>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [modalVisibility, setModalVisibility] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const { profileData, updateUserProfile } = useUserProfile()

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: name === 'company' ? { id: null, name: value } : value })
    setHasChanges(toEditExperience ? toEditExperience[name] !== value : true)
  }

  const getPreviousData:FunctionWithNoParamButReturn<FieldTypeWorkExperience[]> = () => {
    return profileData && profileData.workExperiences.length > 0 ?
      toEditExperience ?
        profileData.workExperiences.filter(exp => exp.title !== toEditExperience.title && exp.company.name !== toEditExperience.company.name && exp.workedTill !== toEditExperience.workedTill && exp.workedFrom !== toEditExperience.workedFrom)
        : profileData.workExperiences
      : []
  }

  const handleSubmit:MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    const res = await apiUserProfile.updateExperience({ update: formState, data: getPreviousData() })
    if(res && res.success && res.data){
      updateUserProfile(profileData ? { ...profileData, workExperiences: res.data } : null)
      resetState()
    }
    else
      console.error('err: ', res.message)
    setIsSubmitting(false)
  }

  const resetState:FunctionWithNoParam = () => {
    setFormState(initialFormState)
    setHasChanges(false)
    setToEditExperience(null)
    setIsSubmitting(false)
    setModalVisibility(false)
  }

  useEffect(() => {
    if(toEditExperience) {
      setFormState(toEditExperience)
      setModalVisibility(true)
    }
  }, [toEditExperience])

  const handleEdit:FunctionWithParam<string> = id => {
    const toUpdateExp = profileData ? profileData?.workExperiences.filter((_sd, i) => i === parseInt(id))[0] : null
    setToEditExperience(toUpdateExp)
  }

  const handleDelete:FunctionWithParam<string> = id => {
    const toUpdateExp = profileData ? profileData?.workExperiences.filter((_sd, i) => i === parseInt(id))[0] : null
    setToEditExperience(toUpdateExp)
  }

  const setStartEndDates:FunctionWithParam<{ type: 'startDate' | 'endDate', value: string }> = ({ type, value }) => {
    if(type === 'startDate')
      setFormState(prevState => ({ ...prevState, workedFrom: value }))
    else
      setFormState(prevState => ({ ...prevState, workedTill: value }))
  }

  const formFooter:ReactElement =
      <>
        <Button variant='secondary' onClick={resetState}>Cancel</Button>
        <Button type='submit' onClick={handleSubmit} disabled={!hasChanges} loading={isSubmitting}>Confirm</Button>
      </>

  return (
    <FlexContainer direction='col' justify='start' classList={workExperienceStyles.workExperienceWrapper}>
      {profileData && profileData.workExperiences.length > 0
        ? profileData.workExperiences.map((exp, i) => {
          const data:FieldTypeEduOrExpCard = { id: `${i}`, imageUrl: fallBackImagesUrl.company, title: exp.title, subTitle: exp.company.name, startDate: getYearMonth(exp.workedFrom), endDate: getYearMonth(exp.workedTill) }
          return <EduOrExpCard key={i} data={data} onEdit={handleEdit} onDelete={handleDelete} />
        })
        : <Typography variant='h6'>Please add new work experience</Typography>
      }
      <Button variant='secondary' onClick={() => setModalVisibility(true)} className={styles.addNewButton}><span>+</span> Add More Experience</Button>
      <Modal title={'Add new experience'} modalVisibility={modalVisibility} onCancel={resetState} footer={formFooter}>
        <form name='experienceForm' ref={formRef}>
          <FlexContainer classList={styles.profileLabelInputWrapper}>
            <Typography variant='h5' classList={styles.profileLabel}>Company</Typography>
            <Input autoFocus={true} type='text' error={null} name='company' onChange={handleChange} value={formState.company.name} placeholder='Company' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
          </FlexContainer>
          <FlexContainer classList={styles.profileLabelInputWrapper}>
            <Typography variant='h5' classList={styles.profileLabel}>Title</Typography>
            <FlexContainer direction='col' align='start' justify='start'>
              <Input type='text' error={null} name='title' onChange={handleChange} value={formState.title} placeholder='Title' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
            </FlexContainer>
          </FlexContainer>
          <ProfileYearMonthForm setHasChanges={setHasChanges} isSubmitting={isSubmitting} startDate={formState.workedFrom} endDate={formState.workedTill} setStartEnd={setStartEndDates} />
        </form>
      </Modal>
    </FlexContainer>
  )
}

const getYearMonth:FunctionWithParamAndReturn<string, string> = date => {
  if(!date)
    return ''
  const splitDate = date.split('-')
  if(splitDate.length < 1)
    return ''
  return `${capitalizeFirstLetterOfEachWord(getMonthName(splitDate[1]))} ${splitDate[0]} `
}
