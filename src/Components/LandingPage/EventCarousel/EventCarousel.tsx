import { FC, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import {
  Button,
  FlexContainer,
  NextPreviousAction,
  NextPreviousButton,
  SvgIcons,
  Tab,
  Tabs,
  Typography
} from 'Components'

import { landingPage } from 'Utils/mockData'
import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import { fallBackImagesUrl } from 'Utils/constants'
import { FieldTypeEvent, FunctionWithParam } from 'Utils/Types'

import styles from './EventCarousel.module.scss'
import { EventType, SvgIconName } from '../../../Utils/enum'

export const EventCarousel:FC = () => {

  const [keyIndex, setKeyIndex] = useState<number>(0)
  const [filteredEventList, setFilteredEventList] = useState<FieldTypeEvent[]>([])
  const [selectedTab, setSelectedTab] = useState<string>('all')
  const [containerClass, setContainerClass] = useState<string>('')

  const activeEventData = useMemo(() => filteredEventList.slice(keyIndex, keyIndex + 4), [keyIndex, filteredEventList])
  const availableEventTypes = useMemo(() => landingPage.events.reduce((acc: string[], curr) => acc.findIndex(eve => eve === curr.eventType) > -1 ? acc : [...acc, curr.eventType] , ['all']), [])
  const totalIndex = useMemo<number>(() => filteredEventList.length, [filteredEventList])

  useEffect(() => {
    setFilteredEventList(landingPage.events)
  }, [])


  const handleTabChange:FunctionWithParam<string> = type => {
    setSelectedTab(type)
    setFilteredEventList(type === 'all' ? landingPage.events : landingPage.events.filter(eve => eve.eventType === type as EventType))
  }

  const handleNextPrevious:NextPreviousAction = action => {
    setKeyIndex(prevState => action === 'NEXT' ? prevState + 1 : prevState - 1)
  }

  return(
    <FlexContainer justify='start' align='start' direction='col' classList={styles.eventCarouselWrapper}>
      {availableEventTypes && availableEventTypes.length > 0
        ?
        <Tabs defaultTab={selectedTab} tabTitle={
          <>
            <Typography variant='h1' classList={styles.eventCarouselTitle}>UPCOMING <strong>EVENTS</strong></Typography>
            <NextPreviousButton disableNext={keyIndex + 3 === totalIndex} disablePrevious={keyIndex === 0} handleAction={handleNextPrevious} />
          </>
        }>
          {availableEventTypes.map(eveType => (
            <Tab key={eveType} label={capitalizeFirstLetterOfEachWord(eveType)} value={eveType} onTabClick={() => handleTabChange(eveType)} >
              <FlexContainer classList={classNames(styles.eventCarouselContentWrapper, styles[`mouseAction${containerClass}`])}>
                {activeEventData.map((aed, i) => {
                  const rating = Math.floor(aed.rating)
                  return(
                    <div
                      onMouseEnter={() => setContainerClass(`Enter${(i + 1).toString()}`)}
                      onMouseLeave={() => setContainerClass(`Leave${(i + 1).toString()}`)}
                      key={i}
                      className={classNames(styles.eventCardWrapper, i !== (activeEventData.length - 1) ? styles.notLastCard : '')}
                    >
                      <Image src={fallBackImagesUrl.event} alt='tempStaticImage' layout='fill'  />
                      <div className={styles.eventCardBlur} />
                      <FlexContainer justify='start' align='start' direction='col' classList={styles.eventCardContentWrapper}>
                        <FlexContainer justify='start' classList={styles.eventCardTagDateWrapper}>
                          <div className={styles.eventCardTag}>{capitalizeFirstLetterOfEachWord(aed.eventType)}</div>
                          <Typography variant='p' classList={styles.eventCardDate}><SvgIcons iconName={SvgIconName.CLOCK}/>{aed.date}</Typography>
                        </FlexContainer>
                        <Typography variant='h4' weight='bold' classList={styles.eventCardTitle}>{keyIndex + i + 1} {aed.title}</Typography>
                        <FlexContainer fill={true} classList={styles.eventCardInfoWrapper} direction='col' align='start'>
                          <Typography variant='p'><SvgIcons iconName={SvgIconName.USER_SMALL}/> {aed.host}</Typography>
                          <FlexContainer fill={true}>
                            <Typography variant='p'><SvgIcons iconName={SvgIconName.USER_SMALL}/> {aed.enrolledUsers} already enrolled</Typography>
                            <Typography variant='p'>
                              <span>{aed.rating}</span>
                              {Array.from(Array(rating)).map((_v, i) => <SvgIcons key={i} iconName={SvgIconName.STAR_GOLD}/>)}
                              {aed.rating > rating ? <SvgIcons iconName={SvgIconName.STAR_GOLD_HALF} /> : null}
                            </Typography>
                          </FlexContainer>
                          <Typography variant='p'><SvgIcons iconName={SvgIconName.CALENDAR}/> Save to your calendar</Typography>
                        </FlexContainer>
                        <FlexContainer fill={true} classList={styles.eventCardButtonWrapper}>
                          <Button variant='secondary'>Register</Button>
                          <Button variant='secondary'>Share <SvgIcons iconName={SvgIconName.SHARE} /></Button>
                          <Button variant='secondary'><SvgIcons iconName={SvgIconName.HEART_OUTLINE} /></Button>
                        </FlexContainer>
                      </FlexContainer>
                    </div>
                  )
                })}
              </FlexContainer>
            </Tab>
          ))}
        </Tabs>
        : null}
    </FlexContainer>
  )
}
