import { EnterDetails, ScheduleDateTime, SelectModerator, Takeaway } from 'Components'
import { InstructorList, formStateProps } from 'pages/schedule-webinar'
import React, { ChangeEventHandler, FC } from 'react'
import { FunctionWithParam } from 'Utils/Types'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface ScheduledWebinarFormProps {
    formState: formStateProps
    formStep: number
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    handleSuggestionChange:FunctionWithParam<{name: string, value: string | string[]}>
    instructorList: InstructorList[]
    webinarDesc: string
    handleWebinarDesChange: (event: React.FormEvent<HTMLInputElement>, editor: ClassicEditor) => void
    keyTakeaway: string
    handleKeyTakeawayChange: (event: React.FormEvent<HTMLInputElement>, editor: ClassicEditor) => void
    filterUsers: FunctionWithParam<string>
}

export const ScheduledWebinarForm: FC<ScheduledWebinarFormProps> = props => {
  const { formStep, formState, handleChange, handleSuggestionChange, instructorList, webinarDesc, handleWebinarDesChange, keyTakeaway, handleKeyTakeawayChange, filterUsers } = props

  switch (formStep){
  case 0:
    return <EnterDetails
      handleChange={handleChange}
      formState={formState}
      webinarDesc={webinarDesc}
      handleWebinarDesChange={handleWebinarDesChange}
    />
  case 1:
    return <ScheduleDateTime formState={formState} handleChange={handleChange} />
  case 2:
    return <SelectModerator
      formState={formState}
      handleSuggestionChange={handleSuggestionChange}
      instructorList={instructorList}
      filterUsers={filterUsers}
    />
  case 3:
    return <Takeaway formState={formState} handleChange={handleChange} keyTakeaway={keyTakeaway} handleKeyTakeawayChange={handleKeyTakeawayChange} />
  default:
    return null
  }
}
