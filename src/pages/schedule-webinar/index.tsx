import { Button, FlexContainer, ProgressBar, Typography } from 'Components'
import { ScheduledWebinarForm } from 'Components/ScheduleWebinar/ScheduledWebinarForm'
import { ChangeEventHandler, useEffect, useState } from 'react'
import styles from 'styles/scheduleWebinar/ScheduleWebinar.module.scss'
import { FunctionWithNoParam, Nullable } from 'Utils/Types'
import { RRule } from 'rrule'
import { apiWebinar } from 'ApiCalls/ScheduleWebinar'
import { getFromStorage, removeStorage, updateStorage } from 'Utils/localStorage'
import { useRouter } from 'next/router'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useUserProfile } from 'Context/UserProfileProvider'
export interface formStateProps {
    type: string
    topic: string
    photoOrVideo: string
    startDate: string
    repeat: string
    endWebinar: string
    execution: number
    endDate: string
    timeDurationFrom: string
    timeDurationTo: string
    timeZone: string
    moderator: string
    comoderator: string
    speaker: string[]
    maxParticipants: string
}
export interface InstructorList {
    id: string
    name: string
}

const initialState = {
  type: 'webinar',
  topic: '',
  photoOrVideo: '',
  startDate: '',
  repeat: 'doNotRepeat',
  endWebinar: '',
  execution: 0,
  endDate: '',
  timeDurationFrom: '',
  timeDurationTo: '',
  timeZone: '',
  moderator: '',
  comoderator: '',
  speaker: [],
  maxParticipants: '0'
}

