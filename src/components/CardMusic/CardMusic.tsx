import { Image } from '@chakra-ui/image'
import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'
interface CardMusicOptions {
  title: string
  description: string
  thumbnail: string
  id: string
}
function CardMusic({
  title,
  description,
  thumbnail,
  id,
}: Required<CardMusicOptions>) {
  return (
    <Box
      boxShadow='md'
      m='2'
      p='2'
      cursor='pointer'
      transition='ease-in-out'
      _hover={{ transform: 'scale(1.01)', transitionDuration: '.1s' }}>
      <Flex alignItems='center'>
        <Box mr='2'>
          <Image
            display='block'
            minWidth='30px'
            maxWidth='50px'
            src={thumbnail}
            alt={title}
          />
        </Box>
        <Box>
          <Box
            mb='2'
            as='p'
            isTruncated
            color='blue.500'
            fontWeight='bold'
            fontSize='13px'>
            {title}
          </Box>
          <Box
            as='p'
            isTruncated
            color='blue.700'
            fontWeight='normal'
            fontSize='15px'>
            {description}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default CardMusic
