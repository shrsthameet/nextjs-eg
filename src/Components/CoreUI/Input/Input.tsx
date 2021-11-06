import { ComponentPropsWithoutRef, FC, Ref, forwardRef, useState } from 'react'
import classNames from 'classnames'

import { FlexContainer, SvgIcons } from 'Components'

import { ClassNameScrollBar, SvgIconName } from 'Utils/enum'
import { Nullable } from 'Utils/Types'

import styles from './Input.module.scss'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    error: Nullable<string>,
    type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'date'
    inputStyle?: string,
    wrapperStyle?: string,
    category?: 'small' | 'medium' | 'large',
    ref?: Ref<HTMLInputElement>
}

interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
    error: Nullable<string>,
    wrapperStyle?: string,
    category?: 'small' | 'medium' | 'large',
    textAreaStyle?: string,
    ref?: Ref<HTMLTextAreaElement>
}

interface SelectOptionProps extends ComponentPropsWithoutRef<'select'> {
    error: Nullable<string>,
    wrapperStyle?: string,
    category?: 'small' | 'medium' | 'large',
    textAreaStyle?: string,
    ref?: Ref<HTMLSelectElement>
}

const Input:FC<InputProps> = forwardRef((props, ref) => {

  const { error, type = 'text', inputStyle, category = 'medium', wrapperStyle, ...remainingProps } = props

  const [textVisible, setTextVisible] = useState(false)

  return (
    <FlexContainer direction='col' align='start' justify='center' classList={classNames(styles.inputWrapper, wrapperStyle, styles[category])}>
      <FlexContainer direction='row' classList={styles.inputFieldWrapper}>
        <input
          ref={ref}
          className={classNames(styles.inputField, inputStyle, type === 'search' || type === 'password' ? '' : styles.hasNoIcon)}
          type={type === 'password' ? textVisible ? 'text' : 'password' : type}
          {...remainingProps}
        />
        {type === 'password' || type === 'search' ?
          <FlexContainer justify={type === 'password' ? 'start' : 'center'} classList={classNames(styles.inputIconWrapper, type === 'password' ? styles.eyeWrapper : type === 'search' ? styles.searchWrapper : '')}>
            {type === 'password' ? <span onClick={() => setTextVisible(!textVisible)}><i className={`far fa-eye${!textVisible ? '-slash' : ''}`} /></span> : null }
            {type === 'search' ? <span><SvgIcons iconName={SvgIconName.SEARCH} /></span> : null}
          </FlexContainer>
          : null }
      </FlexContainer>
      {error ? <span className={styles.inputError}>{error}</span> : null }
    </FlexContainer>
  )
})

const TextArea:FC<TextAreaProps> = forwardRef((props, ref) => {
  const { error, wrapperStyle, category = 'medium', textAreaStyle = '', ...remainingProps } = props
  return(
    <FlexContainer direction='col' align='start' justify='center' classList={classNames(styles.inputWrapper, styles.textAreaWrapper, wrapperStyle, styles[category])}>
      <FlexContainer direction='row' classList={styles.inputFieldWrapper}>
        <textarea
          className={classNames(styles.inputField, textAreaStyle, styles.hasNoIcon, ClassNameScrollBar.Y)}
          ref={ref} {...remainingProps}
        />
      </FlexContainer>
      {error ? <span className={styles.inputError}>{error}</span> : null }
    </FlexContainer>
  )
})

const SelectOption:FC<SelectOptionProps> = forwardRef((props, ref) => {
  const { error, wrapperStyle, category = 'medium', textAreaStyle = '', children, ...remainingProps } = props
  return(
    <FlexContainer direction='col' align='start' justify='center' classList={classNames(styles.inputWrapper, styles.selectOptionWrapper , wrapperStyle, styles[category])}>
      <FlexContainer direction='row' classList={styles.inputFieldWrapper}>
        <select
          className={classNames(styles.inputField, textAreaStyle, styles.hasNoIcon)}
          ref={ref} {...remainingProps}
        >
          {children}
        </select>
      </FlexContainer>
      {error ? <span className={styles.inputError}>{error}</span> : null }
    </FlexContainer>
  )
})

export { Input, TextArea, SelectOption }
