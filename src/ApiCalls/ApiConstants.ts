// AUTH API ENDPOINTS
const auth = {
  signUp: '/user/create',
  resendOtp: '/user/resend/otp',
  verifyAccount: '/user/verify/account',
  forgotPassword: '/user/password/forgot',
  verifyOtp: '/user/verify/otp',
  resetPassword: '/user/password/reset',
  reactivateAccount: '/user/reactivate',
}

//USER MANAGEMENT API
const userMgmt = {
  profile: {
    get: '/user/profile',
    basicInfo: '/user/update-info',
    education: '/user/add-education',
    experience: '/user/add-work-experience'
  },
  deactivateAccount: '/user/deactivate',
  deleteAccount: '/user/delete',
  togglePrivacy: '/user/privacy'
}

//LEGAL DOCUMENTS
const legalDocs = {
  privacyPolicy: '/privacy/list'
}

const questionnaire = {
  list: '/questionnaire/list',
  submit: '/user/submit-questionnaire',
}

const others = {
  banner:'/banners/list',
  upcomingEvents: '/events/upcomming-events'
}

export const apiEndPoints = {
  auth,
  legalDocs,
  userMgmt,
  questionnaire,
  others
}
