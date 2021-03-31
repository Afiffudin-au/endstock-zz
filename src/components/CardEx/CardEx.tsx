import { Box } from '@chakra-ui/layout'
import React from 'react'

function CardEx() {
  return (
    <Box position='relative' backgroundColor='red.600'>
      <Box display='block' overflow='hidden' paddingBottom='100%'>
        <img
          style={{ position: 'absolute', left: '0', top: '0', height: '100%' }}
          src='https://source.unsplash.com/random'
          alt=''
        />
      </Box>
      <Box position='absolute' top='0' right='0' left='0' bottom='0'></Box>
    </Box>
  )
}

export default CardEx
