import { navigationDisplayNames } from './en'
import {
  AnimateContainerVariant,
  EventType,
  ProfileEditNavTabValue,
  ProfileEditTags,
  ProfileMainNavTabValue, SvgIconName
} from './enum'
import { FieldTypeBanner } from './Types'

const company_details = {
  title: 'TBD Application' ,
  name: 'The Building Decision',
  shortForm: 'TBD',
  location: 'Baluwatar, Ktm, Nepal',
  number: '+9889849702113',
  logo: '',
  copyRight: 'Copyright 2021. All Rights reserved.',
}

const navigations = {
  home: {
    url: '/',
    displayName: navigationDisplayNames.home,
  }
}

const animateContainerVariants = {
  toLeft: {
    [AnimateContainerVariant.HIDDEN]: {
      opacity: 0,
      x: '20vw',
    },
    [AnimateContainerVariant.VISIBLE]: {
      opacity: 1,
      x: '0',
      transition: { ease: 'easeOut' }
    },
    [AnimateContainerVariant.EXIT]: {
      x: '-100vw',
      opacity: 0,
      transition: { duration: 1 }
    }
  },
  toRight: {
    [AnimateContainerVariant.HIDDEN]: {
      opacity: 0,
      x: '-20vw',
    },
    [AnimateContainerVariant.VISIBLE]: {
      opacity: 1,
      x: '0',
      transition: { ease: 'easeOut' }
    },
    [AnimateContainerVariant.EXIT]: {
      x: '100vw',
      opacity: 0,
      transition: { duration: 1 }
    }
  },
  toTop: {
    [AnimateContainerVariant.HIDDEN]: {
      opacity: 0,
      y: '20vh',
    },
    [AnimateContainerVariant.VISIBLE]: {
      opacity: 1,
      y: '0',
      transition: { ease: 'easeOut' }
    },
    [AnimateContainerVariant.EXIT]: {
      y: '-100vh',
      opacity: 0,
      transition: { duration: 1 }
    }
  },
}

const staticImageBaseUrl = '/images'

const staticImagesUrl = {
  tempManImage: `${staticImageBaseUrl}/tempManImage.png`,
  areasOfInterest: `${staticImageBaseUrl}/tempAOIImage.png`,
  webinarSuccessImage: `${staticImageBaseUrl}/webinarImage.png`
}

const fallBackImagesUrl = {
  school: `${staticImageBaseUrl}/fallBackImages/fallback_school_logo.png`,
  company: `${staticImageBaseUrl}/fallBackImages/fallback_company_logo.png`,
  event: `${staticImageBaseUrl}/fallBackImages/fallback_event_image.png`,
  host: `${staticImageBaseUrl}/fallBackImages/fallback_host_image.png`,
  review: `${staticImageBaseUrl}/fallBackImages/fallback_review_image.png`,
  banner: `${staticImageBaseUrl}/fallBackImages/fallback_banner_image.png`,
  defaultPerson: `${staticImageBaseUrl}/fallBackImages/fallback_defaultPerson.jpeg`
}

const landingPageFooter = {
  contactInfo: {
    displayName: 'Contact Info',
    navs: [
      { displayName: 'TBD', redirection: '/' },
      { displayName: 'Campaigns', redirection: '/' },
      { displayName: 'Branding', redirection: '/' },
      { displayName: 'Offline', redirection: '/' },
    ]
  },
  about: {
    displayName: 'About',
    navs: [
      { displayName: 'Out Story', redirection: '/' },
      { displayName: 'Benefits', redirection: '/' },
      { displayName: 'Team', redirection: '/' },
      { displayName: 'Career', redirection: '/' },
    ]
  },
  help: {
    displayName: 'Help',
    navs: [
      { displayName: 'FAQs', redirection: '/faq' },
      { displayName: 'Contact Us', redirection: '/' },
    ]
  }
}

const profilePageTabs = {
  main: [
    {
      displayName: 'Details',
      value: ProfileMainNavTabValue.DETAIL
    },
    {
      displayName: 'Events',
      value: ProfileMainNavTabValue.EVENT
    }
  ],
  edit: [
    {
      displayName: 'Profile',
      value: ProfileEditNavTabValue.PROFILE,
      hrefUrl: '/profile/edit'
    },
    {
      displayName: 'Account Settings',
      value: ProfileEditNavTabValue.ACCOUNT_SETTINGS,
      hrefUrl: '/profile/account-settings'
    }
  ]
}

const eventTabs:{ displayName: string, value: EventType }[] = [
  {
    displayName: 'Courses',
    value: EventType.COURSES
  },
  {
    displayName: 'Webinar',
    value: EventType.WEBINAR
  },
  {
    displayName: 'Workshop',
    value: EventType.WORKSHOP
  },
  {
    displayName: 'Debate',
    value: EventType.DEBATE
  },
  {
    displayName: 'Zone',
    value: EventType.ZONE
  },
]


const profileEditTabs:{ displayName: string, value: ProfileEditTags }[] = [
  {
    displayName: 'Basic Info',
    value: ProfileEditTags.BASIC_INFO
  },
  {
    displayName: 'Work Experience',
    value: ProfileEditTags.WORK_EXPERIENCE
  },
  {
    displayName: 'Education',
    value: ProfileEditTags.EDUCATION
  },
  {
    displayName: 'Other Information',
    value: ProfileEditTags.OTHER_INFO
  },
]

const nepalCountryCode = '+977'

const monthList = {
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12'
}
const fallBackBanners:FieldTypeBanner[] = [
  {
    title: 'Create Your Organization or Your Individual Host Account',
    content: 'This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text.',
    mediaType: 'image',
    mediaUrl: fallBackImagesUrl.banner,
  },
  {
    title: 'Organize your own Webinar',
    content: 'This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text.',
    mediaType: 'image',
    mediaUrl: fallBackImagesUrl.banner,
  },
  {
    title: 'Debate with people from anywhere.',
    content: 'This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text.',
    mediaType: 'image',
    mediaUrl: fallBackImagesUrl.banner,
  },
  {
    title: 'Create your Zone',
    content: 'This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text.',
    mediaType: 'image',
    mediaUrl: fallBackImagesUrl.banner,
  },
  {
    title: 'We help to stay connected',
    content: 'This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text. This is dummy text.',
    mediaType: 'image',
    mediaUrl: fallBackImagesUrl.banner,
  },
]
const bannerNavButtons = {
  first: [
    {
      name: 'Sign Up',
      redirection: '/register'
    },
    {
      name: 'Log In',
      redirection: '/login'
    }
  ],
  second: [
    {
      name: 'Request for demo',
      redirection: '/'
    },
    {
      name: 'See all plans',
      redirection: '/'
    }
  ]
}

const socialMediaList = [
  {
    name: 'facebook',
    displayName: 'Facebook',
    svgIcon: SvgIconName.FACEBOOK_LOGO
  },
  {
    name: 'google',
    displayName: 'Google',
    svgIcon: SvgIconName.GOOGLE_LOGO
  },
  {
    name: 'linkedIn',
    displayName: 'LinkedIn',
    svgIcon: SvgIconName.LINKEDIN_LOGO
  },
  {
    name: 'instagram',
    displayName: 'Instagram',
    svgIcon: SvgIconName.INSTAGRAM
  },
]

export {
  navigations,
  company_details,
  animateContainerVariants,
  staticImagesUrl,
  landingPageFooter,
  profilePageTabs,
  eventTabs,
  profileEditTabs,
  nepalCountryCode,
  monthList,
  fallBackBanners,
  bannerNavButtons,
  fallBackImagesUrl,
  socialMediaList,
}
