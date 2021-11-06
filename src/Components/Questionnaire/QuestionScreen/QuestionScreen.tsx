import { ChangeEventHandler, FC, useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'

import { AnswerCard, FlexContainer, Input, Typography } from 'Components'

import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import {
  AnswerSetType, FieldTypeQuestionnaire,
  FieldTypeQuestionnaireAnswers,
  FunctionWithParam,
  FunctionWithParamAndReturn
} from 'Utils/Types'

import styles from './QuestionScreen.module.scss'
import { ClassNameScrollBar } from '../../../Utils/enum'

interface QuestionScreenProps {
    currentQuestionSet: FieldTypeQuestionnaire,
    setAnswerSelect: FunctionWithParam<FieldTypeQuestionnaireAnswers>,
    selectedAnswerObject: FieldTypeQuestionnaireAnswers
}

export const QuestionScreen:FC<QuestionScreenProps> = ({ currentQuestionSet, setAnswerSelect, selectedAnswerObject }) => {

  const isSelected:FunctionWithParamAndReturn<string, boolean> = useMemo(() => value => selectedAnswerObject ? selectedAnswerObject?.selectedOptions?.findIndex(sv => sv.option === value ) > -1 : false, [selectedAnswerObject])

  const answerWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(answerWrapperRef.current)
      answerWrapperRef.current.style.width = `${(290 * (currentQuestionSet.options.length + (currentQuestionSet.hasOther ? 1 : 0))) - 50}px`
  }, [answerWrapperRef, currentQuestionSet])

  const handleAnswerSelect:FunctionWithParam<string> = ans => {
    const selectedObject = {
      option: ans,
      otherAnswer: ans === otherOption.value ? '' : null
    }
    const setObj:FieldTypeQuestionnaireAnswers = {
      questionnaire: currentQuestionSet.id,
      selectedOptions: selectedAnswerObject.selectedOptions?.length > 0 ? [...selectedAnswerObject.selectedOptions, selectedObject] : [selectedObject]
    }
    setAnswerSelect(setObj)
  }

  const handleAnswerInput:ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target
    const setObj:FieldTypeQuestionnaireAnswers = {
      questionnaire: selectedAnswerObject?.questionnaire as string,
      selectedOptions: [...selectedAnswerObject.selectedOptions.map(so => so.option === otherOption.value ? { otherAnswer: value, option: otherOption.value } : so)]
    }
    setAnswerSelect(setObj)
  }

  const otherOption:AnswerSetType = {
    value: 'others',
    displayOption: 'Others'
  }

  const handleRemoveSelected:FunctionWithParam<string> = ans => {
    const setObj:FieldTypeQuestionnaireAnswers = {
      questionnaire: currentQuestionSet.id,
      selectedOptions: selectedAnswerObject.selectedOptions.filter(so => so.option !== ans)
    }
    setAnswerSelect(setObj)
  }

  const otherIndex = selectedAnswerObject && selectedAnswerObject.selectedOptions?.findIndex(so => so.option === otherOption.value)

  return(
    <FlexContainer direction='col' align='start' justify='spaceAround' classList={styles.questionScreenWrapper}>
      <Typography variant='h1' classList={styles.questionScreenQuestion}>{capitalizeFirstLetterOfEachWord(currentQuestionSet.question)}</Typography>
      <div className={classNames(styles.questionScreenAnswersWrapper, ClassNameScrollBar.X)}>
        <FlexContainer ref={answerWrapperRef} direction='row' classList={styles.questionScreenAnswers}>
          {currentQuestionSet?.options.map((opt, ind) => (
            <AnswerCard wrapperStyle={styles.questionScreenAnswer} key={ind} option={{ displayOption: opt, value: opt }} isSelected={isSelected(opt)} handleAnswerSelect={isSelected(opt) ? handleRemoveSelected : handleAnswerSelect} />
          ))}
          {currentQuestionSet.hasOther ? <AnswerCard option={otherOption} handleAnswerSelect={isSelected(otherOption.value) ? handleRemoveSelected : handleAnswerSelect} isSelected={isSelected(otherOption.value)} /> : null}
        </FlexContainer>
      </div>
      {currentQuestionSet.hasOther && isSelected(otherOption.value)
        ? <Input value={selectedAnswerObject?.selectedOptions[otherIndex].otherAnswer as string} onChange={handleAnswerInput} wrapperStyle={styles.questionScreenInput} autoFocus={true} placeholder='Your Answer Goes Here...' error={null} />
        : null}
    </FlexContainer>
  )
}


