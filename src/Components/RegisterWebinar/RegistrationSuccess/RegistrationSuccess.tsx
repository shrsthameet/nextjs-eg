import { Button, FlexContainer, Modal, Typography } from 'Components'
import React, { ChangeEventHandler, FC, ReactElement, useState } from 'react'
import styles from './RegistrationSuccess.module.scss'
import Image from 'next/image'
import { FunctionWithNoParam, FunctionWithParam } from 'Utils/Types'
import { getDateAndTime } from 'Utils/UtilFunctions'

interface RegistrationSuccessProps {
    imageURL: string,
    eventName: string,
    startDate: number,
    cancellationReason: string,
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    cancelEvent: FunctionWithParam<any>
}

export const RegistrationSuccess: FC<RegistrationSuccessProps> = props => {
  const { imageURL, eventName, startDate, cancellationReason, handleChange, cancelEvent } = props

  const [modalVisibility, setModalVisibility] = useState<boolean>(false)

  const showModal = () => {
    setModalVisibility(true)
  }

  const closeModal: FunctionWithNoParam = () => {
    setModalVisibility(false)
  }

  const formFooter:ReactElement =
  <>
    <Button variant='secondary' onClick={closeModal}>Cancel</Button>
    <Button disabled={!cancellationReason}   variant='secondary' onClick={() => cancelEvent(closeModal())}>Confirm</Button>
  </>
  return (
    <>
      <FlexContainer align='start' classList={styles.successCard}>
        <Image src={imageURL} layout='fill' alt={eventName} />
        <FlexContainer justify='spaceBetween' classList={styles.cardOverlay}>
          <FlexContainer direction='col'>
            <Typography variant='h5'>
              {eventName}
            </Typography>
            <FlexContainer>
              <Typography variant='p'>
                <i className='fas fa-calendar' />
                Start Date: {new Date(startDate).toLocaleDateString()}
              </Typography>
              <Typography variant='p'>
                <i className='fas fa-globe-asia' />
                Time Zone: {getDateAndTime(startDate).timeZone} {getDateAndTime(startDate).time}</Typography>
              {/* <Typography variant='p'>
                <i className='fas fa-clock' />
                Time Duration: 30 minutes
              </Typography> */}
            </FlexContainer>
          </FlexContainer>
          <FlexContainer classList={styles.actionSection}>
            <i className='fas fa-eye' />
            <i className='fas fa-ban' onClick={showModal} />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <Modal title={'Are you sure you want to cancel this webinar?'} onCancel={closeModal} modalVisibility={modalVisibility} footer={formFooter}>
        <Typography variant='p'>
            If yes, please specify the reason.
        </Typography>
        <form>
          <Typography>Reason</Typography>
          <textarea name='cancellationReason' value={cancellationReason} style={{ border: '1px solid black' }} onChange={handleChange} />
        </form>
      </Modal>
    </>
  )
}
