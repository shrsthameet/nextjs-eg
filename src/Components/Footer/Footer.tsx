import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import { FlexContainer, SvgIcons, Typography } from 'Components/index'

import { SvgIconName } from 'Utils/enum'
import { company_details, landingPageFooter } from 'Utils/constants'

import styles from './Footer.module.scss'
import { copyRightLabel } from '../../Utils/en'

export const Footer:FC = () => {

  const { contactInfo, help, about } = landingPageFooter

  return(
    <FlexContainer direction='col' align='start' justify='spaceBetween' fill={true} classList={styles.landingPageFooterWrapper}>
      <FlexContainer fill={true} align='start'>
        <FlexContainer justify='start' align='start' classList={classNames(styles.landingPageFooterContentWrapper, styles.landingPageFooterFirstContent)} direction='col'>
          <Typography variant='h5' classList={styles.landingPageFooterContentTitle}>Contact Info</Typography>
          <Typography classList={styles.landingPageFooterCompanyDetails}>{company_details.shortForm}<br/>{company_details.location}<br/>{company_details.number}</Typography>
        </FlexContainer>
        <div className={styles.landingPageFooterContentWrapper}>
          <Typography variant='h5' classList={styles.landingPageFooterContentTitle}>{contactInfo.displayName}</Typography>
          <ul className={styles.landingPageFooterContentNavWrapper}>
            {contactInfo.navs.map((cin, i) =>
              <li key={i} className={styles.landingPageFooterContentNav}><Link href={cin.redirection}><a>{cin.displayName}</a></Link></li>
            )}
          </ul>
        </div>
        <div className={styles.landingPageFooterContentWrapper}>
          <Typography variant='h5' classList={styles.landingPageFooterContentTitle}>{about.displayName}</Typography>
          <ul className={styles.landingPageFooterContentNavWrapper}>
            {about.navs.map((abn, i) =>
              <li key={i} className={styles.landingPageFooterContentNav}><Link href={abn.redirection}><a>{abn.displayName}</a></Link></li>
            )}
          </ul>
        </div>
        <div className={styles.landingPageFooterContentWrapper}>
          <Typography variant='h5' classList={styles.landingPageFooterContentTitle}>{help.displayName}</Typography>
          <ul className={styles.landingPageFooterContentNavWrapper}>
            {help.navs.map((hpn, i) =>
              <li key={i} className={styles.landingPageFooterContentNav}><Link href={hpn.redirection}><a>{hpn.displayName}</a></Link></li>
            )}
          </ul>
        </div>
      </FlexContainer>
      <FlexContainer classList={styles.landingPageFooterBottomWrapper} justify='spaceBetween' fill={true}>
        <FlexContainer>
          <Link href='/'><a className={styles.landingPageFooterBottomNav}>Terms & Conditions</a></Link>
          <Link href='/'><a className={styles.landingPageFooterBottomNav}>Privacy & policy</a></Link>
          <Typography variant='h5'>{company_details.copyRight}</Typography>
        </FlexContainer>
        <FlexContainer>
          <Link href='/'><a className={styles.landingPageFooterBottomSocialNav}><SvgIcons iconName={SvgIconName.FACEBOOK_WHITE}/></a></Link>
          <Link href='/'><a className={styles.landingPageFooterBottomSocialNav}><SvgIcons iconName={SvgIconName.TWITTER_WHITE}/></a></Link>
          <Link href='/'><a className={styles.landingPageFooterBottomSocialNav}><SvgIcons iconName={SvgIconName.INSTAGRAM}/></a></Link>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}

interface AuthFooterProps {
  hasSocialLinks?: boolean
}

export const AuthFooter:FC<AuthFooterProps> = ({ hasSocialLinks = true }) => {
  return(
    <FlexContainer fill justify='spaceBetween' classList={styles.authFooterWrapper}>
      <FlexContainer classList={styles.authFooterLinksWrapper}>
        <Link href={'/'}><a className={styles.authFooterLinks}>Terms and Conditions</a></Link>
        <Link href={'/'}><a className={styles.authFooterLinks}>Privacy Policy</a></Link>
      </FlexContainer>
      {hasSocialLinks
        ?
        <div>
          <Typography variant='h6' classList={styles.authFooterLogoLabel}>Sign Up With</Typography>
          <FlexContainer classList={styles.authFooterLogoWrapper}>
            <div className={styles.authFooterLogo}><SvgIcons iconName={SvgIconName.GOOGLE_LOGO}/></div>
            <div className={styles.authFooterLogo}><SvgIcons iconName={SvgIconName.FACEBOOK_LOGO}/></div>
            <div className={styles.authFooterLogo}><SvgIcons iconName={SvgIconName.LINKEDIN_LOGO}/></div>
          </FlexContainer>
        </div>
        : null}
      <Typography variant='p' classList={styles.authFooterCopyRight}>{copyRightLabel}</Typography>
    </FlexContainer>
  )
}
