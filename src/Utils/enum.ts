export enum ScreenSizes {
    MOBILE = 640,
    TABLET = 768,
    LARGE_TABLET = 1024,
    DESKTOP = 1280,
    LARGE_DESKTOP = 1440,
}

export enum ThemeType {
    DARK    = 'dark',
    LIGHT   = 'light',
}

export enum AuthPagesLabels {
    EMAIL = 'email',
    OTP = 'otp',
    PASSWORD = 'password',
    LOGIN = 'login',
    REGISTER = 'register',
    USERTYPE = 'usertype',
    VERIFY_USER = 'verifyUser',
    CONFIRM_USER = 'confirmUser',
    REACTIVATE = 'reactivate',
}

export enum LocalStorageKeys {
    RESET_STATE = 'rsi',
    LOGIN_FIELD = 'lfs',
    CONFIRM_USER = 'cfu',
    OTP_ACTIVATE_TIME = 'oat',
    SIGN_UP = 'siu'
}

export enum AWSExceptionCode {
    UNCONFIRMED_LOGIN = 'UserNotConfirmedException',
    CODE_NOT_MATCHED = 'CodeMismatchException',
    USER_NOT_FOUND = 'UserNotFoundException',
    NOT_AUTHORIZED = 'NotAuthorizedException',
    DEACTIVATED_ACCOUNT = 'UserDeactivatedException'
}

export enum SvgIconName {
    ANSWER_CARD_ICON = 'answerCardIcon',
    ARROW_RIGHT = 'arrowRight',
    ANSWER_SELECTED = 'answerSelected',
    SEARCH = 'search',
    ANGLE_DOWN = 'angleDown',
    ANGLE_LEFT = 'angleLeft',
    ANGLE_RIGHT = 'angleRight',
    BELL_WITH_DOT = 'bellWithDot',
    STAR_GOLD = 'starGold',
    STAR_GOLD_HALF = 'starGoldHalf',
    USER_SMALL = 'user',
    CALENDAR = 'calendar',
    SHARE = 'share',
    HEART_OUTLINE = 'heartOutline',
    CLOCK = 'clock',
    FACEBOOK_WHITE = 'facebookWhite',
    TWITTER_WHITE = 'twitterWhite',
    GOOGLE_LOGO = 'googleLogo',
    FACEBOOK_LOGO = 'facebookLogo',
    LINKEDIN_LOGO = 'linkedInLogo',
    INSTAGRAM = 'instagram',
    PENCIL = 'pencil',
    PLUS = 'plus',
    USER_SEAT_BELT = 'userSeatBelt',
    USER_LARGE = 'userLarge',
    USER_TIE = 'userTie',
    SEARCH_BAR = 'searchBar',
    UPLOAD_ICON = 'uploadIcon',
    TRASH_BIN = 'trashBin',
    TICK_MARK = 'tickMarks'
}

export enum AnimateContainerVariant {
    HIDDEN = 'hidden',
    VISIBLE = 'visible',
    EXIT = 'exit'
}

export enum EventType{
    WEBINAR = 'webinar',
    ZONE = 'zone',
    DEBATE = 'debate',
    COURSES = 'courses',
    WORKSHOP = 'workshop'
}

export enum AWSEndPointName {
    SECURE = 'Secured Endpoint',
    UN_SECURE = 'Un-secured Endpoint'
}

export enum CognitoCustomAttributes {
    IS_INSTRUCTOR = 'custom:isInstructor',
    IS_LEARNER = 'custom:isLearner',
    SHOW_QUESTION = 'custom:showQuestionnaire',
    ACCOUNT_STATUS = 'custom:accountStatus',
}

export enum ProfileMainNavTabValue {
    DETAIL = 'details',
    EVENT = 'events'
}

export enum ProfileEditNavTabValue {
    PROFILE = 'edit',
    ACCOUNT_SETTINGS = 'account-settings'
}

export enum ProfileEditTags {
    BASIC_INFO = 'basicInfo',
    WORK_EXPERIENCE = 'workExperience',
    EDUCATION = 'education',
    OTHER_INFO = 'otherInformation'
}

export enum UserAccountType {
    INDIVIDUAL = 'individual',
    ORGANIZATION = 'organization'
}

export enum UserCategory {
    LEARNER = 'learner',
    INSTRUCTOR = 'instructor',
}

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export enum UserPrivacy {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

export enum ClassNameScrollBar {
    Y = 'hasYScrollBar',
    X = 'hasXScrollBar'
}

export enum Color {
    PRIMARY_BLUE = '#3568D4',
    SUCCESS = '#06C270',
    INFO = '#00cfe8',
    DANGER = '#ea5455',
    WARNING = '#ff9f43',
    DISABLED = '#cdcdcd',
    TEXT_GRAY = '#404852',
}

export enum UploadFileTypes {
    IMAGE = 'image',
    ALL = '*/*'
}

export enum UserAccountStatus {
    DEACTIVATED = 'deactivated',
    ACTIVE = 'active',
    TO_BE_DELETED = 'to_be_deleted',
    DELETED = 'deleted',
    SUSPENDED = 'suspended'
}
