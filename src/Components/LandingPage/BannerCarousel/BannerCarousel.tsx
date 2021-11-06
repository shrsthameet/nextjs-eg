import { FC, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button, Carousel, FlexContainer, Typography } from 'Components'

import { FieldTypeBanner, FunctionWithParam, Nullable } from 'Utils/Types'

import styles from './BannerCarousel.module.scss'
import { bannerNavButtons, fallBackBanners } from '../../../Utils/constants'
import { useUserContext } from '../../../Context'

interface BannerCarouselProps {
  bannerList: Nullable<FieldTypeBanner[]>
}

export const BannerCarousel:FC<BannerCarouselProps> = ({ bannerList }) => {

  const [keyIndex, setKeyIndex] = useState<number>(0)
  const { isLoggedIn } = useUserContext()

  const activeBannerData:Nullable<FieldTypeBanner> = useMemo(() => bannerList ? bannerList[keyIndex] : fallBackBanners[keyIndex], [bannerList, keyIndex])

  const handleIndexChange:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return(
    <div className={styles.landingPageBannerWrapper}>
      <Carousel interval={5000} keyIndex={keyIndex} totalIndex={bannerList ? bannerList.length : fallBackBanners.length} hasIndicator={true} setKeyIndex={handleIndexChange}>
        <FlexContainer align='start' classList={styles.landingPageBannerContentWrapper}>
          <FlexContainer direction='col' align='start' justify='center' classList={styles.landingPageBannerLeft}>
            <Typography variant='h1' classList={styles.landingPageBannerHeading}>{activeBannerData.title}</Typography>
            <Typography variant='h6' classList={styles.landingPageBannerParagraph}>{activeBannerData.content}</Typography>
            {keyIndex < 2 && !isLoggedIn
              ?
              <FlexContainer classList={styles.landingPageBannerButtonWrapper}>
                {bannerNavButtons[keyIndex === 0 ? 'first' : 'second'].map((bt, bti) => <Link key={bti} passHref={true} href={bt.redirection}><Button variant={bti === 0 ? 'primary' : 'secondary'} key={bti}>{bt.name}</Button></Link>)}
              </FlexContainer>
              : null}
          </FlexContainer>
          <FlexContainer classList={styles.landingPageBannerRight}>
            <Image src={activeBannerData.mediaUrl} alt='tempStaticImage' layout='fill'  />
          </FlexContainer>
        </FlexContainer>
      </Carousel>
    </div>
  )
}
