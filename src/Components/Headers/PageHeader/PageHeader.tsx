import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { useUserContext } from 'Context'
import { cleanCookies } from 'universal-cookie/lib/utils'

import { Button, CompanyLogo, FlexContainer, Input, NameAvatar, SvgIcons, Typography } from 'Components'

import { apiSignOut } from 'ApiCalls/AuthApi'

import { ProfileMainNavTabValue, SvgIconName } from 'Utils/enum'

import styles from './PageHeader.module.scss'
import { useUserProfile } from '../../../Context/UserProfileProvider'

export const PageHeader:FC = () => {

  const router = useRouter()
  const { isLoggedIn } = useUserContext()
  const { profileData } = useUserProfile()

  const logOutUser = async () => {
    await apiSignOut()
    cleanCookies()
    localStorage.clear()
    await router.push('/')
  }

  return(
    <FlexContainer direction='row' justify='spaceBetween' classList={styles.notLoggedInHeaderWrapper}>
      <FlexContainer classList={styles.headerLeftSide} justify='start'>
        <Link href={'/'} passHref={true}><a><CompanyLogo /></a></Link>
        <Button variant='secondary'>Explore<SvgIcons color='#3377FF' iconName={SvgIconName.ANGLE_DOWN} /></Button>
      </FlexContainer>
      <FlexContainer classList={styles.searchWrapper}>
        <FlexContainer justify='center' classList={styles.searchIconWrapper}><SvgIcons color='#9A9A9A' iconName={SvgIconName.SEARCH} /></FlexContainer>
        <Input category='small' placeholder='What do you want to learn?' wrapperStyle={styles.searchInputWrapper} inputStyle={styles.searchInput} type='text' error={null} />
        <FlexContainer justify='center' classList={styles.searchFilterWrapper}>Filter<SvgIcons color='#9A9A9A' iconName={SvgIconName.SEARCH_BAR} /></FlexContainer>
      </FlexContainer>
      <FlexContainer classList={styles.headerRightSide} justify='end'>
        {isLoggedIn
          ?
          <>
            <Button variant='primary'>Events <SvgIcons color='white' iconName={SvgIconName.ANGLE_DOWN}/></Button>
            <Typography variant='span' classList={styles.headerRightNotificationIcon}><SvgIcons iconName={SvgIconName.BELL_WITH_DOT}/></Typography>
            <div className={styles.headerRightDropDownWrapper}>
              <div className={styles.headerRightProfileImage}>
                {
                  profileData?.avatarUrl
                    ? <Image src={profileData.avatarUrl} layout='fill' alt='PP' />
                    : <NameAvatar name={profileData?.name || ''} />
                }
              </div>
              <div className={styles.headerRightDropDownContent}>
                <FlexContainer classList={styles.headerRightDropDownContentItem}><Link href={`/profile/${ProfileMainNavTabValue.DETAIL}`}><a>Profile</a></Link></FlexContainer>
                <FlexContainer classList={styles.headerRightDropDownContentItem}><Link href={'/profile/account-settings'}><a>Settings</a></Link></FlexContainer>
                <FlexContainer classList={styles.headerRightDropDownContentItem}><div role='button'>Switch Account</div></FlexContainer>
                <FlexContainer classList={styles.headerRightDropDownContentItem}><div role='button' onClick={logOutUser}>Logout</div></FlexContainer>
              </div>
            </div>
          </>
          :
          <>
            <Button variant='primary' onClick={async () => await router.push('/login')}>Login/Signup</Button>
          </>
        }
      </FlexContainer>
    </FlexContainer>
  )
}
