import { Button, FlexContainer, Modal, Typography } from 'Components'

import React, { FC, ReactElement, useContext, useState } from 'react'

import styles from './WebinarProfileBanner.module.scss'

import Image from 'next/image'
import { UserContext } from 'Context'
import { FunctionWithNoParam } from 'Utils/Types'
import { useRouter } from 'next/router'

interface WebinarBannerProps {
    hostName: string
    webinarName: string
    imageURL: string
    maxParticipants: string
    registrationsCount: string
}

export const WebinarProfileBanner: FC<WebinarBannerProps> = ({ hostName, webinarName, imageURL, maxParticipants, registrationsCount }) => {
  const router = useRouter()
  const webinarID = router.query.id

  const { isLoggedIn } = useContext(UserContext)

  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalContent, setModalContent] = useState<string>('')

  const closeModal: FunctionWithNoParam = () => {
    setModalVisibility(false)
  }

  const handleRouteUser = () => {
    if(!isLoggedIn) {
      setModalTitle('Login Required!')
      setModalContent('You must be a member to register to this webinar. Please login and try again.')
      setModalVisibility(true)
    }
    if(isLoggedIn && maxParticipants === registrationsCount){
      setModalTitle('Seats are all booked.')
      setModalContent(' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')
      setModalVisibility(true)
    }
    if(isLoggedIn && maxParticipants !== registrationsCount)
      router.push(`/webinar-registration/${webinarID}`)
  }

  const formFooter:ReactElement =
  <>
    <Button variant='secondary' onClick={closeModal}>Cancel</Button>
    {isLoggedIn && (
      <Button type='submit'>Confirm</Button>
    )}
  </>
  return (
    <>
      <FlexContainer classList={styles.bannerContainer}>
        <Image src={imageURL} alt='profile-image' layout='fill' />
        <div className={styles.imageOverlay}/>
        <FlexContainer direction='col' classList={styles.bannerInfo}>
          <Typography variant='h4'>
            {hostName}
          </Typography>
          <Typography variant='h3'>
            {webinarName}
          </Typography>
          <FlexContainer justify='spaceBetween'>
            <Button onClick={handleRouteUser}>Register <i className='fas fa-sign-in-alt'/></Button>
            <Button>Wishlist <i className='far fa-heart'/></Button>
            <Button>Share <i className='far fa-share-square'/></Button>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <Modal title={modalTitle} modalVisibility={modalVisibility} onCancel={closeModal} footer={formFooter}>
        <Typography variant='p'>
          {modalContent}
        </Typography>
      </Modal>
    </>
  )
}
