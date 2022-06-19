import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdPhotoCamera } from 'react-icons/md/index'
import { BsMusicNoteBeamed, BsFillCameraVideoFill } from 'react-icons/bs/index'
import { useRouter } from 'next/router'
import styles from './Search.module.css'
import AutoSuggest from '../AutoSuggest'
function Search({
  titleProps,
}: {
  titleProps: 'Images' | 'Videos' | 'Musics'
}) {
  const [title, setTitle] = useState(titleProps)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState<any>('')
  const handleSearch = (e: any) => {
    e.preventDefault()
    const userText = searchQuery.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      return
    }
    if (title === 'Images') {
      router.push(`/search-images/${searchQuery}`)
    } else if (title === 'Videos') {
      router.push(`/search-videos/${searchQuery}`)
    } else if (title === 'Musics') {
      router.push(`/search-musics/${searchQuery}`)
    }
  }
  return (
    <Box
      borderWidth='1px'
      borderColor='gray.400'
      borderRadius='5px'
      marginBottom='15px'
      marginTop='1'>
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
                Videos
              </MenuItem>
              <MenuItem
                icon={<BsMusicNoteBeamed />}
                onClick={() => setTitle('Musics')}>
                Musics
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box width='100%' height={'40px'} position={'relative'}>
          <form className={styles.formSearch}>
            <input
              className={styles.formSearchInput}
              placeholder='type to search'
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className={styles.formSearchBtn} onClick={handleSearch}>
              <span className={styles.btnIcon}>
                <SearchIcon />
              </span>
            </button>
          </form>
          <AutoSuggest searchQuery={searchQuery} title={title} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Search
