import { NextPage } from 'next'
import { ClassNameScrollBar, ProfileEditNavTabValue, UserPrivacy } from 'Utils/enum'
import { DelOrDeaAccount, FlexContainer, ProfileLayout } from 'Components'
import classNames from 'classnames'
import styles from 'styles/profile/account-settings/AccountSettings.module.scss'
import { FunctionWithNoParamButReturn } from '../../../Utils/Types'
import { apiUserProfile } from '../../../ApiCalls/UserProfile'
import { useUserProfile } from '../../../Context/UserProfileProvider'

const TogglePrivacy:NextPage = () => {

  const { profileData } = useUserProfile()

  const handleSubmit:FunctionWithNoParamButReturn<Promise<'SUCCESS' | string>> = async () => {
    const res = await apiUserProfile.apiTogglePrivacy({ privacy: profileData ? profileData?.privacy === UserPrivacy.PRIVATE ? UserPrivacy.PUBLIC : UserPrivacy.PRIVATE : UserPrivacy.PRIVATE })
    return res.success ? 'SUCCESS' : res.message
  }

  return(
    <ProfileLayout queryValue={ProfileEditNavTabValue.ACCOUNT_SETTINGS} isEditing={true}>
      <FlexContainer classList={classNames(styles.accountSettingsWrapper, ClassNameScrollBar.Y)} direction='col' justify='start' align='start'>
        <DelOrDeaAccount onSubmit={handleSubmit} type={profileData && profileData.privacy === UserPrivacy.PRIVATE ? 'show' : 'hide'} />
      </FlexContainer>
    </ProfileLayout>
  )
}

export default TogglePrivacy
