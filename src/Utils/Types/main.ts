/** A high-level generic object. */
import { EventType } from '../enum'

type GenericObject<T = unknown> = { [key: string]: T }

/** A high-level error object. */
interface ErrorObject {
    error: string,
}

/** Generic type to allow null. */
type Nullable<T> = T | null

/** Function with single parameter returning void*/
type FunctionWithParam<T> = (p: T) => void

/** Function with no parameter returning void*/
type FunctionWithNoParam = () => void

/** Function with no parameter but has returning type*/
type FunctionWithNoParamButReturn<R> = () => R

/** Function with parameter and returning type*/
type FunctionWithParamAndReturn<P, R> = (p: P) => R

interface ApiResponseType<T>  {
    message: string,
    success: boolean,
    data: T
}

interface ApiReturn<T> extends Promise<ApiResponseType<Nullable<T>>> {}

interface AnswerSetType {
    displayOption: string,
    value: string,
}

interface FieldTypeEvent {
    title: string,
    eventType: EventType,
    date: string,
    rating: number,
    enrolledUsers: number,
    imageUrl: string,
    host: string
}

interface FieldTypeHost {
    name: string,
    position: string,
    company: string,
    description: string,
    imageUrl: string,
}

interface FieldTypeReview {
    name: string,
    position: string,
    description: string,
    rating: number,
    reviewTitle: string,
    imageUrl: string
}

export type {
  GenericObject,
  ErrorObject,
  FunctionWithParam,
  FunctionWithNoParam,
  FunctionWithParamAndReturn,
  FunctionWithNoParamButReturn,
  Nullable,
  AnswerSetType,
  FieldTypeEvent,
  FieldTypeHost,
  FieldTypeReview,
  ApiResponseType,
  ApiReturn
}
