import React, { useEffect } from 'react'
import { FlexContainer, ScreenLoading, Typography } from 'Components/CoreUI'
import { ProtectedPagesLayout } from 'Components'
import styles from '../../styles/createEvents/createEvents.module.scss'
import Link from 'next/link'
import { useUserContext } from '../../Context'
import { useRouter } from 'next/router'

const CreateEvents = () => {

  const router = useRouter()
  const { user: { isInstructor } } = useUserContext()

  useEffect(() => {
    if(!isInstructor)
      router.push('/').then()
  }, [isInstructor, router])

  return !isInstructor
    ? <ScreenLoading />
    :
    <ProtectedPagesLayout pageTitle={'TBD | Create Events'}>
      <FlexContainer direction='col' align='start' classList={styles.createEventsContainer}>
        <Typography variant='h3'>
            Create <span style={{ fontWeight: 'bold' }}>Events</span>
        </Typography>
        <FlexContainer classList={styles.createEventWrapper}>
          <Link href='/schedule-webinar'>
            <a>
              <FlexContainer justify='center' classList={styles.createEventCard}>
                <Typography variant='h6'>
                    Webinar
                </Typography>
              </FlexContainer>
            </a>
          </Link>
          <FlexContainer justify='center' classList={styles.createEventCard}>
            <Typography variant='h6'>
                Workshop
            </Typography>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer classList={styles.createEventWrapper}>
          <FlexContainer justify='center' classList={styles.createEventCard}>
            <Typography variant='h6'>
                Debate
            </Typography>
          </FlexContainer>
          <FlexContainer justify='center' classList={styles.createEventCard}>
            <Typography variant='h6'>
                Zone
            </Typography>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </ProtectedPagesLayout>
}

export default CreateEvents
