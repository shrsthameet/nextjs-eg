import { Nullable } from './'

interface UserTypeField {
    id: string,
    name: string,
    email: string,
    phone: Nullable<string>,
    picUrl: Nullable<string>,
    avatarUrl: Nullable<string>
}

interface EventType {
    id: string,
    name: EventType
}

interface UpcomingEventsType {
    id: string,
    name: string,
    description: string,
    host: UserTypeField,
    type: EventType,
    file: string,
    fileType: string,
    subjects: [],
    ratings: number,
    startsFrom: number,
    registrationsCount: number
}

interface WebinarFieldType extends UpcomingEventsType {
    coModerator: UserTypeField,
    interestedCount: number,
    maxParticipants: number,
    moderator: UserTypeField,
    repeatUntil: string,
    rrule: string,
    speakers: UserTypeField[],
    takeAways: string
}

export type { WebinarFieldType, UpcomingEventsType }