import { useDisclosure } from '@chakra-ui/hooks'
import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import React, { useState } from 'react'
import ModalDetailImage from '../ModalDetailImage/ModalDetailImage'
export interface CardOptions {
  description: string
  image: string
  id: string | number
}
function Card({ description, image, id }: Required<CardOptions>) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [imageLoad, setImageLoad] = useState<boolean>(false)
  const [display, setDisplay] = useState<string>('none')
  const handleImageLoad = (e: any) => {
    setDisplay('block')
    setImageLoad(true)
  }
  return (
    <>
      <Box
        onClick={onOpen}
        maxW='sm'
        borderRadius='lg'
        boxShadow='rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
        overflow='hidden'>
        <Box
          position='relative'
          cursor='pointer'
          transition='ease-in-out'
          transitionDuration='.3s'
          _hover={{ transform: 'scale(1.06)' }}>
          <Box display='block' overflow='hidden' paddingBottom='100%'>
            <Image
              position='absolute'
              left='0'
              top='0'
              bottom='0'
              right='0'
              style={{ display: display }}
              objectFit='fill'
              borderTopLeftRadius='lg'
              borderTopRightRadius='lg'
              src={image}
              alt={image}
              onLoad={handleImageLoad}
            />
          </Box>
          <Box position='absolute' top='0' right='0' left='0' bottom='0'></Box>
        </Box>
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
      {isOpen && <ModalDetailImage isOpen={isOpen} onClose={onClose} id={id} />}
    </>
  )
}

export default Card
