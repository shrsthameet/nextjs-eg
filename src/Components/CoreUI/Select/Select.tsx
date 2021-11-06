import React, { ChangeEventHandler, FC, ReactElement, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import styles from './Select.module.scss'
import { FlexContainer } from '../FlexContainer'
import { ClassNameScrollBar } from 'Utils/enum'
import classNames from 'classnames'
import { FunctionWithParam, FunctionWithParamAndReturn, Nullable } from 'Utils/Types'

interface SelectProps {
  children: Nullable<ReactElement[] | ReactElement>,
  name: string,
  ref?: RefObject<HTMLInputElement>,
  placeholder?: string,
  wrapperStyle?: string,
  inputStyle?: string,
  onFilter?: FunctionWithParam<string>

}

interface SelectPropsSingle {
  mode: 'single',
  value: string,
  onChange: FunctionWithParam<{ name: string, value: string }>
}

interface SelectPropsMultiple {
  mode: 'multiple',
  value: string[],
  onChange: FunctionWithParam<{ name: string, value: string[] }>
}

export interface OptionListType {
  displayName: string,
  value: string,
}

export const Select:FC<SelectProps & (SelectPropsSingle | SelectPropsMultiple)> = ({ children, onFilter: propHandleFilter, inputStyle, wrapperStyle, placeholder, ref, name, ...props }) => {

  const { mode: sMode, value: sValue, onChange: sOnChange } = props as SelectPropsSingle
  const { mode: mMode, value: mValue, onChange: mOnChange } = props as SelectPropsMultiple

  const [optionList, setOptionList] = useState<OptionListType[]>([])
  const [selectedValues, setSelectedValues] = useState<OptionListType[]>([])
  const [showFilteredList, setShowFilteredList] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const optionWrapperRef = useRef<HTMLDivElement>(null)

  const getOptionDisplayName:FunctionWithParamAndReturn<string, string> = useCallback(val => optionList.reduce((acc, curr) => curr.value === val ? curr.displayName : acc, val), [optionList])

  useEffect(() => {
    setOptionList(children && Array.isArray(children) ? children.map(child => ({ displayName: child.props.children, value: child.props.value })) : [])
  }, [children])

  useEffect(() => {
    if(showFilteredList)
      openOptionList(optionList.length)
  }, [optionList, showFilteredList])

  useEffect(() => {
    if(sValue && optionList.length > 0 && !isLoaded){
      const getName = val => optionList.reduce((acc, curr) => curr.value === val ? curr.displayName : acc, val)
      setSelectedValues([{ displayName: getName(sValue), value: sValue }])
      setIsLoaded(optionList.length > 0)
    }
  },[sValue, getOptionDisplayName, optionList, isLoaded])

  const handleSelect = val => {
    if(mMode === 'multiple'){
      if(mValue.includes(val)){
        setSelectedValues(prevState => prevState.filter(prev => prev.value !== val))
        mOnChange({ name, value: mValue.filter(v => v !== val) })
      }
      else{
        setSelectedValues(prevState => ([...prevState, { displayName: getOptionDisplayName(val), value: val }]))
        mOnChange({ name, value: [...mValue, val] })
      }
    }
    if(sMode === 'single'){
      setSelectedValues([{ displayName: getOptionDisplayName(val), value: val }])
      sOnChange({ name, value: val })
    }
    setShowFilteredList(false)
  }

  const handleInputFilter:ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    if(!propHandleFilter){
      const newArr = children && Array.isArray(children) ? (children as ReactElement[]).reduce((acc: {displayName: string, value: string}[], curr) => curr.props.children.toLowerCase().includes(value.toLowerCase()) ? [...acc, { displayName: curr.props.children, value: curr.props.value }] : acc, []) : []
      setOptionList(newArr)
      openOptionList(newArr.length)
    }else{
      setShowFilteredList(true)
      propHandleFilter(value)
    }
    if(sMode === 'single')
      sOnChange({ name, value })
  }

  const openOptionList = length => {
    const hideOptionList:EventListener = e => {
      const isParentElement = (e.target as HTMLElement).offsetParent === null || (e.target as HTMLElement).offsetParent === wrapperRef.current || (e.target as HTMLElement).offsetParent === optionWrapperRef.current
      if(!isParentElement){
        if(optionWrapperRef && optionWrapperRef.current){
          optionWrapperRef.current.style.height = '0px'
          optionWrapperRef.current.style.overflow = 'hidden'
        }
        window.removeEventListener('click', hideOptionList)
      }
    }
    window.addEventListener('click', hideOptionList)
    if(optionWrapperRef && optionWrapperRef.current){
      optionWrapperRef.current.style.height = `${40 * (length > 5 ? 5 : length)}px`
      optionWrapperRef.current.style.overflow = 'auto'
    }
  }

  const getDisplayName:FunctionWithParamAndReturn<string, string> = val => selectedValues.reduce((acc: string, curr) => curr.value === val ? curr.displayName : acc, val)
  return (
    <div className={classNames(styles.selectWrapper, wrapperStyle)} ref={wrapperRef}>
      <FlexContainer classList={classNames(styles.selectInput, inputStyle)} fill wrap>
        {mMode === 'multiple' && mValue.length > 0
          ? mValue?.map(val => <div key={val} className={styles.selectedOptionTag}>{getDisplayName(val)}<span className={styles.selectedOptionCross} onClick={() => handleSelect(val)}>X</span></div>)
          : null}
        <input ref={ref} placeholder={placeholder}{...Object.assign({}, sMode === 'single' ? { value: getDisplayName(sValue) } : null)} onFocus={() => openOptionList(optionList.length)} onChange={handleInputFilter}/>
      </FlexContainer>
      <div className={classNames(styles.optionWrapper, ClassNameScrollBar.Y)} ref={optionWrapperRef}>
        {children && Array.isArray(children)
          ? (children as ReactElement[]).filter(child => optionList.findIndex(opt => opt.value === child.props.value) > -1).map((child, ind) =>
            <FlexContainer key={ind} onClick={() => handleSelect(child.props.value)} classList={classNames(styles.optionItemWrapper, (mMode === 'multiple' ? mValue?.includes(child.props.value) : sValue === child.props.value) ? styles.optionItemSelected : '', (child.props.className || ''))}>
              {child}
            </FlexContainer>)
          : null}
      </div>
    </div>
  )
}

interface OptionProps{
  value: string,
  className?: string
}

export const Option:FC<OptionProps> = ({ children }) => <>{children}</>
