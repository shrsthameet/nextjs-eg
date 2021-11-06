import React, { FC } from 'react'
import Toggle from 'react-toggle'

import { FlexContainer } from 'Components'

import 'react-toggle/style.css'

interface Props{
    checked: boolean,
    label?: string,
    toggleHandler: () => void,
    disabled?: boolean,
    icons?: boolean | IconProp
}

interface IconProp{
    checked?: JSX.Element,
    unchecked?: JSX.Element,
}

export const Switch: FC<Props> = ({ checked, label, toggleHandler, disabled = false, icons = false }) => (
  <div>
    <FlexContainer>
      {label ? <span className='label-text'>{label} :</span> : null}
      <Toggle icons={icons} checked={checked} onChange={toggleHandler} disabled={disabled}/>
    </FlexContainer>
  </div>
)
