import { FC, useEffect, useState } from 'react'

import { QuestionFlow } from 'Components'

import { notLoggedInQuestionnaire } from 'Utils/mockData'
import { FieldTypeQuestionnaire, FieldTypeQuestionnaireAnswers, FunctionWithParam, Nullable } from 'Utils/Types'

export const SurveyQuestions:FC = () => {

  const [questionSet, setQuestionSet] = useState<FieldTypeQuestionnaire[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    setQuestionSet(notLoggedInQuestionnaire)
  }, [])

  const handleSubmit:FunctionWithParam<Nullable<FieldTypeQuestionnaireAnswers[]>> = async answerToSubmit => {
    setIsSubmitting(true)
    console.log('ans: ', answerToSubmit)
    const submitTimeout = setTimeout(async () => {
      setIsSubmitting(false)
      clearTimeout(submitTimeout)
    }, 2000)
  }

  return questionSet.length > 0
    ? <QuestionFlow questionSets={questionSet} submitAnswer={handleSubmit} isSubmitting={isSubmitting} />
    : <>No Questions</>
}
