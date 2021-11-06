import { FC } from 'react'
import Image from 'next/image'
import { FlexContainer, Typography } from 'Components'
import { tempUserProfile } from 'Utils/mockData'
import styles from './ProfileUserContent.module.scss'
import { capitalizeFirstLetterOfEachWord } from '../../../Utils/UtilFunctions'
import { useUserProfile } from '../../../Context/UserProfileProvider'
import { fallBackImagesUrl } from '../../../Utils/constants'

export const ProfileUserContent:FC = () => {

  const { profileData } = useUserProfile()

  return(
    <FlexContainer direction='col' align='start' justify='start' classList={styles.profileUserContentWrapper}>
      <div className={styles.profileUserContent}>
        <Typography variant='h4' weight='bold' classList={styles.profileUserContentTitle}>About</Typography>
        <Typography variant='p'>{profileData?.about || 'No about ...'}</Typography>
      </div>
      <div className={styles.profileUserContent}>
        <Typography variant='h4' weight='bold' classList={styles.profileUserContentTitle}>Work Experience</Typography>
        {profileData && profileData.workExperiences.length > 0
          ? profileData?.workExperiences.map((exp, i) => (
            <FlexContainer key={i} classList={styles.profileUserCompanyWrapper}>
              <div className={styles.profileUserCompanyLogo}>
                <Image src={fallBackImagesUrl.company} alt='cl' layout='fill' />
              </div>
              <div className={styles.profileUserCompanyDetail}>
                <Typography variant='h5' weight='bold'>{exp.title}</Typography>
                <Typography variant='h5'>{exp.company.name}</Typography>
                <Typography variant='p'>{exp.workedFrom} - {exp.workedTill || 'Present'}</Typography>
              </div>
            </FlexContainer>
          ))
          : <Typography>No work experience ...</Typography>}
      </div>
      <div className={styles.profileUserContent}>
        <Typography variant='h4' weight='bold' classList={styles.profileUserContentTitle}>Education</Typography>
        {profileData && profileData.educations.length > 0
          ? profileData?.educations.map((tup, i) => (
            <FlexContainer key={i} classList={styles.profileUserCompanyWrapper}>
              <div className={styles.profileUserCompanyLogo}>
                <Image src={fallBackImagesUrl.school} alt='cl' layout='fill' />
              </div>
              <div className={styles.profileUserCompanyDetail}>
                <Typography variant='h5' weight='bold'>{tup.degree}</Typography>
                <Typography variant='h5'>{tup.school.name}</Typography>
                <Typography variant='p'>{tup.startYear} - {tup.endYear || 'Present'}</Typography>
              </div>
            </FlexContainer>
          ))
          : <Typography>No education ...</Typography>}
      </div>
      <div className={styles.profileUserContent}>
        <Typography variant='h4' weight='bold' classList={styles.profileUserContentTitle}>Area of Interest<span>See all</span></Typography>
        <FlexContainer wrap={true}>
          {tempUserProfile.areasOfInterest.map((tup, i) => (
            <FlexContainer key={i} classList={styles.profileUserAreaOfInterest}>
              <div className={styles.profileUserCompanyLogo}>
                <Image src={tup.interestLogo} alt='cl' layout='fill' />
              </div>
              <Typography variant='h5'>{tup.value}</Typography>
            </FlexContainer>
          ))}
        </FlexContainer>
      </div>
      <div className={styles.profileUserContent}>
        <Typography variant='h4' weight='bold' classList={styles.profileUserContentTitle}>Preferred Subject</Typography>
        <FlexContainer classList={styles.profileUserPreferredSubjectWrapper}>
          {tempUserProfile.preferredSubject.map((tup, i) => (
            <div key={i} className={styles.profileUserPreferredSubject}>
              {capitalizeFirstLetterOfEachWord(tup)}
            </div>
          ))}
        </FlexContainer>
      </div>
    </FlexContainer>
  )
}
