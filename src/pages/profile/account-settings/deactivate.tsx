import { NextPage } from 'next'
import { ClassNameScrollBar, ProfileEditNavTabValue } from 'Utils/enum'
import { DelOrDeaAccount, FlexContainer, ProfileLayout } from 'Components'
import classNames from 'classnames'
import styles from 'styles/profile/account-settings/AccountSettings.module.scss'
import { FunctionWithParamAndReturn, Nullable } from '../../../Utils/Types'
import { apiUserProfile } from '../../../ApiCalls/UserProfile'

const DeactivateAccount:NextPage = () => {

  const handleSubmit:FunctionWithParamAndReturn<Nullable<string>,Promise<'SUCCESS' | string>> = async reason => {
    const res = await apiUserProfile.apiDeactivateAccount(reason as string)
    return res.success ? 'SUCCESS' : res.message
  }

  return(
    <ProfileLayout queryValue={ProfileEditNavTabValue.ACCOUNT_SETTINGS} isEditing={true}>
      <FlexContainer classList={classNames(styles.accountSettingsWrapper, ClassNameScrollBar.Y)} direction='col' justify='start' align='start'>
        <DelOrDeaAccount type='deactivate' onSubmit={handleSubmit} />
      </FlexContainer>
    </ProfileLayout>
  )
}

export default DeactivateAccount
