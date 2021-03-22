import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdPhotoCamera } from 'react-icons/md/index'
import { BsMusicNoteBeamed, BsFillCameraVideoFill } from 'react-icons/bs/index'
import Suggestion from './Suggestion'
function Search() {
  const [title, setTitle] = useState<string>('Images')
  return (
    <Box
      borderWidth='1px'
      borderColor='gray.400'
      borderRadius='5px'
      marginBottom='15px'>
      <Flex>
        <Box borderRight='1px solid #a0aec0'>
          <Menu>
            <MenuButton
              borderRadius='0'
              _focus={{ outline: '0' }}
              _active={{ background: 'transparent' }}
              background='transparent'
              as={Button}
              rightIcon={<ChevronDownIcon />}>
              {title}
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<MdPhotoCamera />}
                onClick={() => setTitle('Images')}>
                Images
              </MenuItem>
              <MenuItem
                icon={<BsFillCameraVideoFill />}
                onClick={() => setTitle('Videos')}>
                Video
              </MenuItem>
              <MenuItem
                icon={<BsMusicNoteBeamed />}
                onClick={() => setTitle('Music')}>
                Music
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Suggestion title={title} />
      </Flex>
    </Box>
  )
}

export default Search
