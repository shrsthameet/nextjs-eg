import { FlexContainer, Typography } from 'Components'
import React from 'react'
import { fallBackImagesUrl } from 'Utils/constants'

import styles from './WebinarEventDetail.module.scss'
import TeamCard from './TeamCard'

export const WebinarEventDetail = props => {
  const { data } = props
  return (
    <FlexContainer direction='col' classList={styles.eventDetailContainer}>
      <FlexContainer classList={styles.eventMainHead}>
        <Typography variant='h4'>
          Events Info
        </Typography>
      </FlexContainer>
      <FlexContainer align='start' classList={styles.eventWrapper}>
        <FlexContainer direction='col' align='start' classList={styles.eventDescription}>
          <Typography variant='h6'>Event Description</Typography>
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </FlexContainer>
        <FlexContainer direction='col' justify='start' align='start' classList={styles.eventInfo}>
          <FlexContainer classList={styles.webinarAvailability}>
            <ul>
              <li>
                <p><i className='fas fa-chair'/>Available Seats</p>
                <Typography variant='h6'>{data.maxParticipants}</Typography>
              </li>
              <li>
                <p><i className='fas fa-id-card'/>Enrolled</p>
                <Typography variant='h6'>{data.registrationsCount}</Typography>
              </li>
              <li>
                <p><i className='fas fa-hourglass'/>Remaining</p>
                <Typography variant='h6'>{data.maxParticipants - data.registrationsCount}</Typography>
              </li>
            </ul>
          </FlexContainer>
          <FlexContainer direction='col' align='start' classList={styles.takeAways}>
            <Typography variant='p'>
                Key Takeaways:
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: data.takeAways }} />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer align='start' direction='col' classList={styles.teamSection}>
        <Typography variant='h6'>
            Teams
        </Typography>
        <FlexContainer classList={styles.cardSection}>
          {data.host.id === data.moderator.id ? (
            <TeamCard
              imageURL={data.moderator.picUrl === null ? fallBackImagesUrl.defaultPerson : data.moderator.picUrl}
              name={data.moderator.name}
              userType={'Host / Moderator'}
              alt={data.moderator.name}
            />
          ) : (
            <>
              <TeamCard
                imageURL={data.host.picUrl === null ? fallBackImagesUrl.defaultPerson : data.host.picUrl}
                name={data.host.name}
                userType={'Host'}
                alt={data.host.name}
              />
              <TeamCard
                imageURL={data.moderator.picUrl === null ? fallBackImagesUrl.defaultPerson : data.moderator.picUrl}
                name={data.moderator.name}
                userType={'Moderator'}
                alt={data.moderator.name}
              />
            </>
          )}
          {data.host.id === data.coModerator.id ? (
            <TeamCard
              imageURL={data.coModerator.picUrl === null ? fallBackImagesUrl.defaultPerson : data.coModerator.picUrl}
              name={data.coModerator.name}
              userType={'Host / Co-Moderator'}
              alt={data.coModerator.name}
            />
          ) : (
            <>
              <TeamCard
                imageURL={data.coModerator.picUrl === null ? fallBackImagesUrl.defaultPerson : data.coModerator.picUrl}
                name={data.coModerator.name}
                userType={'Co-Moderator'}
                alt={data.coModerator.name}
              />
            </>
          )}
          {data.speakers.map(speaker => (
            <TeamCard
              key={speaker.id}
              imageURL={speaker.picUrl === null ? fallBackImagesUrl.defaultPerson : speaker.picUrl}
              name={speaker.name}
              userType={'Speaker'}
              alt={speaker.name}
            />
          ))}
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}
