import React, { FC, ReactNode, Ref, forwardRef } from 'react'
import classNames from 'classnames'

import { FunctionWithNoParam } from 'Utils/Types'

import styles from './FlexContainer.module.scss'

export type flexJustify =
  | 'end'
  | 'spaceEven'
  | 'spaceAround'
  | 'spaceBetween'
  | 'center'
  | 'start'
export type flexDirection = 'row' | 'col'
export type flexAlign = 'start' | 'end'

interface Props {
  id?: string
  direction?: flexDirection
  fill?: boolean
  classList?: string
  children: ReactNode
  justify?: flexJustify
  align?: flexAlign
  wrap?: boolean
  ref?: Ref<HTMLDivElement>
  onClick?: FunctionWithNoParam
  onFocus?: FunctionWithNoParam
}

export const FlexContainer: FC<Props> =  forwardRef((props, ref) => {
  const {
    direction = 'row',
    fill,
    classList,
    justify,
    align,
    wrap = false,
    children,
    onClick,
    onFocus,
  } = props
  const classes = classNames(
    styles.flexContainer,
    styles[direction],
    justify && styles[justify],
    fill && styles.fill,
    {
      [styles.alignStart]: align === 'start',
      [styles.alignEnd]: align === 'end',
      [styles.wrap]: wrap,
    },
    classList
  )
  return <div onClick={onClick} onFocus={onFocus} ref={ref} className={classes}>{children}</div>
})

FlexContainer.defaultProps = {
  direction: 'row',
}
