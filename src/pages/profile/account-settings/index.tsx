import React  from 'react'
import classNames from 'classnames'

import { Button, ChangePassword, Divider, FlexContainer, ProfileLayout, Typography } from 'Components'
import { AWSExceptionCode, ClassNameScrollBar, ProfileEditNavTabValue } from 'Utils/enum'
import styles from 'styles/profile/account-settings/AccountSettings.module.scss'
import { accountSettingsLabels } from '../../../Utils/en'
import { FieldTypeChangePassword, FunctionWithParamAndReturn } from '../../../Utils/Types'
import { apiChangePassword, apiSignOut } from '../../../ApiCalls/AuthApi'
import { useRouter } from 'next/router'
import { useUserProfile } from '../../../Context/UserProfileProvider'

const AccountSettings = () => {

  const router = useRouter()
  const { profileData } = useUserProfile()

  const handlePasswordChange:FunctionWithParamAndReturn<FieldTypeChangePassword, Promise<{status: 'SUCCESS' | 'FAILURE', message: string}>> = value => {
    return new Promise<{status: 'SUCCESS' | 'FAILURE', message: string}>(async resolve => {
      try{
        await apiChangePassword(value)
        resolve({ status: 'SUCCESS', message: 'Password changed successfully.' })
        const signOutTimeout = setTimeout(async () => {
          await apiSignOut()
          clearTimeout(signOutTimeout)
        }, 500)
      }catch (err){
        let message = err.message || 'Internal server error'
        if(err && err.code && err.code === AWSExceptionCode.NOT_AUTHORIZED)
          message = 'Current password is incorrect.'
        resolve({ status: 'FAILURE', message })
      }
    })
  }

  return (
    <ProfileLayout queryValue={ProfileEditNavTabValue.ACCOUNT_SETTINGS} isEditing={true}>
      <FlexContainer classList={classNames(styles.accountSettingsWrapper, ClassNameScrollBar.Y)} direction='col' justify='start' align='start'>
        <Typography variant='h2' weight='bold'>Account Settings</Typography>
        <FlexContainer classList={styles.accountSettingsLabelInputWrapper}>
          <Typography variant='h5' classList={styles.accountSettingsLabel}>Username</Typography>
          <Typography variant='h5' classList={styles.accountSettingsUnEditableValue}>{profileData?.username}</Typography>
        </FlexContainer>
        <Divider />
        <Typography variant='h4' weight='bold' classList={styles.accountSettingsFieldTitle}>Password</Typography>
        <ChangePassword onSubmit={handlePasswordChange} />
        <Divider />
        <Typography variant='h4' weight='bold' classList={styles.accountSettingsFieldTitle}>{accountSettingsLabels.deactivateAccount.title}</Typography>
        <Typography variant='p' classList={styles.accountSettingsFieldDescription}>{accountSettingsLabels.deactivateAccount.description}</Typography>
        <Button variant='primary' onClick={() => router.replace('/profile/account-settings/deactivate')}>{accountSettingsLabels.deactivateAccount.buttonLabel}</Button>
        <Divider />
        <Typography variant='h4' weight='bold' classList={styles.accountSettingsFieldTitle}>{accountSettingsLabels.deleteAccount.title}</Typography>
        <Typography variant='p' classList={styles.accountSettingsFieldDescription}>{accountSettingsLabels.deleteAccount.description}</Typography>
        <Button variant='primary' onClick={() => router.replace('/profile/account-settings/delete')}>{accountSettingsLabels.deleteAccount.buttonLabel}</Button>
        <Divider />
        <Typography variant='h4' weight='bold' classList={styles.accountSettingsFieldTitle}>{accountSettingsLabels.hideAccount.title}</Typography>
        <Typography variant='p' classList={styles.accountSettingsFieldDescription}>{accountSettingsLabels.hideAccount.description}</Typography>
        <Button variant='primary' onClick={() => router.replace('/profile/account-settings/privacy')}>{accountSettingsLabels.hideAccount.buttonLabel}</Button>
      </FlexContainer>
    </ProfileLayout>
  )
}

export default AccountSettings
