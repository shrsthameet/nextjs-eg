import { FlexContainer, Typography } from 'Components'
import React from 'react'

import styles  from './RelatedEvents.module.scss'
import Image from 'next/image'
import { listOfEvents } from 'Utils/mockData'

export const RelatedEvents = () => {
  return (
    <FlexContainer direction='col' classList={styles.relatedEventsContainer}>
      <FlexContainer direction='col' align='start' classList={styles.relatedEventsWrapper}>
        <Typography variant='h6'>Related Events</Typography>
        <FlexContainer classList={styles.cardSection}>
          {listOfEvents.map(item => (
            <FlexContainer key={item.id} classList={styles.card}>
              <Image src={item.imageURL} layout='fill' alt='man1' />
              <div className={styles.cardOverlay}/>
              <FlexContainer direction='col' align='start' classList={styles.cardInfo}>
                <Typography variant='p'>Webinar</Typography>
                <Typography variant='h6'>{item.eventTitle}</Typography>
              </FlexContainer>
            </FlexContainer>
          ))}
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}
