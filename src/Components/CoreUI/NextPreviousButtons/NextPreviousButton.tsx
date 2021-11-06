import { FC } from 'react'
import { Button, FlexContainer, SvgIcons } from 'Components'
import { SvgIconName } from 'Utils/enum'
import { FunctionWithParam } from 'Utils/Types'
import styles from './NextPreviousButton.module.scss'

export interface NextPreviousAction extends FunctionWithParam<'NEXT' | 'PREVIOUS'>{}

interface NextPreviousButtonProps {
    handleAction: NextPreviousAction,
    disableNext?: boolean
    disablePrevious?: boolean
}

export const NextPreviousButton:FC<NextPreviousButtonProps> = ({ handleAction, disablePrevious, disableNext }) => {
  return(
    <FlexContainer classList={styles.nextPreviousWrapper}>
      <Button disabled={disablePrevious} onClick={() => handleAction('PREVIOUS')} className={styles.previousActionButton}><SvgIcons iconName={SvgIconName.ANGLE_LEFT}/></Button>
      <Button disabled={disableNext} onClick={() => handleAction('NEXT')} className={styles.nextActionButton}><SvgIcons iconName={SvgIconName.ANGLE_RIGHT}/></Button>
    </FlexContainer>
  )
}
