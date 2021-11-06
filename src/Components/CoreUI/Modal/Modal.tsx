import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'

import { Button, FlexContainer, Typography } from 'Components'

import styles from './Modal.module.scss'
import { FunctionWithNoParam, Nullable } from '../../../Utils/Types'

interface ModalProps {
    modalVisibility: boolean,
    onCancel: FunctionWithNoParam,
    disableClose?: boolean,
    wrapperStyle?: string,
    bodyStyle?: string,
    headerStyle?: string,
    footerStyle?: string,
}

interface ModalPropsFooter extends ModalProps{
    footer: Nullable<ReactElement>
}

interface ModalPropsOnSuccess extends ModalProps{
    onSuccess: FunctionWithNoParam
}

interface ModalPropsHeader extends ModalProps{
    header: Nullable<ReactElement>
}

interface ModalPropsTitle extends ModalProps{
    title: string
}

export const Modal: FC<(ModalPropsFooter | ModalPropsOnSuccess) & (ModalPropsHeader | ModalPropsTitle)> = ({ children, ...props  }) => {

  const { onCancel, modalVisibility, disableClose = false, footerStyle, headerStyle, bodyStyle, wrapperStyle } = props

  const modalWrapperRef = useRef<HTMLDivElement>(null)

  const hasFooter = useMemo(() => (!!(props as ModalPropsOnSuccess).onSuccess) || (props as ModalPropsFooter).footer !== undefined, [props])
  const hasHeader = useMemo(() => (!!(props as ModalPropsTitle).title) || (props as ModalPropsHeader).header !== undefined, [props])

  const windowOnClick = useCallback(event => {
    if (event.target === modalWrapperRef.current) {
      onCancel()
      hideModal()
    }
  }, [])

  const hideModal = useCallback(() => {
    if(modalWrapperRef.current)
      modalWrapperRef.current.classList.remove(styles.showModal)
    window.removeEventListener('click', windowOnClick)
  }, [windowOnClick])

  const showModal = useCallback(() => {
    if(modalWrapperRef.current)
      modalWrapperRef.current.classList.add(styles.showModal)
    window.addEventListener('click', windowOnClick)
  },[windowOnClick])


  useEffect(() => {
    if(modalVisibility) showModal()
    else hideModal()
  }, [modalVisibility, hideModal, showModal])

  return (
    <FlexContainer justify='center' fill classList={classNames(styles.modalBackground)} ref={modalWrapperRef}>
      <div className={classNames(styles.modalContainer, wrapperStyle)}>
        {disableClose ? null : <button className={styles.modalCloseBar} onClick={onCancel}>X</button>}
        {hasHeader
          ? (props as ModalPropsHeader).header
          :
          <FlexContainer justify='start' classList={classNames(styles.modalTitle, headerStyle)}>
            <Typography variant='h4'> {(props as ModalPropsTitle).title} </Typography>
          </FlexContainer>
        }
        <div className={classNames(styles.modalBody, bodyStyle)}>
          {children}
        </div>
        {hasFooter
          ? (props as ModalPropsFooter).footer
          :
          <FlexContainer justify='end' classList={classNames(styles.modalFooter, footerStyle)}>
            <Button variant='secondary' className={styles.declineButton} onClick={onCancel}>Cancel</Button>
            <Button variant='primary' className={styles.primaryButton} onClick={(props as ModalPropsOnSuccess).onSuccess}>Confirm</Button>
          </FlexContainer>
        }
      </div>
    </FlexContainer>
  )
}

