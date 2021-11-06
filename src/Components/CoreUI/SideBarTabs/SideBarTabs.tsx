import { FC } from 'react'
import classNames from 'classnames'

import { FlexContainer } from 'Components'

import { FunctionWithNoParam, Nullable } from 'Utils/Types'

import styles from './SideBarTabs.module.scss'

interface SideBarTabsProps {
  activeValue: Nullable<string>,
  tabList: {
    displayName: string,
    value: string,
    onTabClick: FunctionWithNoParam
  }[]
}

export const SideBarTabs:FC<SideBarTabsProps> = ({ tabList, activeValue }) => {
  return(
    <FlexContainer direction='col' classList={styles.profileUserNavWrapper} align='start'>
      {tabList.map(((ppt, i) =>
        <div key={i} className={classNames(styles.profileUserNav, ppt.value === activeValue ? styles.profileUserNavActive : '' )} onClick={_e => ppt.onTabClick()}>{ppt.displayName}</div>
      ))}
    </FlexContainer>
  )
}
