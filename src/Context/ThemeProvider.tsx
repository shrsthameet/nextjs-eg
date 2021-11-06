import React, { FC, createContext, useContext, useState } from 'react'

import { ThemeType } from 'Utils/enum'

type ThemeContext = { theme: ThemeType; toggleTheme: VoidFunction };

const defaultTheme = ThemeType.LIGHT

export const ThemeContext = createContext<ThemeContext>(
    {} as ThemeContext
)

export const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme)
  const toggleTheme = () => {
    setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
