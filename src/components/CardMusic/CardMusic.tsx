import { Image } from '@chakra-ui/image'
import { Box, Flex } from '@chakra-ui/layout'
import React, { useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export interface CardMusicOptions {
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
  const [imageLoad, setImageLoad] = useState<boolean>(false)
  const [display, setDisplay] = useState<string>('none')
  const handleImageLoad = (e: any) => {
    setDisplay('block')
    setImageLoad(true)
  }
  return (
    <Box
      boxShadow='md'
      m='2'
      p='2'
      overflow='hidden'
      cursor='pointer'
      transition='ease-in-out'
      _hover={{ transform: 'scale(1.01)', transitionDuration: '.1s' }}>
      <Flex alignItems='center'>
        <Box mr='2'>
          {!imageLoad && (
            <SkeletonTheme color='#cfd8dc' highlightColor='#eceff1'>
              <Skeleton
                count={1}
                style={{
                  height: '40px',
                  width: '50px',
                }}
              />
            </SkeletonTheme>
          )}

          <Image
            minWidth='30px'
            maxWidth='50px'
            style={{ display: display }}
            src={thumbnail}
            alt={title}
            onLoad={handleImageLoad}
          />
        </Box>

        <Box overflow='hidden'>
          <Box
            mb='2'
            as='p'
            lineHeight='tight'
            isTruncated
            color='blue.500'
            fontWeight='bold'
            fontSize='13px'>
            {title}
          </Box>
          <Box
            as='p'
            lineHeight='tight'
            isTruncated
            color='blue.700'
            fontWeight='normal'
            fontSize='15px'>
            {description}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
            exercitationem nam alias quasi officiis eaque. Explicabo itaque
            facere atque suscipit, quo doloribus obcaecati sunt fugiat quos
            error sint ad corrupti.
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default CardMusic
