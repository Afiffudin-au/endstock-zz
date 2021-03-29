import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react'
import React from 'react'

function SearchAlert() {
  return (
    <Alert status='error' mb='2'>
      <AlertTitle mr={2}>Sorry,we cannot find</AlertTitle>
      <AlertDescription>
        Please search again or change filter configurations
      </AlertDescription>
    </Alert>
  )
}

export default SearchAlert
