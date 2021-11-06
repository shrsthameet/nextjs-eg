import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo, useState
} from 'react'
import { Hub } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth'
import { Auth } from '@aws-amplify/auth/lib'

import { Nullable } from 'Utils/Types'
import { CognitoCustomAttributes, UserAccountStatus } from '../Utils/enum'

export const UserContext = createContext<UserContextType>({} as UserContextType)

interface UserContextType {
  user: UserType,
  setUser: Dispatch<SetStateAction<UserType>>,
  isLoggedIn: boolean
}

interface UserContextProps{
    children: ReactElement
}

interface UserType {
  cognitoData: Nullable<CognitoUser>,
  loading: boolean,
  hasVerifiedAttribute: boolean,
  showQuestionnaire: boolean,
  waiting: boolean,
  isLearner: boolean,
  isInstructor: boolean,
  isAccountActive: boolean
}

const initialUser: UserType = {
  cognitoData: null,
  loading: false,
  hasVerifiedAttribute: false,
  showQuestionnaire: false,
  waiting: true,
  isInstructor: false,
  isLearner: false,
  isAccountActive: false,
}

export const UserProvider = ({ children }:UserContextProps):ReactElement => {
  const [user, setUser] = useState<UserType>(initialUser)

  const isLoggedIn = useMemo<boolean>(() => !!user.cognitoData, [user])

  const checkUser = useCallback(async () => {
    setUser(prevState => ({ ...prevState, loading: true }))
    try{
      const amplifyUser = await Auth.currentAuthenticatedUser()
      if(amplifyUser) {
        amplifyUser?.getUserAttributes(async (err, attributes) => {
          if(err) {
            console.log('Error on getting attributes: ', err)
            setUser({ ...initialUser, waiting: false, loading: false })
          } else{
            const hasVerifiedAttribute:boolean = attributes?.findIndex(at => at.Name.indexOf('_verified') > -1) as number > -1
            const showQuestionnaire:boolean = attributes?.reduce((acc:boolean, curr) => curr.Name === CognitoCustomAttributes.SHOW_QUESTION ? curr.Value === 'true' : acc, false)
            const isLearner:boolean = attributes?.reduce((acc: boolean, curr) => curr.Name === CognitoCustomAttributes.IS_LEARNER ? curr.Value === 'true' : acc, false)
            const isInstructor:boolean = attributes?.reduce((acc: boolean, curr) => curr.Name === CognitoCustomAttributes.IS_INSTRUCTOR ? curr.Value === 'true' : acc, false)
            const isAccountActive:boolean = attributes?.reduce((acc: boolean, curr) => curr.Name === CognitoCustomAttributes.ACCOUNT_STATUS ? curr.Value === UserAccountStatus.ACTIVE : acc, false)
            setUser({ cognitoData: amplifyUser, loading: false, hasVerifiedAttribute, showQuestionnaire, waiting: false, isLearner, isInstructor, isAccountActive })
          }
        })
      }
    }catch (err){
      console.error('error aws: ', err)
      setUser({ ...initialUser, waiting: false, loading: false })
    }
  }, [])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  useEffect(() => {
    Hub.listen('auth', e => {
      if(e.payload.event === 'signOut'){
        setUser(initialUser)
      }else{
        checkUser().then()
      }
    })
  }, [checkUser])

  return(
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
