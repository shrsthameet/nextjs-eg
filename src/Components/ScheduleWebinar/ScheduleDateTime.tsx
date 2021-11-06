import { FlexContainer, Input, Typography } from 'Components'
import React, { ChangeEventHandler, FC } from 'react'
import styles from 'styles/scheduleWebinar/ScheduleWebinar.module.scss'
import { formStateProps } from 'pages/schedule-webinar'
import { timeZones } from 'Utils/mockData'
interface ScheduleDateTimeProps {
    formState: formStateProps
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
}

export const ScheduleDateTime: FC<ScheduleDateTimeProps> = props => {
  const { formState, handleChange } = props
  const { startDate, timeDurationFrom, timeDurationTo, timeZone, repeat, endWebinar, execution, endDate } = formState

  return (
    <>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <FlexContainer>
          <FlexContainer direction='col' align='start'>
            <Typography variant='p'>Start Date</Typography>
            <input type='date' name='startDate' value={startDate} onChange={handleChange} placeholder='Topic for webinar'/>
          </FlexContainer>
          <FlexContainer direction='col' align='start'>
            <Typography variant='p'>Repeat</Typography>
            <select name='repeat' value={repeat} onChange={handleChange}>
              <option value='doNotRepeat'>
                Do not repeat
              </option>
              <option value='DAILY'>
                Daily
              </option>
              <option value='WEEKLY'>
                Weekly
              </option>
              <option value='MONTHLY'>
                Monthly
              </option>
              <option value='YEARLY'>
                Yearly
              </option>
            </select>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      {repeat == 'doNotRepeat' ? null : (
        <>
          <FlexContainer classList={styles.inputFieldStyle}>
            <FlexContainer direction='col' align='start'>
              <Typography variant='p'>End</Typography>
              <select name='endWebinar' value={endWebinar} onChange={handleChange}>
                <option value='never'>
                Never
                </option>
                <option value='after'>
                After
                </option>
                <option value='onDate'>
                On Date
                </option>
              </select>
            </FlexContainer>
            <FlexContainer direction='col' align='start'>
              {endWebinar === 'after' && (
                <>
                  <Typography variant='p'>Execution(s)</Typography>
                  <Input min={1} error='' type='number' name='execution' value={execution} wrapperStyle={styles.executionInput} onChange={handleChange} />
                </>
              )}
              {endWebinar === 'onDate' && (
                <>
                  <Typography variant='p'>Date</Typography>
                  <input type='date' name='endDate' value={endDate} onChange={handleChange} />
                </>
              )}
            </FlexContainer>
          </FlexContainer>
        </>
      )}
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <FlexContainer>
          <FlexContainer direction='col' align='start'>
            <Typography variant='p'>Start Time</Typography>
            <input name='timeDurationFrom' type='time' value={timeDurationFrom} onChange={handleChange} />
          </FlexContainer>
          <FlexContainer direction='col' align='start'>
            <Typography variant='p'>End Time</Typography>
            <input name='timeDurationTo' type='time' value={timeDurationTo} onChange={handleChange} />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer direction='col' align='start' classList={styles.inputFieldStyle}>
        <Typography variant='p'>Time Zone</Typography>
        <select name='timeZone' value={timeZone} onChange={handleChange} className={styles.timeZoneStyle}>
          {timeZones.map((timeZone, index) => (
            <option key={index} value={timeZone.value}>{timeZone.label}</option>
          ))}
        </select>
      </FlexContainer>
    </>
  )
}
