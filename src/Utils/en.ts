import { AuthPagesLabels, UploadFileTypes } from './enum'

const notFound = {
  title: 'ERROR 404!',
  subTitle: 'OPS! PAGE NOT FOUND',
  detail: 'Sorry, the page you are looking for does not exist. If you think something is broken report a problem.',
  redirection: {
    url: '/',
    displayName: 'RETURN HOME'
  },
  problemUrl: {
    url: '/',
    displayName: 'REPORT PROBLEM'
  }
}

const navigationDisplayNames = {
  home: 'Home'
}

const labels = {
  [AuthPagesLabels.EMAIL]:{
    topic: 'TROUBLE LOGGING IN?',
    description: 'Enter your email, phone, or username and we\'ll send you a link to get back into your account.',
    pageTitle: 'TBD | Trouble Login | Email'
  },
  [AuthPagesLabels.OTP]:{
    topic: 'OTP Code',
    description: 'Enter the OTP code sent to ',
    pageTitle: 'TBD | Trouble Login | OTP',
  },
  [AuthPagesLabels.PASSWORD]:{
    topic: 'TROUBLE LOGGING IN?',
    description: 'Enter new password for you account.',
    pageTitle: 'TBD | Trouble Login | Password'
  },
  [AuthPagesLabels.LOGIN]:{
    topic: 'LOG IN',
    description: 'For the purpose of industry regulation, your details are required.',
    pageTitle: 'TBD | Log In'
  },
  [AuthPagesLabels.REACTIVATE]:{
    topic: 'REACTIVATE ACCOUNT',
    description: 'Enter the OTP code sent to ',
    pageTitle: 'TBD | Reactivate account'
  },
  [AuthPagesLabels.USERTYPE]:{
    topic: 'REGISTER',
    description: 'Sign up as a',
    pageTitle: 'TBD | Register'
  },
  [AuthPagesLabels.REGISTER]:{
    topic: 'Register',
    description: 'For the purpose of industry regulation, your details are required.',
    pageTitle: 'TBD | Register'
  },
  [AuthPagesLabels.VERIFY_USER]:{
    topic: 'Verifying User',
    description: 'Please enter the OTP Code sent to ',
    pageTitle: 'TBD | Verifying User'
  },
  [AuthPagesLabels.CONFIRM_USER]:{
    topic: 'Confirm User',
    description: 'Please enter your email address or number to confirm.',
    pageTitle: 'TBD | Confirm User'
  },
}

const welcomeScreenLabels = {
  title: 'You have successfully registered to TBD',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  knowMore: 'We’d like to know more about you'
}

const registerWelcomeScreenLabels = {
  title: 'WELCOME TO TBD',
  description: 'Let’s explore interesting ways to learn....blah blah blah Let’s explore interesting ways to learn....blah blah blah Let’s explore interesting ways to learn....blah blah blah Let’s explore interesting ways to learn....blah blah blah Let’s explore interesting ways to learn....blah blah blah',
  topic: 'SIGN UP AS'
}

const accountSettingsLabels = {
  deleteAccount: {
    title: 'Delete Account',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted. This action cannot be undone! Cancel any active subscriptions before you delete your account.',
    buttonLabel: 'Delete Account',
    additionalDescription: 'Please state the reason for deleting your account.'
  },
  deactivateAccount: {
    title: 'Deactivate Account',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted. This action cannot be undone! Cancel any active subscriptions before you delete your account.',
    buttonLabel: 'Deactivate Account',
    additionalDescription: 'Please state the reason for deactivating your account.'
  },
  hideAccount: {
    title: 'Hide my Profile',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted. This action cannot be undone! Cancel any active subscriptions before you delete your account.',
    buttonLabel: 'Hide Profile',
    additionalDescription: ''
  },
  showAccount: {
    title: 'Show my Profile',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted. This action cannot be undone! Cancel any active subscriptions before you delete your account.',
    buttonLabel: 'Show Profile',
    additionalDescription: ''
  },
  confirmationDeleteAccount: {
    title: 'Are you sure you want to delete you account?',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted.',
  },
  confirmationDeactivateAccount: {
    title: 'Are you sure you want to deactivate you account?',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted.',
  },
  confirmationHideAccount: {
    title: 'Hide you profile?',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted.',
  },
  confirmationShowAccount: {
    title: 'Show your Profile?',
    description: 'If you delete your account, your personal information will be wiped from Coursera\'s servers, all of your course activity will be anonymized and any certificates earned will be deleted.',
  },
  completedDeleteAccount: 'Your account deletion request is successfully completed',
  completedDeactivateAccount: 'Your account deactivation request is successfully completed',
  completedHideAccount: 'Your account hide request is successfully completed',
  completedShowAccount: 'Your account show request is successfully completed',
}

const copyRightLabel = 'Copyright (c) 2021. All Rights reserved'

const loginExceptionLabels = {
  deleted: {
    title: 'Account deleted.',
    description: 'The account is in deletion period. Please contact Administrator for cancel deletion or further information.'
  },
  suspended: {
    title: 'Account suspended.',
    description: 'The account has been suspended by the administrator. Please contact Administrator for further information.'
  },
}

const uploadLabels = {
  noFile: 'No File Chosen',
  formatCriteria: {
    [UploadFileTypes.ALL]: 'All format',
    [UploadFileTypes.IMAGE]: 'JPG, GIF or PNG',
  },
  fileSizeCriteria: (size: number): string => `. Max size of ${size}KB`,
  modalLabel: 'Upload your profile picture',
  modalButton: 'Browse photo here'
}

export { navigationDisplayNames, notFound, labels, welcomeScreenLabels, accountSettingsLabels, copyRightLabel, registerWelcomeScreenLabels, uploadLabels, loginExceptionLabels }
