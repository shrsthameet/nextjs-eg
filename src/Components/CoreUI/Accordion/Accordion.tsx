import React, { FC, useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'

import { FlexContainer, SvgIcons, Typography } from 'Components'

import { SvgIconName } from 'Utils/enum'

import styles from './Accordion.module.scss'
import { FunctionWithParam } from '../../../Utils/Types'

interface AccordionProps {
  index: number,
  title: string,
  content: string,
  selected: number | null,
  toggleAccordion: FunctionWithParam<number>
}

export const Accordion: FC<AccordionProps> = props => {
  const { index, title, content, selected, toggleAccordion } = props

  const isSelected = useMemo(() => selected === index, [selected, index])

  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleToggle = index => {
    const contentHeight = contentRef.current?.clientHeight
    toggleAccordion(index)
    containerRef.current?.style.setProperty('height', `${100 + (contentHeight && !isSelected ? contentHeight : 0)}px`)
    containerRef.current?.style.setProperty('padding-bottom', isSelected ? '0px' : '20px')
    contentRef.current?.style.setProperty('opacity', isSelected ? '0' : '1')
  }

  useEffect(() =>{
    if(!isSelected){
      containerRef.current?.style.setProperty('height', '80px')
      containerRef.current?.style.setProperty('padding-bottom', '0px')
      contentRef.current?.style.setProperty('opacity', '0')
    }
  }, [index, isSelected])

  return (
    <div ref={containerRef} className={styles.accordionContainer}>
      <FlexContainer justify='spaceBetween' classList={classNames(styles.accordionTitle, isSelected ? styles.accordionTitleGray : '')} onClick={() => handleToggle(index)} >
        <Typography variant='h5' weight='bold'> {title} </Typography>
        <div className={classNames(styles.iconWrapper, isSelected ? styles.expand : styles.shrink)}><SvgIcons iconName={SvgIconName.ANGLE_DOWN} /></div>
      </FlexContainer>
      <div ref={contentRef} className={styles.accordionContent} >
        <Typography variant='h6'>{content + content + content + content}</Typography>
      </div>
    </div>
  )
}

