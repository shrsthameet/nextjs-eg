import { useEffect, useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { ProfileLayout, ProfileUserContent, ProfileUserEvents } from 'Components'

import { Nullable } from 'Utils/Types'
import { eventTabs, profilePageTabs } from 'Utils/constants'
import { EventType, ProfileMainNavTabValue } from 'Utils/enum'

interface QueryValues {
  tabNav: Nullable<string>,
  eventType: Nullable<string>
}

const Profile:NextPage = () => {

  const router = useRouter()

  const queryValues:QueryValues = useMemo(() => ({ eventType: router.query.eventType as string || null, tabNav: router.query.tabNav as string || null }), [router])

  useEffect(() => {
    const redirection = async () => {
      if(!queryValues.tabNav || profilePageTabs.main.findIndex(ppt => ppt.value === queryValues.tabNav) === -1)
        await router.replace(`/profile/${ProfileMainNavTabValue.DETAIL}`)
      else if(queryValues.tabNav === ProfileMainNavTabValue.EVENT && (!queryValues.eventType || eventTabs.findIndex(et => et.value === queryValues.eventType) === -1))
        await router.replace(`/profile/${ProfileMainNavTabValue.EVENT}?eventType=${EventType.COURSES}`)
    }
    redirection()
  }, [queryValues, router])

  return(
    <ProfileLayout queryValue={queryValues.tabNav}>
      {queryValues.tabNav
        ? queryValues.tabNav === ProfileMainNavTabValue.DETAIL
          ? <ProfileUserContent />
          : queryValues.tabNav === ProfileMainNavTabValue.EVENT
            ? <ProfileUserEvents activeEventType={queryValues.eventType as EventType} />
            : null
        : null}
    </ProfileLayout>
  )
}

export default Profile
