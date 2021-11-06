import { FlexContainer, Option, Select, Typography } from 'Components'
import { InstructorList, formStateProps } from 'pages/schedule-webinar'
import React, { FC } from 'react'
import styles from 'styles/scheduleWebinar/ScheduleWebinar.module.scss'
import { FunctionWithParam } from 'Utils/Types'
interface SelectModeratorProps {
    formState: formStateProps
    instructorList: InstructorList[]
    handleSuggestionChange:FunctionWithParam<{name: string, value: string | string[]}>
    filterUsers: FunctionWithParam<string>
}

export const SelectModerator: FC<SelectModeratorProps> = props => {
  const { formState, instructorList, handleSuggestionChange, filterUsers } = props
  const { moderator, comoderator, speaker } = formState
  return (
    <>
      <FlexContainer direction='col'classList={styles.inputFieldStyle}>
        <FlexContainer direction='col' align='start'>
          <Typography variant='p'>Moderator</Typography>
          <Select inputStyle={styles.moderatorInput} name='moderator' mode='single' onFilter={filterUsers} value={moderator} onChange={handleSuggestionChange}>
            {instructorList.map(instructor => (
              <Option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </Option>
            )
            )}
          </Select>

          <Typography variant='p'>Co-Moderator</Typography>
          <Select inputStyle={styles.moderatorInput} name='comoderator' mode='single' onFilter={filterUsers} value={comoderator} onChange={handleSuggestionChange}>
            {instructorList.map(instructor => (
              <Option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </Option>
            )
            )}
          </Select>

          <Typography variant='p'>Speaker</Typography>
          <Select inputStyle={styles.moderatorInput} name='speaker' mode='multiple' onFilter={filterUsers} value={speaker} onChange={handleSuggestionChange}>
            {instructorList.map(instructor => (
              <Option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </Option>
            )
            )}
          </Select>
        </FlexContainer>
      </FlexContainer>
    </>
  )
}
