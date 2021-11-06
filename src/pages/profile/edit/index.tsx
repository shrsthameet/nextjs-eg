import React, { ReactElement, useEffect, useMemo } from 'react'

import { BasicInfo, Education, OtherInfo, ProfileLayout, Tab, Tabs, WorkExperience } from 'Components'
import { ClassNameScrollBar, ProfileEditNavTabValue, ProfileEditTags } from 'Utils/enum'
import { FunctionWithParamAndReturn, Nullable } from 'Utils/Types'
import { profileEditTabs } from 'Utils/constants'
import { useRouter } from 'next/router'
import styles from 'styles/profile/edit/EditProfile.module.scss'
import classNames from 'classnames'

const EditProfile = () => {

  const router = useRouter()

  const queryValue:Nullable<string> = useMemo(() => (router.query.section) as string || null, [router])

  useEffect(() => {
    const redirection = async () => {
      if(!queryValue || profileEditTabs.findIndex(et => et.value === queryValue) === -1)
        await router.replace(`/profile/${ProfileEditNavTabValue.PROFILE}?section=${ProfileEditTags.BASIC_INFO}`)
    }
    redirection()
  }, [queryValue, router])

  const getTabComponent:FunctionWithParamAndReturn<ProfileEditTags, Nullable<ReactElement>> = tagValue => {
    switch (tagValue){
    case ProfileEditTags.BASIC_INFO:
      return <BasicInfo />
    case ProfileEditTags.WORK_EXPERIENCE:
      return <WorkExperience />
    case ProfileEditTags.EDUCATION:
      return <Education />
    case ProfileEditTags.OTHER_INFO:
      return <OtherInfo />
    default :
      return null
    }
  }

  return (
    <ProfileLayout queryValue={ProfileEditNavTabValue.PROFILE} isEditing={true}>
      <div className={classNames(styles.editProfileWrapper, ClassNameScrollBar.Y)}>
        <Tabs tabWrapperStyle={styles.editProfileTabWrapper} defaultTab={queryValue as string}>
          {profileEditTabs.map((pet, i) => (
            <Tab key={i} hrefUrl={`/profile/edit?section=${pet.value}`} label={pet.displayName} value={pet.value}>
              {getTabComponent(pet.value)}
            </Tab>
          ))}
        </Tabs>
      </div>
    </ProfileLayout>
  )
}

export default EditProfile
