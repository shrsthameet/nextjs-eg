import { FunctionWithNoParamButReturn, FunctionWithParamAndReturn } from './Types'
import { isPossiblePhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import { SvgIconName } from './enum'
import { socialMediaList } from './constants'

export const generateDisplayEmail:FunctionWithParamAndReturn<string, string> = username => {
  if(isPossiblePhoneNumber(username)){
    const number = parsePhoneNumber(username)
    return `+${number?.countryCallingCode}****${number?.nationalNumber?.slice(7)}`
  }else{
    const atIndex = username.indexOf('@')
    return `${username.slice(0,3)}****${username.slice(atIndex)}`
  }
}

export const capitalizeFirstLetterOfEachWord:FunctionWithParamAndReturn<string, string> =
    sentence => sentence.split(' ').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')

export const getYearList:FunctionWithNoParamButReturn<string[]> = () => {
  const currentYear = new Date().getFullYear()
  let years:string[] = [] as string[]
  Array.from(Array(150)).map((_, i) => {
    years.push((currentYear - i).toString())
  })
  return years
}

export const getDateAndTime:FunctionWithParamAndReturn<number, { date: string, time: string, timeZone: string }> = epoch => {
  const date = new Date(epoch).toLocaleDateString()
  const time = new Date(epoch).toLocaleTimeString()
  const timeZone = new Date(epoch).toString().match(/([A-Z]+[\+-][0-9]+)/)
  return { date, time, timeZone: timeZone && timeZone.length > 0 ? timeZone[1] : '' }
}

export const isNumber:FunctionWithParamAndReturn<string, boolean> = str => /^-?[\d.]+(?:e-?\d+)?$/.test(str)

export const getSocialLinkIcon:FunctionWithParamAndReturn<string, SvgIconName> = socialMedia => socialMediaList.reduce((acc: SvgIconName, curr) => curr.name === socialMedia ? curr.svgIcon : acc, '' as SvgIconName)

export const getSocialLinkDisplayName:FunctionWithParamAndReturn<string, string> = socialMedia => socialMediaList.reduce((acc: string, curr) => curr.name === socialMedia ? curr.displayName : acc, '')
