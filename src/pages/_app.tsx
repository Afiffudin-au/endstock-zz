import { AppProps } from 'next/app'
import '../styles/globals.scss'
import { ChakraProvider, Progress } from '@chakra-ui/react'
import '../styles/Suggestion.scss'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/Suggestionboxshadow.css'
// 1. Import the utilities
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { Router } from 'next/router'
import React from 'react'
// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
})
// 3. Extend the theme
const theme = extendTheme({ breakpoints })
function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  return (
    <ChakraProvider theme={theme}>
      {loading && (
        <Progress
          zIndex={10}
          position='fixed'
          top='0'
          right='0'
          left='0'
          colorScheme='blue'
          size='xs'
          isIndeterminate
        />
      )}

      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
