import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { AuthFooter, CompanyLogo, FlexContainer, Typography } from 'Components'

import { labels } from 'Utils/en'
import { AuthPagesLabels } from 'Utils/enum'

import styles from './AuthLayout.module.scss'

interface AuthLayoutProps {
  authPageLabel: AuthPagesLabels,
  additionalData?: {
    topic?: string,
    description?: string,
  },
  hasFooter?: boolean
  hasCompanyLogo?: boolean
}

export const AuthLayout:FC<AuthLayoutProps> = ({ authPageLabel, additionalData, hasCompanyLogo, hasFooter = false, children }) => {

  return(
    <>
      <Head>
        <title>{labels[authPageLabel].pageTitle}</title>
        <meta name='description' content='Auth pages of TBD application.' />
      </Head>
      <FlexContainer direction='col' classList={styles.authWrapper} justify='center'>
        {hasCompanyLogo
          ?
          <Link  href={'/'}>
            <a className={styles.authPageCompanyLogo}>
              <CompanyLogo />
            </a>
          </Link>
          : null}
        <div className={styles.authContentWrapper}>
          <div className={styles.authInfoWrapper}>
            {labels[authPageLabel].topic
              ? <Typography variant='h1' classList={styles.authTopic}>{`${labels[authPageLabel].topic}${additionalData?.topic || ''}`}</Typography>
              : null }
            {labels[authPageLabel].description
              ? <Typography variant='h6' classList={styles.authDescription}>{`${labels[authPageLabel].description}${additionalData?.description || ''}`}</Typography>
              : null }
          </div>
          {children}
        </div>
        {hasFooter ? <AuthFooter /> : null}
      </FlexContainer>
    </>
  )
}
