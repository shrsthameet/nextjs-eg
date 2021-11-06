import { FC } from 'react'
import { Button, CompanyLogo, FlexContainer, SvgIcons, Typography } from 'Components'

import { SvgIconName } from 'Utils/enum'
import { welcomeScreenLabels } from 'Utils/en'
import { FunctionWithParam } from 'Utils/Types'

import styles from './WelcomeScreen.module.scss'

interface WelcomeScreenProps {
  handleStepperChange: FunctionWithParam<'NEXT' | 'PREVIOUS'>
}

export const WelcomeScreen:FC<WelcomeScreenProps> = ({ handleStepperChange }) => {
  return(
    <FlexContainer fill={true} direction='col' justify='center' classList={styles.welcomeScreenWrapper}>
      <FlexContainer direction='col' classList={styles.welcomeScreenContentWrapper}>
        <div className={styles.welcomeScreenLogoWrapper}><CompanyLogo /></div>
        <div>
          <Typography variant='h2' weight='bold'>{welcomeScreenLabels.title}</Typography>
          <Typography variant='p' classList={styles.welcomeScreenDescription}>{welcomeScreenLabels.description}</Typography>
        </div>
      </FlexContainer>
      <Typography variant='h1'>{welcomeScreenLabels.knowMore}</Typography>
      <Button variant='primary' onClick={() => handleStepperChange('NEXT')}>Continue<SvgIcons iconName={SvgIconName.ARROW_RIGHT}/></Button>
    </FlexContainer>
  )
}
