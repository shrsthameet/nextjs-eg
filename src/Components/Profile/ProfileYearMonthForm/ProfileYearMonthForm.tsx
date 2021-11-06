import React, { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { FlexContainer, Input, Typography } from '../../CoreUI'
import styles from '../Profile.module.scss'
import { getYearList, isNumber } from '../../../Utils/UtilFunctions'
import { monthList } from '../../../Utils/constants'
import { FunctionWithParam, FunctionWithParamAndReturn } from '../../../Utils/Types'
import classNames from 'classnames'


export interface SeparateDates {
    startYear: string,
    startMonth: string,
    endYear: string,
    endMonth: string,
}

const initialSeparateDates = {
  startYear: '',
  startMonth: '',
  endYear: '',
  endMonth: '',
}

interface ProfileYearMonthFormProps {
    setHasChanges: FunctionWithParam<boolean>,
    isSubmitting: boolean,
    startDate: string,
    endDate: string,
    setStartEnd: FunctionWithParam<{ type: 'startDate' | 'endDate', value: string }>
}

export const ProfileYearMonthForm:FC<ProfileYearMonthFormProps> = ({ setHasChanges, isSubmitting, startDate, endDate, setStartEnd }) => {

  const [separateDates, setSeparateDates] = useState<SeparateDates>(initialSeparateDates)

  useEffect(() => {
    let _dates:SeparateDates = initialSeparateDates
    if(startDate){
      _dates.startYear = startDate.split('-')[0] || ''
      _dates.startMonth = getMonthName(startDate.split('-')[1])
    }
    if(endDate){
      _dates.endYear = endDate.split('-')[0] || ''
      _dates.endMonth = getMonthName(endDate.split('-')[1])
    }
    setSeparateDates(_dates)
  }, [startDate, endDate])

  const handleDateChange: ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
    if((name === 'startYear' || name === 'endYear') && (value !== '') && (!isNumber(value) || value.length > 4))
      return null
    setSeparateDates(prevState => ({ ...prevState, [name]: value }))
    const isYear = name.includes('Year')
    if(name.includes('start'))
      setStartEnd({ type: 'startDate', value: getCombinedYearMonth({ year: isYear ? value : separateDates.startYear, month: monthList[isYear ? separateDates.startMonth : value] } ) })
    if(name.includes('end'))
      setStartEnd({ type: 'endDate', value: getCombinedYearMonth({ year: isYear ? value : separateDates.endYear, month: monthList[isYear ? separateDates.endMonth : value] } ) })
    setHasChanges(true)
  }

  return(
    <>
      <form>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Started From</Typography>
          <Input list='startYearList' type='text' autoComplete='none' placeholder='Year' error={null} name='startYear' onChange={handleDateChange} value={separateDates.startYear} category='small' wrapperStyle={classNames(styles.profileInput, styles.profileDateInput)} disabled={isSubmitting} />
          <Input list='monthList' type='text' autoComplete='none' placeholder='Month' error={null} name='startMonth' onChange={handleDateChange} value={separateDates.startMonth} category='small' wrapperStyle={classNames(styles.profileInput, styles.profileDateInput)} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Ended On</Typography>
          <Input list='endYearList' type='text' autoComplete='none' placeholder='Year' error={null} name='endYear' onChange={handleDateChange} value={separateDates.endYear} category='small' wrapperStyle={classNames(styles.profileInput, styles.profileDateInput)} disabled={isSubmitting} />
          <Input list='monthList' type='text' autoComplete='none' placeholder='Month' error={null} name='endMonth' onChange={handleDateChange} value={separateDates.endMonth} category='small' wrapperStyle={classNames(styles.profileInput, styles.profileDateInput)} disabled={isSubmitting} />
        </FlexContainer>
      </form>
      <datalist id='startYearList' >
        {getYearList().map(year => <option key={year} value={year} disabled={parseInt(separateDates.endYear) <= parseInt(year)} />)}
      </datalist>
      <datalist id='endYearList' >
        {getYearList().map(year => <option key={year} value={year} disabled={parseInt(separateDates.startYear) >= parseInt(year)} />)}
      </datalist>
      <datalist id='monthList' >
        {Object.keys(monthList).map(month => <option key={month} value={month}>{month}</option>)}
      </datalist>
    </>
  )
}

export const getMonthName = num => {
  if(!num || parseInt(num) > 12 || parseInt(num) < 1)
    return ''
  return Object.keys(monthList).reduce((acc: string, curr) => monthList[curr] === num ? curr : acc , '')
}

const getCombinedYearMonth:FunctionWithParamAndReturn<{ year: string, month: string }, string> = ({ month, year }) => {
  return !year
    ? ''
    : `${year}-${month && month.length === 2 ? month : '01'}`
}
