import { FC } from 'react'
import classNames from 'classnames'

import { FlexContainer, SvgIcons, Typography } from 'Components'

import { SvgIconName } from 'Utils/enum'
import { AnswerSetType, FunctionWithParam } from 'Utils/Types'

import styles from './AnswerCard.module.scss'

interface AnswerCardProps {
    option: AnswerSetType,
    wrapperStyle?: string,
    handleAnswerSelect: FunctionWithParam<string>,
    isSelected: boolean
}

export const AnswerCard:FC<AnswerCardProps> = ({ option, wrapperStyle, handleAnswerSelect, isSelected }) => {
  return (
    <FlexContainer classList={classNames(styles.answerCardWrapper, wrapperStyle, isSelected ? styles.answerCardSelected : '')} justify='center' onClick={() => handleAnswerSelect(option.value)}>
      <SvgIcons iconName={SvgIconName.ANSWER_CARD_ICON} />
      <div className={styles.selectIconWrapper}>
        <SvgIcons iconName={SvgIconName.ANSWER_SELECTED}/>
      </div>
      <Typography variant='p' classList={styles.answerCardAnswer}>{option.displayOption}</Typography>
    </FlexContainer>
  )
}
