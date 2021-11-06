import { FieldTypeEvent, FieldTypeHost, FieldTypeQuestionnaire,FieldTypeReview } from './Types'
import { fallBackImagesUrl, staticImagesUrl } from './constants'
import { EventType } from './enum'

const accords = {
  general: {
    title: 'General',
    content: [
      {
        index: 1,
        title: 'General Question 1',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book'
      },
      {
        index: 2,
        title: 'General Question 2',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        index: 3,
        title: 'General Question 3',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        index: 4,
        title: 'General Question 4',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
    ]
  },
  pricingPayment: {
    title: 'Pricing And Payment',
    content: [
      {
        index: 5,
        title: 'Pricing And Payment Question 1',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book'
      },
      {
        index: 6,
        title: 'Pricing And Payment Question 2',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        index: 7,
        title: 'Pricing And Payment Question 3',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        index: 8,
        title: 'Pricing And Payment Question 4',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
    ]
  }
}

const notLoggedInQuestionnaire:FieldTypeQuestionnaire[] = [
  {
    id: '938nlkasn0asidnnalsk',
    userType: 'not_loggedIn',
    question: 'Leaner question number one of three questions.',
    isRequired: true,
    answerType: 'single',
    options: ['option1', 'option2', 'option3','option1', 'option2', 'option3','option1', 'option2', 'option3','option1', 'option2', 'option3'],
    hasOther: false
  },
  {
    id: '0139hskldafn10nkdfas',
    userType: 'not_loggedIn',
    question: 'Leaner question number two of three questions.',
    isRequired: true,
    answerType: 'single',
    options: ['option1', 'option2', 'option3'],
    hasOther: false
  },
  {
    id: '1029jklsadfj0onkasls',
    userType: 'not_loggedIn',
    question: 'Leaner question number three of three questions.',
    isRequired: false,
    answerType: 'single',
    options: ['option1', 'option2', 'option3'],
    hasOther: false
  },
]

const landingPage: { events: FieldTypeEvent[], hosts: FieldTypeHost[], reviews: FieldTypeReview[] } = {
  events: [
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker, Prazwal Malakar, Ameet Shrestha, Bivek Chalise, Saroj Belbase',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.0
    },
    {
      title: 'Design a User Experience for social good and jobs',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 50,
      eventType: EventType.ZONE,
      rating: 5
    },
    {
      title: 'Foundation of Project Management',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.DEBATE,
      rating: 4.6
    },
    {
      title: 'Create High Fidelity Design and Prototypes in Figma',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Design a User Experience for social good and jobs',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 50,
      eventType: EventType.ZONE,
      rating: 5
    },
    {
      title: 'Foundation of Project Management',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.DEBATE,
      rating: 4.6
    },
    {
      title: 'Create High Fidelity Design and Prototypes in Figma',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
    {
      title: 'Innovation Through Design: Think, Make, Break, Repeat',
      imageUrl: '',
      host: 'Peter Parker',
      date: 'July 30 | 13:00',
      enrolledUsers: 77,
      eventType: EventType.WEBINAR,
      rating: 4.6
    },
  ],
  hosts: [
    {
      name: 'Jane Cooper',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: fallBackImagesUrl.host
    },
    {
      name: 'Esther Howard',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: fallBackImagesUrl.host
    },
    {
      name: 'Jenny Wilson',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: fallBackImagesUrl.host
    },
    {
      name: 'Bessie Cooper',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: fallBackImagesUrl.host
    },
    {
      name: 'Prazwal Malakar',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: fallBackImagesUrl.host
    },
    {
      name: 'Promila Limbu',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: fallBackImagesUrl.host
    },
    {
      name: 'Utsav Shrestha',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: fallBackImagesUrl.host
    },
    {
      name: 'Vivek Kansakar',
      description: 'My name is Kirill Eremenko and I am super-psyched that you are reading this!\n' +
          'Proessionally, I am a Data Science management consultant with over five years of experience ',
      company: 'Bottle Technologies',
      position: 'Java Instructor',
      imageUrl: fallBackImagesUrl.host
    },
  ],
  reviews: [
    {
      name: 'Peter Parker',
      position: 'flutter developer',
      rating: 4.6,
      imageUrl: fallBackImagesUrl.review,
      reviewTitle: 'It was a great experience',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
    {
      name: 'Mary Jane',
      position: 'flutter developer',
      rating: 2,
      imageUrl: fallBackImagesUrl.review,
      reviewTitle: 'Not a good experience',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
    {
      name: 'Spider Man',
      position: 'flutter developer',
      rating: 3.2,
      imageUrl: fallBackImagesUrl.review,
      reviewTitle: 'Better experience',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
    {
      name: 'Dr Octopus',
      position: 'flutter developer',
      rating: 5,
      imageUrl: fallBackImagesUrl.review,
      reviewTitle: 'It was a fantastic experience',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
    {
      name: 'Venom',
      position: 'flutter developer',
      rating: 1,
      imageUrl: fallBackImagesUrl.review,
      reviewTitle: 'Blah',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
    },
  ]
}

const webinarProfile = {
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book'
}

const listOfEvents = [
  {
    id: 1,
    eventTitle: 'Innovation Through Design: Think, Make, Break, Repeat',
    imageURL: `${fallBackImagesUrl.event}`
  },
  {
    id: 2,
    eventTitle: 'Design a user experience for social goods jobs',
    imageURL: `${fallBackImagesUrl.event}`
  },
  {
    id: 3,
    eventTitle: 'Create a high fieldlity design and prototypes in figma',
    imageURL: `${fallBackImagesUrl.event}`
  },
  {
    id: 4,
    eventTitle: 'Foundations of project management',
    imageURL: `${fallBackImagesUrl.event}`
  }
]

const timeZones = [
  { 'label': 'International Date Line West (Etc/GMT+12)', 'value': '-12:00' },
  { 'label': 'Midway Island, Samoa (Pacific/Midway)', 'value': '-11:00' },
  { 'label': 'Hawaii (Pacific/Honolulu)', 'value': '-10:00' },
  { 'label': 'Alaska (US/Alaska)', 'value': '-09:00' },
  { 'label': 'Pacific Time (US & Canada) (America/Los_Angeles)', 'value': '-08:00' },
  { 'label': 'Tijuana, Baja California (America/Tijuana)', 'value': '-08:00' },
  { 'label': 'Arizona (US/Arizona)', 'value': '-07:00' },
  { 'label': 'Chihuahua, La Paz, Mazatlan (America/Chihuahua)', 'value': '-07:00' },
  { 'label': 'Mountain Time (US & Canada) (US/Mountain)', 'value': '-07:00' },
  { 'label': 'Central America (America/Managua)', 'value': '-06:00' },
  { 'label': 'Central Time (US & Canada) (US/Central)', 'value': '-06:00' },
  { 'label': 'Guadalajara, Mexico City, Monterrey (America/Mexico_City)', 'value': '-06:00' },
  { 'label': 'Saskatchewan (Canada/Saskatchewan)', 'value': '-06:00' },
  { 'label': 'Bogota, Lima, Quito, Rio Branco (America/Bogota)', 'value': '-05:00' },
  { 'label': 'Eastern Time (US & Canada) (US/Eastern)', 'value': '-05:00' },
  { 'label': 'Indiana (East) (US/East-Indiana)', 'value': '-05:00' },
  { 'label': 'Atlantic Time (Canada) (Canada/Atlantic)', 'value': '-04:00' },
  { 'label': 'Caracas, La Paz (America/Caracas)', 'value': '-04:00' },
  { 'label': 'Manaus (America/Manaus)', 'value': '-04:00' },
  { 'label': 'Santiago (America/Santiago)', 'value': '-04:00' },
  { 'label': 'Newfoundland (Canada/Newfoundland)', 'value': '-03:30' },
  { 'label': 'Brasilia (America/Sao_Paulo)', 'value': '-03:00' },
  { 'label': 'Buenos Aires, Georgetown (America/Argentina/Buenos_Aires)', 'value': '-03:00' },
  { 'label': 'Greenland (America/Godthab)', 'value': '-03:00' },
  { 'label': 'Montevideo (America/Montevideo)', 'value': '-03:00' },
  { 'label': 'Mid-Atlantic (America/Noronha)', 'value': '-02:00' },
  { 'label': 'Cape Verde Is. (Atlantic/Cape_Verde)', 'value': '-01:00' },
  { 'label': 'Azores (Atlantic/Azores)', 'value': '-01:00' },
  { 'label': 'Casablanca, Monrovia, Reykjavik (Africa/Casablanca)', 'value': '+00:00' },
  { 'label': 'Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London (Etc/Greenwich)', 'value': '+00:00' },
  { 'label': 'Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna (Europe/Amsterdam)', 'value': '+01:00' },
  { 'label': 'Belgrade, Bratislava, Budapest, Ljubljana, Prague (Europe/Belgrade)', 'value': '+01:00' },
  { 'label': 'Brussels, Copenhagen, Madrid, Paris (Europe/Brussels)', 'value': '+01:00' },
  { 'label': 'Sarajevo, Skopje, Warsaw, Zagreb (Europe/Sarajevo)', 'value': '+01:00' },
  { 'label': 'West Central Africa (Africa/Lagos)', 'value': '+01:00' },
  { 'label': 'Amman (Asia/Amman)', 'value': '+02:00' },
  { 'label': 'Athens, Bucharest, Istanbul (Europe/Athens)', 'value': '+02:00' },
  { 'label': 'Beirut (Asia/Beirut)', 'value': '+02:00' },
  { 'label': 'Cairo (Africa/Cairo)', 'value': '+02:00' },
  { 'label': 'Harare, Pretoria (Africa/Harare)', 'value': '+02:00' },
  { 'label': 'Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius (Europe/Helsinki)', 'value': '+02:00' },
  { 'label': 'Jerusalem (Asia/Jerusalem)', 'value': '+02:00' },
  { 'label': 'Minsk (Europe/Minsk)', 'value': '+02:00' },
  { 'label': 'Windhoek (Africa/Windhoek)', 'value': '+02:00' },
  { 'label': 'Kuwait, Riyadh, Baghdad (Asia/Kuwait)', 'value': '+03:00' },
  { 'label': 'Moscow, St. Petersburg, Volgograd (Europe/Moscow)', 'value': '+03:00' },
  { 'label': 'Nairobi (Africa/Nairobi)', 'value': '+03:00' },
  { 'label': 'Tbilisi (Asia/Tbilisi)', 'value': '+03:00' },
  { 'label': 'Tehran (Asia/Tehran)', 'value': '+03:30' },
  { 'label': 'Abu Dhabi, Muscat (Asia/Muscat)', 'value': '+04:00' },
  { 'label': 'Baku (Asia/Baku)', 'value': '+04:00' },
  { 'label': 'Yerevan (Asia/Yerevan)', 'value': '+04:00' },
  { 'label': 'Kabul (Asia/Kabul)', 'value': '+04:30' },
  { 'label': 'Yekaterinburg (Asia/Yekaterinburg)', 'value': '+05:00' },
  { 'label': 'Islamabad, Karachi, Tashkent (Asia/Karachi)', 'value': '+05:00' },
  { 'label': 'Chennai, Kolkata, Mumbai, New Delhi (Asia/Calcutta)', 'value': '+05:30' },
  { 'label': 'Sri Jayawardenapura (Asia/Calcutta)', 'value': '+05:30' },
  { 'label': 'Kathmandu (Asia/Katmandu)', 'value': '+05:45' },
  { 'label': 'Almaty, Novosibirsk (Asia/Almaty)', 'value': '+06:00' },
  { 'label': 'Astana, Dhaka (Asia/Dhaka)', 'value': '+06:00' },
  { 'label': 'Yangon (Rangoon) (Asia/Rangoon)', 'value': '+06:30' },
  { 'label': 'Bangkok, Hanoi, Jakarta (Asia/Bangkok)', 'value': '+07:00' },
  { 'label': 'Krasnoyarsk (Asia/Krasnoyarsk)', 'value': '+07:00' },
  { 'label': 'Beijing, Chongqing, Hong Kong, Urumqi (Asia/Hong_Kong)', 'value': '+08:00' },
  { 'label': 'Kuala Lumpur, Singapore (Asia/Kuala_Lumpur)', 'value': '+08:00' },
  { 'label': 'Irkutsk, Ulaan Bataar (Asia/Irkutsk)', 'value': '+08:00' },
  { 'label': 'Perth (Australia/Perth)', 'value': '+08:00' },
  { 'label': 'Taipei (Asia/Taipei)', 'value': '+08:00' },
  { 'label': 'Osaka, Sapporo, Tokyo (Asia/Tokyo)', 'value': '+09:00' },
  { 'label': 'Seoul (Asia/Seoul)', 'value': '+09:00' },
  { 'label': 'Yakutsk (Asia/Yakutsk)', 'value': '+09:00' },
  { 'label': 'Adelaide (Australia/Adelaide)', 'value': '+09:30' },
  { 'label': 'Darwin (Australia/Darwin)', 'value': '+09:30' },
  { 'label': 'Brisbane (Australia/Brisbane)', 'value': '+10:00' },
  { 'label': 'Canberra, Melbourne, Sydney (Australia/Canberra)', 'value': '+10:00' },
  { 'label': 'Hobart (Australia/Hobart)', 'value': '+10:00' },
  { 'label': 'Guam, Port Moresby (Pacific/Guam)', 'value': '+10:00' },
  { 'label': 'Vladivostok (Asia/Vladivostok)', 'value': '+10:00' },
  { 'label': 'Magadan, Solomon Is., New Caledonia (Asia/Magadan)', 'value': '+11:00' },
  { 'label': 'Auckland, Wellington (Pacific/Auckland)', 'value': '+12:00' },
  { 'label': 'Fiji, Kamchatka, Marshall Is. (Pacific/Fiji)', 'value': '+12:00' },
  { 'label': 'Nuku\'alofa (Pacific/Tongatapu)', 'value': '+13:00' }
]

const tempUserProfile = {
  about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .\n\n' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .',
  areasOfInterest: [
    {
      interestLogo: staticImagesUrl.areasOfInterest,
      value: 'TED Talk'
    },
    {
      interestLogo: staticImagesUrl.areasOfInterest,
      value: 'Technology'
    },
    {
      interestLogo: staticImagesUrl.areasOfInterest,
      value: 'Engineering'
    },
    {
      interestLogo: staticImagesUrl.areasOfInterest,
      value: 'Lorem Ipsum'
    },
    {
      interestLogo: staticImagesUrl.areasOfInterest,
      value: 'Lorem Ipsum'
    },
    {
      interestLogo: staticImagesUrl.areasOfInterest,
      value: 'Lorem Ipsum'
    },
  ],
  preferredSubject: ['architecture', 'art', 'motion', 'ui design', 'ux design','architecture', 'art', 'motion', 'ui design', 'ux design']
}

export { tempUserProfile, notLoggedInQuestionnaire, accords, landingPage, webinarProfile, listOfEvents, timeZones }
