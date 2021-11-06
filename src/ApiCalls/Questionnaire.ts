import {
  ApiReturn,
  FieldTypeQuestionnaire, FieldTypeQuestionnaireAnswers,
  FunctionWithNoParamButReturn,
  FunctionWithParamAndReturn
} from '../Utils/Types'
import { apiTryCatch } from '../CustomHooks'
import { API } from 'aws-amplify'
import { AWSEndPointName } from '../Utils/enum'
import { apiEndPoints } from './ApiConstants'

const { questionnaire: { list, submit } } = apiEndPoints

const get: FunctionWithNoParamButReturn<ApiReturn<FieldTypeQuestionnaire[]>> =
    async () => await apiTryCatch<FieldTypeQuestionnaire[]>(API.get(AWSEndPointName.SECURE, list, { response: true }))

const submitAnswers: FunctionWithParamAndReturn<FieldTypeQuestionnaireAnswers[], ApiReturn<FieldTypeQuestionnaire[]>> =
    async data => await apiTryCatch<FieldTypeQuestionnaire[]>(API.post(AWSEndPointName.SECURE, submit, { body: { data }, response: true }))

export const apiQuestionnaire = { get, submitAnswers }
