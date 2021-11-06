import { FC, useMemo, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { FlexContainer, NextPreviousAction, NextPreviousButton, Typography } from 'Components'

import { landingPage } from 'Utils/mockData'
import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'

import styles from './HostCarousel.module.scss'

export const HostCarousel:FC = () => {

  const [keyIndex, setKeyIndex] = useState<number>(0)
  const [containerClass, setContainerClass] = useState<string>('')

  const activeEventData = useMemo(() => landingPage.hosts.slice(keyIndex , keyIndex + 4), [keyIndex])
  const totalIndex = useMemo<number>(() => landingPage.hosts.length, [])

  const handleNextPrevious:NextPreviousAction = action => {
    setKeyIndex(prevState => action === 'NEXT' ? prevState + 1 : prevState - 1)
  }

  return(
    <FlexContainer justify='start' align='start' direction='col' classList={styles.hostCarouselWrapper}>
      <FlexContainer fill>
        <Typography variant='h1' classList={styles.hostTitle}>TRENDING <strong>HOST</strong></Typography>
        <NextPreviousButton disableNext={keyIndex + 3 === totalIndex} disablePrevious={keyIndex === 0} handleAction={handleNextPrevious} />
      </FlexContainer>
      <Typography variant='h4' classList={styles.hostSubTitle}>Be the Best.Learn from the Best.</Typography>
      <div className={styles.hostCarouselContentWrapper}>
        <FlexContainer classList={classNames(styles.hostCarouselContent, styles[`mouseAction${containerClass}`])}>
          {activeEventData.map((aed, i) => (
            <div
              onMouseEnter={() => setContainerClass(`Enter${(i + 1).toString()}`)}
              onMouseLeave={() => setContainerClass(`Leave${(i + 1).toString()}`)}
              key={i}
              className={classNames(styles.hostCardWrapper, i !== (activeEventData.length - 1) ? styles.notLastHostCard : '')}
            >
              <Image src={aed.imageUrl} alt='tempStaticImage' layout='fill' />
              <div className={styles.hostCardBlur} />
              <div className={styles.hostCardContentWrapper}>
                <FlexContainer direction='col' align='start' justify='center' fill classList={styles.hostCardContentName}>
                  <Typography variant='h4' weight='bold' classList={styles.hostCardTitle}>{keyIndex + i + 1} {aed.name}</Typography>
                  <Typography variant='p' classList={styles.hostCardCompany}>{capitalizeFirstLetterOfEachWord(aed.position)} | {capitalizeFirstLetterOfEachWord(aed.company)}</Typography>
                </FlexContainer>
                <Typography variant='p' classList={styles.hostCardDescription}>{aed.description}</Typography>
              </div>
            </div>
          ))}
        </FlexContainer>
      </div>
    </FlexContainer>
  )
}
