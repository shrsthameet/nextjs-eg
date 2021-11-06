import { FlexContainer, Typography } from 'Components'
import { formStateProps } from 'pages/schedule-webinar'
import React, { ChangeEventHandler, FC } from 'react'
import styles from 'styles/scheduleWebinar/ScheduleWebinar.module.scss'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('../Editor/Editor'), { ssr: false })
interface TakeawayProps {
    formState: formStateProps
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    keyTakeaway: string
    handleKeyTakeawayChange: (event: React.FormEvent<HTMLInputElement>, editor) => void
}

export const Takeaway: FC<TakeawayProps> = props => {
  const { formState, handleChange, keyTakeaway, handleKeyTakeawayChange } = props
  const { maxParticipants } = formState

  return (
    <>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <Typography variant='p'>Key Takeaways</Typography>
        {/* <textarea name='keyTakeaway' value={keyTakeaway} onChange={handleChange} placeholder='Write a key takeaways'/> */}
        <Editor value={keyTakeaway} handleChange={handleKeyTakeawayChange} />
      </FlexContainer>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <Typography variant='p'>Available Seats</Typography>
        <select name='maxParticipants' value={maxParticipants} onChange={handleChange}>
          <option value='10'>
            10
          </option>
          <option value='20'>
            20
          </option>
          <option value='30'>
            30
          </option>
          <option value='40'>
            40
          </option>
          <option value='50'>
            50
          </option>
          <option value='60'>
            60
          </option>
        </select>
      </FlexContainer>
    </>
  )
}
