import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import { Button, FlexContainer, Modal, SelectOption, Typography } from 'Components'
import styles from './DelOrDeaAccount.module.scss'
import { accountSettingsLabels } from '../../../../Utils/en'
import {
  FunctionWithParamAndReturn,
  Nullable
} from '../../../../Utils/Types'
import { apiSignOut } from '../../../../ApiCalls/AuthApi'
import { useRouter } from 'next/router'

interface DelOrDeaAccountProps {
  type: 'delete' | 'deactivate' | 'hide' | 'show',
  onSubmit: FunctionWithParamAndReturn<Nullable<string>,Promise<'SUCCESS' | string>>
}

const tempOptions = [
  'This is temporary. I\'ll be back.',
  'I have a privacy concern.',
  'I don\'t find Facebook useful.',
  'I don\'t feel safe on Facebook.',
  'I have another Facebook account.',
  'I get too many emails, invitations, and requests from Facebook.',
  'I spend too much time using Facebook.',
  'I don\'t understand how to use Facebook.',
  'My account was hacked.',
]

export const DelOrDeaAccount:FC<DelOrDeaAccountProps> = ({ type, onSubmit }) => {

  const router = useRouter()

  const [reason, setReason] = useState<Nullable<string>>(null)
  const [error, setError] = useState<Nullable<string>>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const activeContent = type === 'deactivate' ? accountSettingsLabels.deactivateAccount : type === 'delete' ? accountSettingsLabels.deleteAccount : type === 'hide' ? accountSettingsLabels.hideAccount : accountSettingsLabels.showAccount
  const activeConfirmationContent = type === 'deactivate' ? accountSettingsLabels.confirmationDeactivateAccount : type === 'delete' ? accountSettingsLabels.confirmationDeleteAccount : type === 'hide' ? accountSettingsLabels.confirmationHideAccount : accountSettingsLabels.confirmationShowAccount
  const activeCompletedContent = type === 'deactivate' ? accountSettingsLabels.completedDeactivateAccount : type === 'delete' ? accountSettingsLabels.completedDeleteAccount : type === 'hide' ? accountSettingsLabels.completedHideAccount : accountSettingsLabels.completedShowAccount

  const handleSubmit:MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    const res = await onSubmit(reason)
    if(res === 'SUCCESS') {
      setModalVisibility(false)
      const modalTimout = setTimeout(() => {
        setIsCompleted(true)
        setModalVisibility(true)
        clearTimeout(modalTimout)
      }, 500)
      const modal2Timout = setTimeout(async () => {
        await apiSignOut()
        await router.push('/')
        clearTimeout(modal2Timout)
      }, 3500)
    } else
      setError(res)
    setIsSubmitting(false)
  }

  const openModal:MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    if((type === 'delete' || type === 'deactivate') && !reason){
      setError('Please state the reason')
    }else{
      setModalVisibility(true)
    }
  }

  const handleChange:ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    setReason(value)
    setError(null)
  }

  const handleCancel = async () => {
    if(isCompleted){
      await apiSignOut()
      await router.push('/')
    } else {
      setModalVisibility(false)
    }
  }

  return(
    <>
      <Typography variant='h1' weight='bold' classList={styles.delOrDeaTitle}>{activeContent.title}</Typography>
      <Typography variant='h5' classList={styles.delOrDeaDetails}>{activeContent.description}</Typography>
      {type !== 'hide'
        ?
        <>
          <Typography variant='h5' classList={styles.delOrDeaLabel}>{activeContent.additionalDescription}</Typography>
          <SelectOption category='small' error={error} wrapperStyle={styles.delOrDeaSelect} onChange={handleChange}>
            <option value='' selected disabled>---Select your reason---</option>
            {tempOptions.map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
          </SelectOption>
        </>
        : null}
      <Button type='button' onClick={openModal}>Confirm</Button>
      <Modal modalVisibility={modalVisibility} onCancel={handleCancel} footer={null} header={null} disableClose={!isCompleted} wrapperStyle={styles.delOrDeaModalWrapper} >
        <FlexContainer direction='col' classList={styles.delOrDeaModalContentWrapper}>
          {isCompleted
            ? <Typography variant='h5' weight='bold' classList={styles.delOrDeaModalContentTitle} >{activeCompletedContent}</Typography>
            :
            <>
              <Typography variant='h6' weight='bold' classList={styles.delOrDeaModalContentTitle}>{activeConfirmationContent.title}</Typography>
              <Typography variant='p' classList={styles.delOrDeaModalContentDescription}>{activeConfirmationContent.description}</Typography>
              <Button loading={isSubmitting} onClick={handleSubmit}>Confirm</Button>
              <Button variant='secondary' onClick={() => setModalVisibility(false)}>Cancel</Button>
            </>}
        </FlexContainer>
      </Modal>
    </>
  )
}
