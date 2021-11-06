import React, { FC } from 'react'
import classNames from 'classnames'

import styles from './Typography.module.scss'

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

interface Props {
  variant?: TypographyVariant
  classList?: string
  weight?: 'bold' | 'regular'
}

export const Typography: FC<Props> = ({
  variant = 'p',
  children,
  weight = 'regular',
  classList,
  ...props
}) => {
  const Component = variant || 'p'

  const classes = classNames(styles[variant], styles[weight], classList)

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
