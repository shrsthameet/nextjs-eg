import { ChangeEventHandler, FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button, FlexContainer, Modal, SvgIcons, Typography } from 'Components'
import styles from './Upload.module.scss'
import { FunctionWithNoParam, FunctionWithParam, Nullable } from 'Utils/Types'
import { Color, SvgIconName, UploadFileTypes } from 'Utils/enum'
import { uploadLabels } from 'Utils/en'

export interface UploadType {
    file: Nullable<File>,
    fileName: string
}

/** size limit in KB */
interface UploadPros {
  onChange: FunctionWithParam<UploadType>
  imageUrl: Nullable<string>
  accept?: UploadFileTypes
  sizeLimit?: number
  draggable?: boolean
}

interface ErrorState {
    fileType: boolean,
    fileSize: boolean
}

const fileImageTypes = [ 'image/jpeg', 'image/png', 'image/gif' ]
const dragDropEvents = ['dragenter', 'dragover', 'dragleave', 'drop']

export const Upload:FC<UploadPros> = ({ onChange: propOnChange, imageUrl: propImageUrl, accept= UploadFileTypes.ALL, draggable, sizeLimit = 1024 }) => {

  const [fileName, setFileName] = useState<Nullable<string>>(null)
  const [imageUrl, setImageUrl] = useState<Nullable<string>>(null)
  const [error, setError] = useState<ErrorState>({ fileSize: false, fileType: false })
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const draggableAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setImageUrl(propImageUrl)
  }, [propImageUrl])

  const setFileData:FunctionWithParam<Nullable<FileList>> = useCallback(files => {
    if(files && files.length > 0){
      const acceptedFileSize = Math.round(files[0].size / 1024) <= sizeLimit
      const acceptedFileType = fileImageTypes.includes(files[0].type)
      if(acceptedFileSize && acceptedFileType){
        setModalVisibility(false)
        setImageUrl(URL.createObjectURL(files[0]))
        setFileName(files[0].name)
        propOnChange({ file: files[0], fileName: files[0].name })
      }
      setError({ fileSize: !acceptedFileSize, fileType: !acceptedFileType })
    }
  }, [sizeLimit, propOnChange])

  useEffect(() => {
    if(modalVisibility){
      const onDragEvent = e => {
        e.preventDefault()
        e.stopPropagation()
        if(e.type === 'drop'){
          const files = e.dataTransfer.files
          setFileData(files)
          dragDropEvents.forEach(eventName => {
            draggableAreaRef.current?.removeEventListener(eventName, onDragEvent, false)
          })
        }else if(e.type === 'dragenter' || e.type === 'dragover'){
          draggableAreaRef.current?.classList.add(styles.uploadModalContentHighlight)
        }else{
          draggableAreaRef.current?.classList.remove(styles.uploadModalContentHighlight)
        }
      }
      dragDropEvents.forEach(eventName => {
        draggableAreaRef.current?.addEventListener(eventName, onDragEvent, false)
      })

    }
  }, [modalVisibility, draggableAreaRef, setFileData])

  const handleChooseFileClick:MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    if(fileInputRef && fileInputRef.current)
      fileInputRef.current.click()
  }

  const handleFileChange:ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const { files } = e.target
    setFileData(files)
  }

  const closeModal:FunctionWithNoParam = () => {
    setModalVisibility(false)
  }

  return(
    <FlexContainer classList={styles.uploadWrapper} align='start'>
      <div className={styles.uploadImage}>
        {
          imageUrl
            ? <Image loader={() => imageUrl} alt='pp' src={imageUrl} layout='fill' />
            : <SvgIcons color={Color.PRIMARY_BLUE} iconName={SvgIconName.USER_LARGE} />
        }
      </div>
      <div className={styles.uploadButtonWrapper}>
        <FlexContainer>
          <Button className={styles.uploadButton} type='button' onClick={draggable ? () => setModalVisibility(true) : handleChooseFileClick}>Choose File</Button>
          <Typography classList={styles.uploadFileName}>{fileName || uploadLabels.noFile}</Typography>
        </FlexContainer>
        <Typography classList={styles.uploadCriteria}>
          <span className={error.fileType ? styles.uploadErrorText : ''}>{uploadLabels.formatCriteria[accept]}</span>
          <span className={error.fileSize ? styles.uploadErrorText : ''}>{uploadLabels.fileSizeCriteria(sizeLimit)}</span>
        </Typography>
      </div>
      <input className={styles.fileInput} accept={accept === UploadFileTypes.IMAGE ? 'image/jpeg, image/x-png, image/gif' : accept} hidden={true} ref={fileInputRef} type='file' onChange={handleFileChange}/>
      {draggable
        ?
        <Modal wrapperStyle={styles.uploadModalWrapperStyle} disableClose bodyStyle={styles.uploadModalBodyStyle} footer={null} header={null} modalVisibility={modalVisibility} onCancel={closeModal}>
          <FlexContainer ref={draggableAreaRef} direction='col' justify='center' classList={styles.uploadModalContentWrapper}>
            <div className={styles.uploadModalIcon}><SvgIcons iconName={SvgIconName.UPLOAD_ICON} /></div>
            <Typography weight='bold' classList={styles.uploadModalLabels}>{uploadLabels.modalLabel}</Typography>
            <Typography weight='bold' classList={styles.uploadModalLabels}>or</Typography>
            <Button type='button' className={styles.uploadModalButton} onClick={handleChooseFileClick}>{uploadLabels.modalButton}</Button>
          </FlexContainer>
        </Modal>
        : null}
    </FlexContainer>
  )
}
