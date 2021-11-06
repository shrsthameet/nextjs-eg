import { FC, useEffect, useRef } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Link from 'next/link'

import { Button, FlexContainer, SvgIcons, Tab, Tabs, Typography } from 'Components'

import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import { ClassNameScrollBar, EventType, ProfileMainNavTabValue, SvgIconName } from 'Utils/enum'
import { eventTabs, fallBackImagesUrl } from 'Utils/constants'
import { landingPage } from 'Utils/mockData'
import { FieldTypeEvent } from 'Utils/Types'

import styles  from './ProfileUserEvents.module.scss'
import { useUserContext } from 'Context'

interface ProfileUserEventsProps {
    activeEventType: EventType
}

export const ProfileUserEvents:FC<ProfileUserEventsProps> = ({ activeEventType }) => {

  const { user: { isInstructor } } = useUserContext()

  return(
    <div className={styles.profileEventWrapper}>
      {isInstructor
        ?
        <Link href={'/create-events'} passHref>
          <Button  className={styles.profileEventAddNew}>+ Add New</Button>
        </Link>
        : null}
      <Tabs defaultTab={activeEventType}>
        {eventTabs.map((eve, i) => (
          <Tab key={i} hrefUrl={`/profile/${ProfileMainNavTabValue.EVENT}?eventType=${eve.value}`} label={eve.displayName} value={eve.value}>
            <EventCards eventDetails={landingPage.events.filter(lep => lep.eventType === eve.value)} />
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}

const EventCards:FC<{eventDetails: FieldTypeEvent[]}> = ({ eventDetails }) => {

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(containerRef && containerRef.current){
      containerRef.current.style.width = eventDetails.length > 4 ? `${(eventDetails.length * 24.5) + ((eventDetails.length - 1) * 0.5)}%` : '100%'
    }
  }, [containerRef, eventDetails])

  return(
    <div className={classNames(styles.profileEventCardScrollContainer, ClassNameScrollBar.X)}>
      <FlexContainer classList={styles.profileEventCardContainer} ref={containerRef}>
        {eventDetails.length > 0
          ? eventDetails.map((eve, i) => (
            <div key={i} className={classNames(styles.profileEventCardWrapper, i === (eventDetails.length - 1) ? styles.profileEventCardLast : '')}>
              <div className={styles.profileEventCardImage}>
                <Image src={fallBackImagesUrl.event} alt='tempStaticImage' layout='fixed' height={350} width={350}  />
              </div>
              <div className={styles.profileEventCardContentBlur} />
              <FlexContainer justify='start' align='start' direction='col' classList={styles.profileEventCardContentWrapper}>
                <FlexContainer justify='start' classList={styles.profileEventCardTagWrapper}>
                  <div className={styles.profileEventCardTag}>{capitalizeFirstLetterOfEachWord(eve.eventType)}</div>
                  {eve.enrolledUsers ? <SvgIcons iconName={SvgIconName.USER_SEAT_BELT} /> : null}
                </FlexContainer>
                <Typography variant='h6' weight='bold' classList={styles.profileEventCardTitle}>{eve.title}</Typography>
              </FlexContainer>
            </div>
          ))
          : null}
      </FlexContainer>
    </div>
  )
}
