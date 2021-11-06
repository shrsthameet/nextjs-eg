import { FC, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button, CompanyLogo, FlexContainer, QuestionFlow, Typography, WelcomeScreen } from 'Components'

import {
  FunctionWithNoParam,
  FunctionWithParam, Nullable,
} from 'Utils/Types/main'
import { AnimateContainerVariant } from 'Utils/enum'
import { animateContainerVariants } from 'Utils/constants'

import styles from './questionnaire.module.scss'
import { FieldTypeQuestionnaire, FieldTypeQuestionnaireAnswers } from '../../Utils/Types'

interface QuestionnaireProps {
  submitQuestionnaire: FunctionWithParam<FieldTypeQuestionnaireAnswers[]>,
  isSubmitting: boolean,
  questionList: Nullable<FieldTypeQuestionnaire[]>
}

const Questionnaire:FC<QuestionnaireProps> = ({ submitQuestionnaire, isSubmitting, questionList }) => {

  const [stepper, setStepper] = useState<number>(1)

  const totalStepper = useMemo(() => (questionList ? questionList.length + 1 : 1), [questionList])

  const handleSubmit:FunctionWithParam<FieldTypeQuestionnaireAnswers[]> = async answerToSubmit => {
    console.log('ans: ', answerToSubmit)
    submitQuestionnaire(answerToSubmit)
  }

  const handleStepperChange:FunctionWithParam<'NEXT' | 'PREVIOUS'> = action => {
    const currentStepper = stepper + (action === 'NEXT' ? 1 : - 1)
    setStepper(currentStepper)
  }

  const handleSkipAll:FunctionWithNoParam = () => {
    console.log('skipped all')
    submitQuestionnaire([])
  }

  return(
    <FlexContainer direction='col' classList={styles.questionnairePage}>
      {stepper === 1
        ? null
        :
        <FlexContainer direction='row' justify='spaceBetween' classList={styles.questionnaireHeader}>
          <FlexContainer direction='row' justify='spaceEven' classList={styles.logoAndStepWrapper}>
            <CompanyLogo />
            <Typography variant='p' classList={styles.stepper}>Step {`${stepper}/${totalStepper}`}</Typography>
          </FlexContainer>
          <FlexContainer classList={styles.rightSide} justify='end'>
            <Button variant='text' onClick={handleSkipAll}>Exit</Button>
          </FlexContainer>
        </FlexContainer>
      }
      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          variants={animateContainerVariants.toLeft}
          initial={AnimateContainerVariant.HIDDEN}
          animate={AnimateContainerVariant.VISIBLE}
          exit={AnimateContainerVariant.EXIT}
          className={styles.stepperScreenWrapper}
        >
          {stepper === 1
            ? <WelcomeScreen handleStepperChange={handleStepperChange}/>
            : questionList && questionList.length > 0
              ?
              <QuestionFlow isSubmitting={isSubmitting} questionSets={questionList} submitAnswer={handleSubmit} setPropStepper={(questionStepper: number) => setStepper(questionStepper + 1)} />
              : null
          }
        </motion.div>
      </AnimatePresence>
    </FlexContainer>
  )
}

export default Questionnaire
