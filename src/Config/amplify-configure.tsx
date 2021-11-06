import { Amplify, Auth } from 'aws-amplify'

import { AWSEndPointName } from 'Utils/enum'
import { FunctionWithNoParam } from 'Utils/Types'

export const awsConfiguration:FunctionWithNoParam = () => {
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: process.env.NEXT_PUBLIC_COGNITO_REGION,
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
      identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,
      userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_WEB_CLIENT_ID,
      endpoints: [
        {
          name: 'Cognito',
          endpoint: process.env.NEXT_PUBLIC_COGNITO_GATEWAY
        }
      ]
    },
    API: {
      endpoints: [
        {
          name: AWSEndPointName.SECURE,
          endpoint: process.env.NEXT_PUBLIC_API_GATEWAY,
          custom_header: async () => {
            let idToken = ''
            try {
              const user = (await Auth.currentSession())
              if(user)
                idToken = user.getIdToken()?.getJwtToken()
            } catch (err) {
              if(err)
                console.error('no user: ', err)
            }
            return { Authorization: `Bearer ${idToken}` }
          }
        },
        {
          name: AWSEndPointName.UN_SECURE,
          endpoint: process.env.NEXT_PUBLIC_API_GATEWAY,
        }
      ],
    },
    ssr: true
  })
}
