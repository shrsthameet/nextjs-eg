import { FC } from 'react'
import classNames from 'classnames'

import { FlexContainer } from 'Components'

import styles from './Loading.module.scss'

export const ScreenLoading:FC = () => {
  return(
    <FlexContainer justify='center' classList={styles.loaderWrapper}>
      <div className={styles.loader} />
    </FlexContainer>
  )
}

interface SpinnerProps {
  classname?: string
}

export const Spinner: FC<SpinnerProps> = ({ classname }) => {
  return(
    <div className={classNames(styles.spinner, classname)} />
  )
}
