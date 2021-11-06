import { FC, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Indicator } from '../Indicator'

import { animateContainerVariants } from 'Utils/constants'
import { AnimateContainerVariant } from 'Utils/enum'
import { FunctionWithParam } from 'Utils/Types'

import styles from './SinglePageScroll.module.scss'

interface SinglePageScrollProps {
    keyIndex: number,
    setKeyIndex: FunctionWithParam<number>,
    totalComponents: number,
}

export const SinglePageScroll:FC<SinglePageScrollProps> = ({ children, setKeyIndex: setPropKeyIndex, keyIndex: propKeyIndex, totalComponents }) => {

  const [keyIndex, setKeyIndex] = useState<number>(propKeyIndex)
  const keyIndexRef = useRef(keyIndex)

  useEffect(() => {
    setPropKeyIndex(keyIndex)
  }, [setPropKeyIndex, keyIndex])

  useEffect(()=>{
    const wheelEventHandler = e => {
      if(e.deltaY > 0 || e.deltaY < 0){
        const changeIndex:boolean = !((keyIndexRef.current === 0 && e.deltaY < 0) || (keyIndexRef.current === (totalComponents - 1) && e.deltaY > 0))
        setKeyIndex(keyIndexRef.current + (changeIndex ? (e.deltaY < 0 ? -1 : 1) : 0))
        keyIndexRef.current = keyIndexRef.current + (changeIndex ? (e.deltaY < 0 ? -1 : 1) : 0)
        changeIndex ? reinitializeListener() : null
      }
    }

    const reinitializeListener = () => {
      document.removeEventListener('wheel', wheelEventHandler)
      const listenerTimeout = setTimeout(() => {
        document.addEventListener('wheel', wheelEventHandler)
        clearTimeout(listenerTimeout)
      }, 1000)
    }

    document.addEventListener('wheel', wheelEventHandler)

    const clearListener = () => {
      document.removeEventListener('wheel', wheelEventHandler)
    }

    return clearListener
  },[totalComponents])

  const handleIndicatorChange = index => {
    setKeyIndex(index)
    keyIndexRef.current = index
  }

  return(
    <>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          variants={animateContainerVariants.toTop}
          initial={AnimateContainerVariant.HIDDEN}
          animate={AnimateContainerVariant.VISIBLE}
          exit={AnimateContainerVariant.EXIT}
          key={keyIndex}
          className={styles.singlePageScrollWrapper}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Indicator total={totalComponents} handleIndicatorChange={handleIndicatorChange} active={keyIndex} direction='col' placement='bottomRight' />
    </>
  )
}
