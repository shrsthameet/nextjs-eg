import Link  from 'next/link'

import { FlexContainer, Typography } from 'Components'

import styles from 'styles/Register/Register.module.scss'

export const RegisterFooter = () => {
  return (
    <FlexContainer classList={styles.redirectToLogin}>
      <Link href={'/login'}>
        <a>
          <Typography variant='h6'>Already on TBD? Log in</Typography>
        </a>
      </Link>
    </FlexContainer>
  )
}
