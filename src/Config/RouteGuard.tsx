import { FC, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { cleanCookies } from 'universal-cookie/lib/utils'

import { useUserContext } from 'Context'

import { ScreenLoading, VerifyUser } from 'Components'

import { apiSignOut } from 'ApiCalls/AuthApi'

const RouteGuard:FC = ({ children }) => {

  const router = useRouter()
  const { user: { loading, hasVerifiedAttribute, waiting, isAccountActive }, isLoggedIn } = useUserContext()

  const logOutUser = useCallback(async () => {
    console.log('No User Found, Logging Out !!!')
    await apiSignOut()
    cleanCookies()
    localStorage.clear()
    await router.push('/')
  }, [router])

  useEffect(() => {
    if(!waiting && !isLoggedIn) {
      logOutUser()
    }
  }, [logOutUser, isLoggedIn, waiting])

  return loading
    ? <ScreenLoading />
    : isLoggedIn
      ? hasVerifiedAttribute && isAccountActive
        ? (
          <>
            {children}
          </>
        )
        : <VerifyUser />
      : null

}

export default RouteGuard


