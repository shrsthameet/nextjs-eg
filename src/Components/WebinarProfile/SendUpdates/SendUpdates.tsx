import { Button, FlexContainer, Input, Typography } from 'Components'
import React from 'react'

import styles from './SendUpdates.module.scss'

export const SendUpdates = () => {
  return (
    <FlexContainer justify='center' classList={styles.sendUpdatesContainer}>
      <FlexContainer align='start' classList={styles.sendUpdatesWrapper}>
        <FlexContainer direction='col' align='start' classList={styles.infoSection}>
          <Typography variant='h6'>
            Try some of our classes
          </Typography>
          <Typography variant='p'>
            Enter your email and we will send you some samples of our favorite classes.
          </Typography>
        </FlexContainer>
        <FlexContainer direction='col' align='start' classList={styles.formSection}>
          <FlexContainer align='start' classList={styles.form}>
            <Input error='' wrapperStyle={styles.inputStyle} category='small' type='email' name='email' placeholder='Enter your email' autoComplete='off' />
            <Button>Submit</Button>
          </FlexContainer>
          <FlexContainer>
            <Typography variant='p'>
              <input type='checkbox' /> I agree to receive email updates
            </Typography>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}
