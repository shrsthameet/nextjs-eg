/* eslint-disable consistent-return */
import { useEffect, useState } from 'react'

import { ScreenSizes } from 'Utils/enum'

interface WindowSize {
  width: number | 0;
  height: number | 0;
  isDesktop: boolean;
}

export const useWindowSize = (): WindowSize => {
  const isClient = typeof window === 'object'

  const getSize = (): WindowSize => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
      isDesktop: isClient && (window.innerWidth >= ScreenSizes.DESKTOP),
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return
    }

    const handleResize = (): void => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    /*eslint-disable*/
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}
