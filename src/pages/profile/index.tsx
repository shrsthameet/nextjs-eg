import { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ProfileMainNavTabValue } from 'Utils/enum'

const Profile:NextPage = () => {

  const router = useRouter()

  useEffect(() => {
    router.replace(`/profile/${ProfileMainNavTabValue.DETAIL}`)
  }, [router])

  return(<></>)
}

export default Profile
