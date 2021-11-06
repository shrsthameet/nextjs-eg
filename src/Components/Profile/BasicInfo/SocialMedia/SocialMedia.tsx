import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button, FlexContainer, Input, SelectOption,SvgIcons, Typography } from 'Components'
import { getSocialLinkDisplayName, getSocialLinkIcon } from 'Utils/UtilFunctions'
import { Color, SvgIconName } from 'Utils/enum'
import { socialMediaList } from 'Utils/constants'
import { FieldTypeSocialLink, FunctionWithParam, FunctionWithParamAndReturn } from 'Utils/Types'

import profileStyles from '../../Profile.module.scss'
import styles from './SocialMedia.module.scss'

interface SocialMediaProps {
  socialLinks: FieldTypeSocialLink[],
  onSubmit: FunctionWithParamAndReturn<FieldTypeSocialLink[], Promise<'SUCCESS' | 'FAILED'>>
}

export const SocialMedia:FC<SocialMediaProps> = ({ socialLinks, onSubmit }) => {

  const [showAddNewSocialLink, setShowAddNewSocialLink] = useState<boolean>(false)
  const [formStateSocialLink, setFormStateSocialLink] = useState<FieldTypeSocialLink>({ link: '', socialMedia: '' })
  const [isEditingLink, setIsEditingLink] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    if(!showAddNewSocialLink){
      setFormStateSocialLink({ socialMedia: '', link: '' })
      setIsEditingLink(false)
    }
  }, [showAddNewSocialLink])

  const handleSocialMediaChange:FunctionWithParam<{ name: string, value: string }> = ({ value, name }) => {
    setFormStateSocialLink(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSocialMediaSubmit:MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    const updatedLinks = socialLinks.length > 0
      ? socialLinks.findIndex(sl => sl.socialMedia === formStateSocialLink.socialMedia) > -1
        ? [...socialLinks.map(socialLink => socialLink.socialMedia === formStateSocialLink.socialMedia ? formStateSocialLink : socialLink)]
        : [...socialLinks, formStateSocialLink]
      : [formStateSocialLink]
    const res = await onSubmit(updatedLinks)
    if(res === 'SUCCESS'){
      setShowAddNewSocialLink(false)
    }
    setIsSubmitting(false)
  }

  const handleEditSocialMedia:FunctionWithParam<FieldTypeSocialLink> = data => {
    setFormStateSocialLink(data)
    setIsEditingLink(true)
    setShowAddNewSocialLink(true)
  }

  return(
    <div className={styles.profileSocialMediaWrapper} >
      <FlexContainer>
        {socialLinks.length > 0
          ? socialLinks.map(socialLink =>
            <FlexContainer key={socialLink.socialMedia} onClick={() => handleEditSocialMedia(socialLink)} justify='center' classList={styles.profileSocialMedia}>
              <SvgIcons iconName={getSocialLinkIcon(socialLink.socialMedia)} />
            </FlexContainer>
          )
          : null}
        <FlexContainer justify='center' classList={classNames(styles.profileSocialMedia, showAddNewSocialLink ? styles.profileSocialMediaHideButton : '')} onClick={() => setShowAddNewSocialLink(!showAddNewSocialLink)}>
          <SvgIcons iconName={SvgIconName.PLUS} color={showAddNewSocialLink ? Color.DANGER : Color.PRIMARY_BLUE} />
        </FlexContainer>
      </FlexContainer>
      <div className={classNames(styles.profileSocialMediaAddWrapper, showAddNewSocialLink ? styles.profileSocialMediaAddShow : '')}>
        <Typography classList={profileStyles.profileLabel}>{isEditingLink ? 'Edit ' : 'Add New '}Link</Typography>
        <FlexContainer align='end' classList={profileStyles.profileInput} fill>
          <FlexContainer direction='col' justify='spaceBetween' classList={styles.profileSocialMediaSelInpWrapper}>
            {isEditingLink
              ? <Typography weight='bold' variant='h5' classList={styles.profileSocialMediaDisplayName}>{getSocialLinkDisplayName(formStateSocialLink.socialMedia)}</Typography>
              :
              <SelectOption category='small' error={null} name='socialMedia' value={formStateSocialLink.socialMedia}
                onChange={({ target: { name, value } }) => handleSocialMediaChange({ name, value })}>
                <option disabled selected value={''}>select media</option>
                {socialMediaList.filter(sml => socialLinks.findIndex(sl => sl.socialMedia === sml.name) === -1).map(media =>
                  <option key={media.name} value={media.name}>{media.displayName}</option>)}
              </SelectOption>
            }
            <Input category='small' name='link' error={null} value={formStateSocialLink.link} onChange={({ target: { name, value } }) => handleSocialMediaChange({ name, value })} />
          </FlexContainer>
          <Button disabled={!formStateSocialLink.socialMedia || !formStateSocialLink.link} loading={isSubmitting} className={styles.profileSocialMediaButton} onClick={handleSocialMediaSubmit}>
            {isEditingLink ? 'Save' : 'Add'}
          </Button>
        </FlexContainer>
      </div>
    </div>
  )
}
