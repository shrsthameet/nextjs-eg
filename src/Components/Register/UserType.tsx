import { FC } from 'react'
import { useRouter } from 'next/dist/client/router'

import { Typography } from 'Components'

import styles from './Register.module.scss'

export const UserType: FC = () => {
  const router = useRouter()

  const routeUser = async (type: string) => {
    await router.push(`/register/${type}`)
  }
  return (
    <div className={styles.registerContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.card} onClick={() => routeUser('learner')}>
        Learner
        </div>
        <div className={styles.card} onClick={() => routeUser('host')}>
        Host / Instructor
        </div>
      </div>
      <div>
        <Typography variant='h5'>Already on TBD? Log in</Typography>
      </div>
    </div>
  )
}
