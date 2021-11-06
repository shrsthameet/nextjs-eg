import React, { useState } from 'react'

import { Accordion, FlexContainer, ProtectedPagesLayout, Typography } from 'Components'

import { accords } from 'Utils/mockData'
import { FunctionWithParam, Nullable } from 'Utils/Types'

import styles from 'styles/faq/Faq.module.scss'

const Faq = () => {
  const [selected, setSelected] = useState<Nullable<number>>(null)

  const toggleAccordion:FunctionWithParam<number> = index => {
    setSelected(selected === index ? null : index)
  }

  return (
    <ProtectedPagesLayout pageTitle='The Building Decision'>
      <div className={styles.faqPageWrapper}>
        <Typography variant='h1' classList={styles.faqTitle}>FREQUENTLY <strong>ASKED QUESTIONS</strong></Typography>
        <FlexContainer justify='center' direction='col' align='start' classList={styles.faqWrapper}>
          {Object.values(accords).map((val, ind) => (
            <div key={ind}>
              <Typography weight='bold' variant='h4' classList={styles.faqAccTitle}>{val.title}</Typography>
              {val.content.map(acc => (
                <Accordion key={acc.index} selected={selected} index={acc.index} title={acc.title} content={acc.content} toggleAccordion={toggleAccordion} />
              ))}
            </div>
          ))}
        </FlexContainer>
      </div>
    </ProtectedPagesLayout>
  )
}

export default Faq
