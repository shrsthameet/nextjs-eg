import { FlexContainer, Input, Typography } from 'Components'
import { formStateProps } from 'pages/schedule-webinar'
import React, { ChangeEventHandler, FC } from 'react'
import styles from 'styles/scheduleWebinar/ScheduleWebinar.module.scss'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('../Editor/Editor'), { ssr: false })

interface EnterDetailsProps {
    formState: formStateProps
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    webinarDesc: string
    handleWebinarDesChange: (event: React.FormEvent<HTMLInputElement>, editor) => void
}

export const EnterDetails: FC<EnterDetailsProps> = props => {
  const { formState, handleChange, webinarDesc, handleWebinarDesChange } = props
  const { topic, photoOrVideo } = formState
  return (
    <>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <p>Topic for webinar</p>
        <Input error='' autoComplete='off' wrapperStyle={styles.inputFieldWrapper} category='small' name='topic' placeholder='Topic for webinar'value={topic} onChange={handleChange}/>
      </FlexContainer>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <p>Description</p>
        {/* <textarea name='description' value={description} onChange={handleChange} placeholder='Description'/> */}
        <Editor value={webinarDesc} handleChange={handleWebinarDesChange} />
      </FlexContainer>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <p>Webinar Thumbnail (photo/video)</p>
        <label htmlFor='file-upload' className={styles.customFileUpload}>
          <i className='fa fa-cloud-upload'></i> Upload
        </label>
        <input id='file-upload' type='file' name='photoOrVideo' onChange={handleChange} />
        <Typography variant='p'>{photoOrVideo}</Typography>
      </FlexContainer>
    </>
  )
}
