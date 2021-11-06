import { FC, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'

import { FlexContainer } from 'Components'

import { FunctionWithParam } from 'Utils/Types'

import styles from './Indicator.module.scss'

interface IndicatorProps{
  total: number,
  handleIndicatorChange: FunctionWithParam<number>,
  active: number
  direction?: 'col' | 'row'
  placement?: 'bottomLeft' | 'bottomRight',
  size?: 'small' | 'medium' | 'large'
}

export const Indicator:FC<IndicatorProps> = ({ total, handleIndicatorChange, active, size= 'medium', direction = 'row', placement= 'bottomLeft' }) => {

  const indicatorArray = useMemo(() => [...new Array(total)], [total])
  const [activeIndicator, setActiveIndicator] = useState<number>(active)

  const isActive = useMemo(() => (index: number) => activeIndicator === index, [activeIndicator])

  useEffect(() => {
    setActiveIndicator(active)
  }, [active])

  const handleIndicatorClick:FunctionWithParam<number> = index => {
    setActiveIndicator(index)
    handleIndicatorChange(index)
  }

  return(
    <FlexContainer direction={direction} classList={classNames(styles.indicatorWrapper, styles[placement], styles[direction === 'col' ? 'indCol' : 'indRow'])}>
      {indicatorArray.map((_a, i) => (
        <div key={i} onClick={() => handleIndicatorClick(i)} className={classNames(styles.indicator, styles[size], isActive(i) ? styles.indicatorActive : '')} />
      ))}
    </FlexContainer>
  )
}
