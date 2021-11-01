import { AppProps } from 'next/app'
import '../styles/globals.scss'
import { ChakraProvider, Progress } from '@chakra-ui/react'
import '../styles/Suggestion.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/Suggestionboxshadow.css'
// 1. Import the utilities
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { Router } from 'next/router'
import React from 'react'
import ProgressBar from '@badrap/bar-of-progress'
// 2. Update the breakpoints as key-value pairs
const progress = new ProgressBar({
  size: 4,
  color: '#4ba5fa',
  className: 'z-50',
  delay: 100,
})
// progress.start()
Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)
const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
})
// 3. Extend the theme
const theme = extendTheme({ breakpoints })

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
