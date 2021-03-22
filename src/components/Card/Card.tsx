import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import React, { useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export interface CardOptions {
  description: string
  image: string
  id: string | number
}
function Card({ description, image, id }: Required<CardOptions>) {
  const [imageLoad, setImageLoad] = useState<boolean>(false)
  const [display, setDisplay] = useState<string>('none')
  const handleImageLoad = () => {
    setDisplay('block')
    setImageLoad(true)
  }
  return (
    <Box
      maxW='sm'
      // borderColor='gray.500'
      // borderWidth='1px'
      borderRadius='lg'
      boxShadow='rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
      overflow='hidden'>
      {!imageLoad && (
        <SkeletonTheme color='#cfd8dc' highlightColor='#eceff1'>
          <Skeleton count={1} height={'300px'} width={'100%'} />
        </SkeletonTheme>
      )}
      <Image
        style={{ display: display }}
        objectFit='fill'
        cursor='pointer'
        transition='ease-in-out'
        transitionDuration='.3s'
        _hover={{ transform: 'scale(1.06)' }}
        borderTopLeftRadius='lg'
        borderTopRightRadius='lg'
        src={image}
        alt={image}
        onLoad={handleImageLoad}
      />

      <Box p={5}>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated>
          {description}
        </Box>
      </Box>
    </Box>
  )
}

export default Card
