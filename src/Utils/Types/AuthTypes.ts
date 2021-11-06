import { UserAccountType } from '../enum'

interface FieldTypeSignUp {
    username: string,
    password: string,
    accountType: UserAccountType,
    isInstructor: boolean,
    isLearner: boolean,
    name: string
    profession?: string
}

interface FieldTypeLogin {
    username: string,
    password: string,
}

interface FieldTypeVerifyOTP {
    username: string,
    OtpCode: string,
}

interface FieldTypeResendOTP {
    username: string,
}

interface FieldTypeForgotPassword {
    username: string,
}

interface FieldTypeResetPassword {
    username: string,
    password: string,
}

interface FieldTypeChangePassword {
    oldPassword: string,
    password: string,
}

export type { FieldTypeLogin, FieldTypeChangePassword, FieldTypeForgotPassword, FieldTypeResetPassword, FieldTypeVerifyOTP, FieldTypeResendOTP, FieldTypeSignUp }
