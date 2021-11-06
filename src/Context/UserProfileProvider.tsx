import { ReactElement, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { isValidPhoneNumber } from 'react-phone-number-input'

import {
  FieldTypeUserProfile,
  FunctionWithNoParam, FunctionWithParam,
  Nullable
} from 'Utils/Types'
import { apiUserProfile } from '../ApiCalls/UserProfile'
import { useUserContext } from './UserProvider'
import { apiSignOut } from '../ApiCalls/AuthApi'
import { cleanCookies } from 'universal-cookie/lib/utils'
import { useRouter } from 'next/router'

export const UserProfileContext = createContext<UserProfileInterface>({} as UserProfileInterface)

interface UserProfileInterface {
  profileData: Nullable<FieldTypeUserProfile>,
  isUsernameNumber: boolean,
  loading: boolean,
  fetchUserProfile: FunctionWithNoParam,
  updateUserProfile: FunctionWithParam<Nullable<FieldTypeUserProfile>>
}

interface DataContextProps{
  children: ReactElement
}

export const UserProfileProvider = ({ children }:DataContextProps):ReactElement => {

  const router = useRouter()

  const [profileData, setProfileData] = useState<Nullable<FieldTypeUserProfile>>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { user: { isAccountActive }, isLoggedIn } = useUserContext()

  const fetchUserProfile = useCallback(async () => {
    setLoading(true)
    const res = await apiUserProfile.get()
    if(res && res.success && res.data)
      setProfileData(res.data)
    setLoading(false)
  }, [])

  const updateUserProfile:FunctionWithParam<Nullable<FieldTypeUserProfile>> = data => {
    setProfileData(data)
  }

  const isUsernameNumber:boolean = useMemo<boolean>(() => isValidPhoneNumber(profileData?.username || ''), [profileData])

  useEffect(() => {
    if(isLoggedIn && !isAccountActive){
      apiSignOut()
      cleanCookies()
      localStorage.clear()
      router.reload()
    }
  }, [isAccountActive, isLoggedIn, router])

  useEffect(() => {
    if(!profileData)
      fetchUserProfile()
  }, [profileData, fetchUserProfile ])

  return(
    <UserProfileContext.Provider value={{ profileData, updateUserProfile, fetchUserProfile, loading, isUsernameNumber }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfile = () => useContext(UserProfileContext)
