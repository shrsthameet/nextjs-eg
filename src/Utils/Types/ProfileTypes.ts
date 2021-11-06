import { Nullable } from './main'
import { UserAccountType, UserGender, UserPrivacy } from '../enum'

interface FieldTypeBasicInfo {
    about: string,
    gender: UserGender,
    name: string,
    openToWork: boolean,
    phone: string,
    email: string,
    socialLinks: FieldTypeSocialLink[],
    image?: string,
}

interface FieldTypeUserProfile extends FieldTypeBasicInfo{
    accountStatus: string,
    accountType: UserAccountType,
    avatarUrl: Nullable<string>,
    educations: FieldTypeEducationInfo[],
    id: string,
    imagePreSignedUrl?: string,
    isInstructor: boolean,
    isLearner: boolean,
    picUrl: Nullable<string>,
    privacy: UserPrivacy,
    phoneVerified: boolean,
    emailVerified: boolean,
    username: string,
    skillsWanted: [],
    workExperiences: FieldTypeWorkExperience[],
}

interface FieldTypeSocialLink {
    socialMedia: string,
    link: string
}

interface FieldTypeEducationInfo {
    degree: string,
    endYear: string,
    school: {
        id: string
        name: string
    }
    startYear: string,
}

interface FieldTypeWorkExperience {
    company: {
        id: string
        name: string
    },
    title: string,
    workedFrom: string,
    workedTill: string
}

interface BodyTypeWorkExperience {
    data: FieldTypeWorkExperience[],
    update: FieldTypeWorkExperience
}


interface BodyTypeEducationInfo {
    data: FieldTypeEducationInfo[],
    update: FieldTypeEducationInfo
}

interface FieldTypeOtherInfo {
    areasOfInterest: string
    preferredSubjects: string
    learningPreferences: string
}

interface FieldTypeQuestionnaire {
    id: string,
    question: string,
    isRequired: boolean,
    hasOther: boolean,
    userType: string,
    answerType: string,
    options: string[]
}

interface FieldTypeQuestionnaireAnswers {
    questionnaire: string,
    selectedOptions: {
        option: string,
        otherAnswer: Nullable<string>
    }[]
}

export type {
  FieldTypeBasicInfo,
  FieldTypeEducationInfo,
  FieldTypeWorkExperience,
  FieldTypeOtherInfo,
  FieldTypeUserProfile,
  FieldTypeQuestionnaire,
  FieldTypeQuestionnaireAnswers,
  BodyTypeEducationInfo,
  BodyTypeWorkExperience,
  FieldTypeSocialLink
}
