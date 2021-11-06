import { useMemo } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { awsConfiguration } from 'Config/amplify-configure'
import RouteGuard from 'Config/RouteGuard'

import { ThemeProvider, UserProvider } from 'Context'

import 'Components/Styles/global.scss'
import { UserProfileProvider } from '../Context/UserProfileProvider'

awsConfiguration()

const MyApp = ({ Component, pageProps }: AppProps) => {

  const router = useRouter()

  const publicRoutes = {
    register: 1,
    'custom-components': 1,
    'trouble-login': 1,
    'confirm-user': 1,
    login: 1,
  }

  const hybridRoutes = {
    '': 1,
    'terms-and-conditions': 1,
    'privacy-policy': 1,
    faq: 1,
    'webinar-profile': 1,
    'webinar-registration': 1
  }

  const route:string = useMemo(() =>  router.pathname.split('/')[1], [router])
  const isPublic:boolean = !!publicRoutes[route]
  const isHybrid: boolean = !!hybridRoutes[route]

  return (
    <ThemeProvider>
      <UserProvider>
        {isPublic
          ? <Component {...pageProps} />
          : isHybrid
            ?
            <UserProfileProvider>
              <Component {...pageProps} />
            </UserProfileProvider>
            :
            <RouteGuard>
              <UserProfileProvider>
                <Component {...pageProps} />
              </UserProfileProvider>
            </RouteGuard>
        }
      </UserProvider>
    </ThemeProvider>
  )
}

export default MyApp

