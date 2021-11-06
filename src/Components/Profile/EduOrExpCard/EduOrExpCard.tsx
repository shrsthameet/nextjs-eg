import React, { FC } from 'react'
import Image from 'next/image'

import { Button, FlexContainer,SvgIcons, Typography } from 'Components'

import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import { SvgIconName } from 'Utils/enum'
import { FunctionWithParam, Nullable } from 'Utils/Types'

import styles from './EduOrExpCard.module.scss'

export interface FieldTypeEduOrExpCard {
    id: string,
    imageUrl: string,
    title: string,
    subTitle: string,
    startDate: string,
    endDate: Nullable<string>
}

interface EduOrExpCardProps {
    data: FieldTypeEduOrExpCard,
    onEdit: FunctionWithParam<string>
    onDelete: FunctionWithParam<string>
}

export const EduOrExpCard:FC<EduOrExpCardProps> = ({ onEdit, onDelete, data }) => {
  return(
    <FlexContainer fill justify='spaceBetween' classList={styles.eduOrExpCardWrapper}>
      <FlexContainer>
        <div className={styles.eduOrExpCardImage}>
          <Image src={data.imageUrl} layout='fill' alt='sp' />
        </div>
        <div>
          <Typography variant='h5' weight='bold' classList={styles.eduOrExpCardTitle}>{capitalizeFirstLetterOfEachWord(data.title)}</Typography>
          <Typography variant='h6' classList={styles.eduOrExpCardSubTitle}>{capitalizeFirstLetterOfEachWord(data.subTitle)}</Typography>
        </div>
      </FlexContainer>
      <Typography variant='h6' classList={styles.eduOrExpCardDate}>{data.startDate} - {data.endDate || 'Present'}</Typography>
      <FlexContainer classList={styles.eduOrExpCardButtonWrapper}>
        <Button onClick={() => onEdit(data.id)} name='edit' variant='text'><SvgIcons iconName={SvgIconName.PENCIL}/> Edit</Button>
        <Button onClick={() => onDelete(data.id)} name='delete' variant='text'><SvgIcons iconName={SvgIconName.TRASH_BIN}/></Button>
      </FlexContainer>
    </FlexContainer>
  )
}
