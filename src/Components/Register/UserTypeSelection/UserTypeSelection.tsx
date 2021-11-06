import React, { FC } from 'react'
import Link from 'next/link'

import { AuthFooter, CompanyLogo, FlexContainer, SvgIcons, Typography } from 'Components'

import { SvgIconName, UserCategory } from 'Utils/enum'
import { registerWelcomeScreenLabels } from 'Utils/en'
import { FunctionWithParam } from 'Utils/Types/main'

import styles from './UserTypeSelection.module.scss'

interface UserTypeCardProps {
    handleSelectUserType: FunctionWithParam<UserCategory>
}

export const UserTypeSelection: FC<UserTypeCardProps> = props => {
  const { handleSelectUserType } = props
  return (
    <FlexContainer direction='col' classList={styles.userTypeSelectionWrapper}>
      <div className={styles.userTypeSelectionLogo}><CompanyLogo /></div>
      <Typography variant='h2' classList={styles.userTypeSelectionTitle} weight='bold'>{registerWelcomeScreenLabels.title}</Typography>
      <Typography variant='p' classList={styles.userTypeSelectionDescription}>{registerWelcomeScreenLabels.description}</Typography>
      <Typography variant='h2' classList={styles.userTypeSelectionTopic} weight='bold'>{registerWelcomeScreenLabels.topic}</Typography>
      <FlexContainer>
        <FlexContainer direction='col' justify='center' classList={styles.userTypeSelectionCard} onClick={() => handleSelectUserType(UserCategory.LEARNER)}>
          <SvgIcons noFill iconName={SvgIconName.USER_LARGE} />
          <Typography variant='p'> Learner </Typography>
        </FlexContainer>
        <FlexContainer direction='col' justify='center' classList={styles.userTypeSelectionCard} onClick={() => handleSelectUserType(UserCategory.INSTRUCTOR)}>
          <SvgIcons noFill iconName={SvgIconName.USER_TIE} />
          <Typography variant='p'> Host/Instructor </Typography>
        </FlexContainer>
      </FlexContainer>
      <Typography variant='h6' classList={styles.userTypeSelectionLink}>Already on TBD? <Link href={'/login'}>Log in</Link></Typography>
      <AuthFooter />
    </FlexContainer>
  )
}

