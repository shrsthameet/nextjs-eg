import { apiWebinar } from 'ApiCalls/ScheduleWebinar'
import { FlexContainer } from 'Components'

import { RelatedEvents, SendUpdates, WebinarEventDetail, WebinarProfileBanner } from 'Components/WebinarProfile'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'

import styles from 'styles/webinarProfile/webinarProfile.module.scss'

const WebinarProfile: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <FlexContainer direction='col' classList={styles.webinarProfilePage}>
      <WebinarProfileBanner
        hostName={data.host.name}
        imageURL={data.file}
        webinarName={data.name}
        registrationsCount={data.registrationsCount}
        maxParticipants={data.maxParticipants}
      />
      <WebinarEventDetail data={data} />
      <RelatedEvents />
      <SendUpdates />
    </FlexContainer>
  )
}

export default WebinarProfile

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.query
  const response = await apiWebinar.getWebinar(id as string || '')
  const data = await response.data
    
  return {
    props: {
      data
    }
  }
}
