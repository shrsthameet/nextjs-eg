import { FC } from 'react'
import { FlexContainer, Typography } from 'Components'
import styles from './NameAvatar.module.scss'

interface AvatarProps {
    name: string,
    variant?: 'small' | 'medium' | 'large'
}

export const NameAvatar:FC<AvatarProps> = ({ name, variant = 'small' }) => {

  const splitArray = name.split(' ')
  const avatarText:string = (splitArray[0].charAt(0)+splitArray[splitArray.length - 1].charAt(0)).toUpperCase()

  return(
    <FlexContainer justify='center' classList={styles.avatarWrapper}>
      <Typography variant={variant === 'small' ? 'h5' : variant === 'medium' ? 'h4' : 'h3'} weight='bold' classList={styles.avatarText}>{avatarText}</Typography>
    </FlexContainer>
  )
}