const ScheduleWebinar = () => {
  const { profileData  } = useUserProfile()
  const router = useRouter()
  const [formStep, setFormStep] = useState<number>(0)
  const [formState, setFormState] = useState<formStateProps>(initialState)
  const [webinarDesc, setWebinarDesc] = useState<string>('')
  const [keyTakeaway, setKeyTakeaway] = useState<string>('')
  const [instructorList, setInstructorList] = useState<InstructorList[]>([])
  const [file, setFile] = useState<Nullable<File>>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    if(profileData) {
      setInstructorList([
        {
          name: profileData.name || '',
          id: profileData.id || ''
        }
      ])
      setFormState(prevState => ({ ...prevState, moderator: profileData.id }))
    }
  }, [profileData])

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = event => {
    const { type, name, value } = event.target
    const inputFiles = (event.target as HTMLInputElement).files
    let updatedValue = value
    if(type === 'file' && inputFiles && inputFiles.length > 0) {
      updatedValue = inputFiles[0].name
      setFile(inputFiles[9])
    }
    setFormState(prevState => ({ ...prevState, [name]: updatedValue }))
  }

  const handleSuggestionChange = ({ name, value }) => {
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const filterUsers = async val => {
    const response = await apiWebinar.getInstrcutor.userIntructors(val)
    setInstructorList(response.data.data.filter(item => item.name))
  }

  const handleWebinarDesChange = (_e: React.FormEvent<HTMLInputElement>, editor: ClassicEditor) => {
    const data = editor.getData()
    setWebinarDesc(data)
  }

  const handleKeyTakeawayChange = (_e: React.FormEvent<HTMLInputElement>, editor: ClassicEditor) => {
    const data = editor.getData()
    setKeyTakeaway(data)
  }

  const handleNextStep: FunctionWithNoParam = async () => {
    if(formStep === 0) {
      const finalData = {
        type: 'webinar',
        name: formState.topic,
        description: webinarDesc,
        file: formState.photoOrVideo,
        fileType: file?.type
      }
      setIsSubmitting(true)
      try {
        let response
        if(getFromStorage('webinarID')) {
          let webinarID = getFromStorage('webinarID')
          response = await apiWebinar.scheduleWebinar.update(finalData, webinarID)
          const presignedURL = response.data.data.filePreSignedUrl
          console.log('update', response)
          await apiWebinar.scheduleWebinar.updatePhoto(file, presignedURL)
          setFormStep(formStep + 1)

        } else {
          response = await apiWebinar.scheduleWebinar.add(finalData)
          updateStorage('webinarID', JSON.stringify(response.data.data.id))
          const presignedURL = response.data.data.filePreSignedUrl
          console.log('post', response)
          await apiWebinar.scheduleWebinar.updatePhoto(file, presignedURL)
          setFormStep(formStep + 1)
        }
      } catch (error) {
        console.log(error)
      }
      setIsSubmitting(false)
    }
    if(formStep === 1) {
      const startDate = new Date(formState.startDate)
      const endDate = formState.endDate !== '' ? new Date(formState.endDate) : null
      const startTime = formState.timeDurationFrom
      const endTime = formState.timeDurationTo
      const startHour = parseInt(startTime.slice(0, 2))
      const startMinute= parseInt(startTime.slice(3, 5))
      const endHour = parseInt(endTime.slice(0, 2))
      const endMinute= parseInt(endTime.slice(3, 5))

      let finalData
      if(formState.repeat === 'doNotRepeat')
        finalData = {
          startsFrom: new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHour, startMinute)).getTime(),
          repeatUntil: new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endHour, endMinute)).getTime(),
          duration: 0,
        }
      else{
        const rruleFreq = formState.repeat === 'DAILY' ? RRule.DAILY : formState.repeat === 'WEEKLY' ? RRule.WEEKLY : formState.repeat === 'MONTHLY' ? RRule.MONTHLY : formState.repeat === 'YEARLY' ? RRule.YEARLY  : undefined
        const rule = new RRule({
          freq: rruleFreq,
          dtstart: new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHour, startMinute)),
          until:  endDate ? new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endHour, endMinute)) : null,
          count: formState.execution > 0 ? formState.execution :  null,
        })
        finalData = {
          startsFrom: new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHour, startMinute)).getTime(),
          rrule: rule.toString()
        }
      }
      setIsSubmitting(true)
      try {
        let webinarID = getFromStorage('webinarID')
        const response = await apiWebinar.scheduleWebinar.update(finalData, webinarID)
        setFormStep(formStep+1)
        console.log('schedule', response)
        setFormStep(formStep + 1)
      } catch (error) {
        console.log(error)
      }
      setIsSubmitting(false)
    }
    if(formStep === 2) {
      const finalData = {
        moderator: formState.moderator,
        coModerator: formState.comoderator,
        speakers: formState.speaker
      }
      setIsSubmitting(true)
      try {
        let webinarID = getFromStorage('webinarID')
        const response = await apiWebinar.scheduleWebinar.update(finalData, webinarID)
        setFormStep(formStep+1)
        console.log('moderator', response)
        setFormStep(formStep + 1)
      } catch (error) {
        console.log(error)
      }
      setIsSubmitting(false)
    }
  }

  const handlePrevStep:FunctionWithNoParam = () => {
    setFormStep(formStep-1)
  }

  const handleSubmit = async () => {
    const finalData = {
      takeAways: keyTakeaway,
      maxParticipants: parseInt(formState.maxParticipants),
      status: 'published'
    }
    setIsSubmitting(true)
    try {
      let webinarID = getFromStorage('webinarID')
      const response = await apiWebinar.scheduleWebinar.update(finalData, webinarID)
      console.log('last step', response)
      if(response) {
        removeStorage('webinarID')
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(false)
  }

  return (
    <FlexContainer direction='row' align='start' classList={styles.wrapper}>
      <FlexContainer direction='col' align='start' classList={styles.scheduleSection}>
        <Typography variant='h4'>
          Schedule Webinar
        </Typography>
        <Typography variant='p'>
          {formStep === 0 ? 'Enter Details' : formStep === 1 ? 'Schedule Date and Time' : null}
        </Typography>
        <FlexContainer direction='col' align='start' classList={styles.formStyle}>
          <ScheduledWebinarForm
            formStep={formStep}
            formState={formState}
            handleChange={handleChange}
            instructorList={instructorList}
            webinarDesc={webinarDesc}
            handleWebinarDesChange={handleWebinarDesChange}
            keyTakeaway={keyTakeaway}
            handleKeyTakeawayChange={handleKeyTakeawayChange}
            handleSuggestionChange={handleSuggestionChange}
            filterUsers={filterUsers}
          />
          <FlexContainer justify='spaceBetween' classList={styles.buttonContainer}>
            <Button disabled={formStep === 0} onClick={handlePrevStep}>
              <i className='fa fa-arrow-left' /> Previous
            </Button>
            <Button loading={isSubmitting} onClick={formStep === 3 ? handleSubmit : handleNextStep}>
              {formStep === 3 ? 'Submit' : 'Continue'} <i className='fa fa-arrow-right' />
            </Button>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer justify='center' classList={styles.progressBarSection}>
        <FlexContainer direction='col' justify='center' classList={styles.progressBarDivision}>
          <FlexContainer justify='center' classList={styles.progressBarStyle}>
            <ProgressBar
              percentage={formStep === 1 ? 25 : formStep === 2 ? 50 : formStep === 3 ? 75 : 0}
              color='#080591'
              size={250}
              strokeWidth={15}
            />
          </FlexContainer>
          <FlexContainer justify='spaceBetween' classList={styles.stepInfo}>
            <Typography variant='p'>Step</Typography>
            <Typography variant='p'>{formStep + 1}/4</Typography>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}

export default ScheduleWebinar
