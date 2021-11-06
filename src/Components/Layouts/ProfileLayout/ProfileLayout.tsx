import { FC } from 'react'
import classNames from 'classnames'

import { FlexContainer, Footer, ProfileUserInfo, ProtectedPagesLayout } from 'Components'

import { Nullable } from 'Utils/Types'

import styles from './ProfileLayout.module.scss'

interface ProfileLayoutProps {
    queryValue: Nullable<string>,
    isEditing?: boolean,
}

export const ProfileLayout:FC<ProfileLayoutProps> = ({ children, queryValue, isEditing = false }) => {

  return(
    <ProtectedPagesLayout hideOverFlow={isEditing} pageTitle='User Profile'>
      <FlexContainer classList={classNames(styles.profileWrapper, isEditing ? '' :  styles.profileContentMarginBottom)} align='start' justify='spaceBetween'>
        <div className={styles.profileUserInfoWrapper}>
          <ProfileUserInfo queryValue={queryValue} isEditing={isEditing}/>
        </div>
        <div className={styles.profileContentWrapper}>
          {children}
        </div>
      </FlexContainer>
      {isEditing ? null : <Footer/>}
    </ProtectedPagesLayout>
  )
}
