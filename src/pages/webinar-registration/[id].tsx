import { apiWebinar } from 'ApiCalls/ScheduleWebinar'
import { Button, FlexContainer, Typography } from 'Components'
import { RegisterWebinarForm, RegistrationSuccess } from 'Components'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { ChangeEventHandler, useEffect, useState } from 'react'
import styles from 'styles/scheduleWebinar/ScheduleWebinar.module.scss'
import { FunctionWithNoParam, FunctionWithParam, Nullable, WebinarFieldType } from 'Utils/Types'

export interface WebinarRegistrationFieldType {
    event: string,
    name: string,
    email: string,
    phone: string
}

const WebinarRegistration: NextPage = ({ eventID }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const initialState: WebinarRegistrationFieldType = {
    event: eventID as string,
    name: '',
    email: '',
    phone: ''
  }
  
  const [step, setStep] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formState, setFormState] = useState<WebinarRegistrationFieldType>(initialState)
  const [cancellationReason, setCancellationReason] = useState<string>('')
  const [currentEvent, setCurrentEvent] = useState<Nullable<WebinarFieldType>>(null)

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    const { name, value } = e.target
    if(name === 'cancellationReason')
      setCancellationReason(value)
    else
      setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const res = await apiWebinar.registerForWebinar(formState)
    if(res && res.success)
      setStep(step+1)
    setIsSubmitting(false)
  }

  const cancelEvent: FunctionWithParam<any> = async closeModal => {
    const finalData = {
      id: eventID,
      reason: cancellationReason
    }
    const res = await apiWebinar.cancelWebinar(finalData)
    if(res && res.success){
      closeModal
    }
  }

  const registrationStep = step => {
    switch(step) {
    case 0:
      return <RegisterWebinarForm formState={formState} handleChange={handleChange} />
    case 1:
      return currentEvent ?
        <RegistrationSuccess
          imageURL={currentEvent.file}
          eventName={currentEvent.name}
          startDate={currentEvent.startsFrom}
          cancellationReason={cancellationReason}
          handleChange={handleChange}
          cancelEvent={cancelEvent}
        /> : <></>
    default:
      return<></>
    }
  }

  useEffect(() => {
    const fetchWebinar = async() => {
      const res = await apiWebinar.getWebinar(eventID)
      setCurrentEvent(res.data)
    }
    fetchWebinar()
  }, [])
  return (
    <>
      <FlexContainer direction='row' align='start' classList={styles.wrapper}>
        <FlexContainer direction='col' align='start' classList={styles.scheduleSection}>
          <Typography variant='h4'>
            {step === 0 ? 'Registration' : 'You are successfully registered to this webinar'}
          </Typography>
          {step === 0 && (
            <Typography variant='p'>
                Schedule Time
            </Typography>
          )}
          <FlexContainer direction='col' align='start' classList={styles.formStyle}>
            {registrationStep(step)}
            {step === 0 ? (
              <Button disabled={!formState.name || !formState.email || !formState.phone} loading={isSubmitting} onClick={handleSubmit}>
                Submit<i className='fa fa-arrow-right' />
              </Button>
            ) : (
              <FlexContainer align='start' direction='col'>
                <Typography variant='h6'>Join event via</Typography>
                <FlexContainer justify='spaceBetween' classList={styles.joinEventSection}>
                  <Button>
                    Copy meeting invitation
                  </Button>
                  <Button>
                    <i className='fa fa-calendar'></i>
                    Add to Calender
                  </Button>
                </FlexContainer>
              </FlexContainer>
            )}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </>
  )
}

export default WebinarRegistration

export const getServerSideProps: GetServerSideProps = async ctx => {
  const eventID = ctx.query.id
  return {
    props: {
      eventID
    }
  }
}
