import React, { ComponentPropsWithoutRef, Ref, forwardRef } from 'react'
import classNames from 'classnames'

import { Spinner } from 'Components'

import styles from './Button.module.scss'

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'text' | 'navGray' | 'navBlue'
  loading?: boolean
}

export const Button = forwardRef(
  (
    { variant = 'primary', className, disabled, loading, children, ...props }: Props,
    ref: Ref<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <button
        disabled={disabled || loading}
        ref={ref}
        className={classNames(styles.button, styles[variant], disabled ? styles.disabled : '' , loading ? styles.loading : '' , className || '')}
        {...props}
      >
        {loading ? <div className={styles.buttonSpinner}><Spinner /></div> : null}
        {children}
      </button>
    )
  }
)

