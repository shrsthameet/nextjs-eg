import { FC, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { FlexContainer, NameAvatar, SvgIcons, Typography } from 'Components'

import { SvgIconName } from 'Utils/enum'
import { landingPage } from 'Utils/mockData'
import { FieldTypeReview, FunctionWithParam } from 'Utils/Types'

import styles  from './ReviewCarousel.module.scss'

export const ReviewCarousel:FC = () => {

  const [keyIndex, setKeyIndex] = useState<number>(0)
  const [reviewsList, setReviewsList] = useState<FieldTypeReview[]>([])

  useEffect(() => {
    setReviewsList(landingPage.reviews)
  }, [])

  const activeReviewData = useMemo(() => reviewsList[keyIndex], [reviewsList, keyIndex])

  const handleIndexChange:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return(
    <FlexContainer justify='start' align='start' direction='col' classList={styles.landingPageReviewWrapper}>
      <FlexContainer>
        <Typography variant='h1' classList={styles.landingPageReviewTitle} weight='bold'>What Do TBD Users <br/> Have to Say</Typography>
      </FlexContainer>
      <FlexContainer fill classList={styles.landingPageReviewContentWrapper}>
        <FlexContainer classList={styles.landingPageReviewLeft} direction='col' align='start'>
          {reviewsList && reviewsList.length > 0
            ? reviewsList.map((review, index) => (
              <FlexContainer justify='spaceBetween' fill key={index} onClick={() => handleIndexChange(index)} classList={classNames(styles.landingPageReviewItemWrapper, index === keyIndex ? styles.landingPageReviewItemSelected : '')}>
                <FlexContainer>
                  <div className={styles.landingPageReviewUserAvatar}>{review.imageUrl ? <Image src={review.imageUrl} layout='fill' alt='pp' /> : <NameAvatar name={review.name} variant='small' /> }</div>
                  <div>
                    <Typography classList={styles.landingPageReviewUserName} variant='h5' weight='bold'>{review.name}</Typography>
                    <Typography classList={styles.landingPageReviewUserPosition} variant='h5'>{review.position}</Typography>
                  </div>
                </FlexContainer>
                <FlexContainer classList={styles.landingPageReviewRating}>
                  <SvgIcons iconName={SvgIconName.STAR_GOLD} />
                  <Typography variant='h5' weight='bold'>{review.rating.toFixed(1)}</Typography>
                </FlexContainer>
              </FlexContainer>
            ))
            : null}
        </FlexContainer>
        <FlexContainer direction='col' align='start' classList={styles.landingPageReviewRight}>
          <Typography variant='h4' weight='bold' classList={styles.landingPageReviewTopic}>{activeReviewData?.reviewTitle}</Typography>
          <FlexContainer classList={styles.landingPageReviewRating}>
            <SvgIcons iconName={SvgIconName.STAR_GOLD} />
            <Typography variant='h5' weight='bold'>{activeReviewData?.rating.toFixed(1)}</Typography>
          </FlexContainer>
          <Typography variant='p' classList={styles.landingPageReviewDescription}>{activeReviewData?.description}</Typography>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>

  )
}
