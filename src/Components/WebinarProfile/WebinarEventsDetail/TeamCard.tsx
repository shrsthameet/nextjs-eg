import { FlexContainer, Typography } from 'Components'
import styles from './WebinarEventDetail.module.scss'
import Image from 'next/image'
import { FC } from 'react'

interface TeamCardProps {
    imageURL: string
    name: string
    userType: string
    alt: string
}

const TeamCard : FC<TeamCardProps> = props => {
  const { imageURL, name, userType, alt } = props
  return (
    <FlexContainer classList={styles.card}>
      <Image src={imageURL} layout='fill' alt={alt} />
      <div className={styles.cardOverlay}/>
      <FlexContainer direction='col' align='start' classList={styles.cardInfo}>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='p'>{userType}</Typography>
        {/* <Typography variant='p'>School of Architecture</Typography> */}
      </FlexContainer>
    </FlexContainer>
  )
}

export default TeamCard
