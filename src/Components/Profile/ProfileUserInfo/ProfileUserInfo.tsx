import { FC, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, FlexContainer, SideBarTabs, Spinner, SvgIcons, Typography } from 'Components'

import { profilePageTabs } from 'Utils/constants'
import { ProfileEditTags, SvgIconName } from 'Utils/enum'
import { FunctionWithParam, Nullable } from 'Utils/Types'

import styles from './ProfileUserInfo.module.scss'
import { useUserProfile } from '../../../Context/UserProfileProvider'
import { getSocialLinkIcon } from '../../../Utils/UtilFunctions'

interface ProfileUserInfoProps {
  queryValue: Nullable<string>,
  isEditing?: boolean
}

export const ProfileUserInfo:FC<ProfileUserInfoProps> = ({ queryValue, isEditing = false }) => {

  const router = useRouter()
  const { profileData } = useUserProfile()

  const tabList = profilePageTabs[isEditing ? 'edit' : 'main'].map(ppt => ({ ...ppt, onTabClick: async () => await handleTabClick(ppt.hrefUrl ? ppt.hrefUrl : `/profile/${ppt.value}`) }))

  const handleTabClick:FunctionWithParam<string> = async hrefUrl => {
    await router.push(hrefUrl)
  }

  const latestPosition:string = useMemo(() => profileData && profileData.workExperiences.length > 0
    ? profileData.workExperiences.reduce((acc: string, curr) => {
      let latestYear = 0
      if(!curr.workedTill) return curr.title
      else {
        if(parseInt(curr.workedTill) > latestYear){
          latestYear = parseInt(curr.workedTill)
          acc = curr.title
        }
      }
      return acc
    }, '')
    : 'No Position', [profileData])


  return(
    <FlexContainer direction='col' classList={styles.profileUserInfoWrapper}>
      {isEditing
        ? null
        :
        <div className={styles.profileUserInfoDetailsWrapper}>
          <div className={styles.profileUserInfoBackgroundImage}>
            {profileData?.picUrl
              ? <Image src={profileData.picUrl} layout='fill' alt='pp' />
              : <SvgIcons iconName={SvgIconName.USER_LARGE} color={'whitesmoke'} />
            }
          </div>
          <FlexContainer direction='col' classList={styles.profileUserInfoContentWrapper} justify='center'>
            {profileData
              ?
              <>
                <div className={styles.profileUserInfoContentImage}>
                  {profileData?.picUrl
                    ? <Image src={profileData.picUrl} layout='fill' alt='pp'/>
                    : <SvgIcons iconName={SvgIconName.USER_TIE} color={'whitesmoke'}/>
                  }
                </div>
                <Typography variant='h5' weight='bold'
                  classList={styles.profileUserInfoContentDetail}>{profileData?.name}</Typography>
                <Typography variant='h6'
                  classList={styles.profileUserInfoContentDetail}>{profileData?.email}</Typography>
                <Typography variant='h6'
                  classList={styles.profileUserInfoContentDetail}>{latestPosition}</Typography>
                <Typography variant='h6'
                  classList={styles.profileUserInfoContentDetail}>{profileData?.phone || 'No Number'}</Typography>
                <FlexContainer classList={styles.profileUserInfoSocialWrapper}>
                  {profileData && profileData.socialLinks?.length > 0
                    ? profileData.socialLinks.map(socialLink => (
                      <Link key={socialLink.socialMedia} href={socialLink.link} as={socialLink.link} passHref>
                        <a className={styles.profileUserInfoSocialLink}  target='_blank' rel='noreferrer'>
                          <SvgIcons iconName={getSocialLinkIcon(socialLink.socialMedia)}/>
                        </a>
                      </Link>
                    ))
                    : null}
                </FlexContainer>
                <Link href={`/profile/edit?section=${ProfileEditTags.BASIC_INFO}`} passHref={true}><Button
                  className={styles.profileUserInfoEditButton}><SvgIcons iconName={SvgIconName.PENCIL}/> Edit
                          Profile</Button></Link>
              </>
              : <Spinner classname={styles.profileUserInfoLoading} />
            }
          </FlexContainer>
        </div>
      }
      <SideBarTabs activeValue={queryValue} tabList={tabList} />
    </FlexContainer>
  )
}
