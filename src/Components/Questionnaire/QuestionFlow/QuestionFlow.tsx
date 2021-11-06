import { FC, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button, FlexContainer, ProgressBar, QuestionScreen, SvgIcons } from 'Components'

import { animateContainerVariants } from 'Utils/constants'
import { AnimateContainerVariant, Color, SvgIconName } from 'Utils/enum'
import { FieldTypeQuestionnaire, FieldTypeQuestionnaireAnswers, FunctionWithParam } from 'Utils/Types'

import styles  from './QuestionFlow.module.scss'

interface QuestionFlowProps {
  questionSets: FieldTypeQuestionnaire[],
  submitAnswer: FunctionWithParam<FieldTypeQuestionnaireAnswers[]>
  isSubmitting: boolean
  setPropStepper?: FunctionWithParam<number>
}

export const QuestionFlow:FC<QuestionFlowProps> = ({ questionSets, submitAnswer, setPropStepper, isSubmitting }) => {

  const [stepper, setStepper] = useState<number>(1)
  const [answerToSubmit, setAnswerToSubmit] = useState<FieldTypeQuestionnaireAnswers[]>([])
  const [currentQuestionSet, setCurrentQuestionSet] = useState<FieldTypeQuestionnaire>(questionSets[stepper - 1])

  const totalStepper = useMemo(() => questionSets.length, [questionSets])
  const isFinalQuestion:boolean = useMemo(() => stepper === totalStepper,[totalStepper, stepper])
  const hasAnswer:boolean = useMemo(() => answerToSubmit ? answerToSubmit.findIndex(ats => ats.questionnaire === currentQuestionSet?.id && ats.selectedOptions.length > 0) > -1 : false, [answerToSubmit, currentQuestionSet])

  const selectedAnswerObject:FieldTypeQuestionnaireAnswers = useMemo(() =>  answerToSubmit.filter(ats => ats.questionnaire === currentQuestionSet.id)[0], [answerToSubmit, currentQuestionSet])

  useEffect(() => {
    if(questionSets && questionSets.length > 0){
      let ansArray:FieldTypeQuestionnaireAnswers[] = []
      questionSets.map(qs => {
        ansArray.push({ questionnaire: qs.id, selectedOptions: [] })
      })
      setAnswerToSubmit(ansArray)
    }
  }, [questionSets])

  const handleStepperChange:FunctionWithParam<'NEXT' | 'PREVIOUS'> = action => {
    const currentStepper = stepper + (action === 'NEXT' ? 1 : - 1)
    setCurrentQuestionSet(questionSets[currentStepper - 1])
    setStepper(currentStepper)
    if(setPropStepper) setPropStepper(currentStepper)
  }

  const handleSkip:FunctionWithParam<string> = question => {
    setAnswerToSubmit(prevState => (prevState ? prevState?.filter(ps => ps.questionnaire !== question) : prevState))
    handleStepperChange('NEXT')
  }

  const setAnswerSelect:FunctionWithParam<FieldTypeQuestionnaireAnswers> = setObj => {
    const indexInOldArray = answerToSubmit ? answerToSubmit.findIndex(ats => ats.questionnaire === setObj.questionnaire) : -1
    setAnswerToSubmit(oldArray => oldArray ? [ ...(indexInOldArray === -1 ? [...oldArray, setObj] : oldArray.map(oa => oa.questionnaire === setObj.questionnaire ? setObj : oa)) ] : [setObj])
  }

  const progressPercentage:number = useMemo(() => ((selectedAnswerObject?.selectedOptions.length > 0 ? stepper : stepper - 1)/totalStepper) * 100, [selectedAnswerObject, stepper, totalStepper])

  return(
    <FlexContainer fill>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          key={stepper}
          variants={animateContainerVariants.toLeft}
          initial={AnimateContainerVariant.HIDDEN}
          animate={AnimateContainerVariant.VISIBLE}
          exit={AnimateContainerVariant.EXIT}
          className={styles.questionFlowWrapper}
        >
          {currentQuestionSet
            ? <QuestionScreen selectedAnswerObject={selectedAnswerObject} setAnswerSelect={setAnswerSelect} currentQuestionSet={currentQuestionSet as FieldTypeQuestionnaire}/>
            : null}
        </motion.div>
      </AnimatePresence>
      <div className={styles.questionFlowProgressBar}>
        <ProgressBar strokeWidth={7} size={180} percentage={progressPercentage} color={progressPercentage === 0 ? '' : progressPercentage === 100 ? Color.SUCCESS : Color.PRIMARY_BLUE} />
      </div>
      <FlexContainer direction='row' justify='spaceBetween' classList={styles.questionFlowFooter}>
        <Button variant='text' disabled={stepper === 1} onClick={() => handleStepperChange('PREVIOUS')}>Previous</Button>
        <FlexContainer>
          <Button
            disabled={!hasAnswer}
            loading={isSubmitting}
            variant={'primary'}
            onClick={() => isFinalQuestion ? submitAnswer(answerToSubmit) : handleStepperChange('NEXT')}
          >
            {isFinalQuestion ? 'Submit' : 'Continue'}
          </Button>
          <Button
            disabled={currentQuestionSet?.isRequired || hasAnswer}
            loading={isSubmitting}
            variant={'text'}
            onClick={() => handleSkip(currentQuestionSet?.question as string)}
          >
            Skip<SvgIcons iconName={SvgIconName.ARROW_RIGHT} color={currentQuestionSet?.isRequired || hasAnswer ? Color.DISABLED : Color.TEXT_GRAY}/>
          </Button>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}
