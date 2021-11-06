import { API } from 'aws-amplify'

import { apiEndPoints } from 'ApiCalls/ApiConstants'

import { AWSEndPointName } from 'Utils/enum'

const getPrivacyPolicy = () => {
  return API.get(AWSEndPointName.UN_SECURE, apiEndPoints.legalDocs.privacyPolicy, { response: true })
}

export { getPrivacyPolicy }
