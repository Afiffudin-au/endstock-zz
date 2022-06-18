import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Progress,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdPhotoCamera } from 'react-icons/md/index'
import { BsMusicNoteBeamed, BsFillCameraVideoFill } from 'react-icons/bs/index'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './Search.module.css'
import useSuggestion from '../../custom-hooks/useSuggestion'
function Search({
  titleProps,
}: {
  titleProps: 'Images' | 'Videos' | 'Musics'
}) {
  const [title, setTitle] = useState(titleProps)
  const router = useRouter()
  const { getSuggest, isLoading, keywords } = useSuggestion()
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (e: any) => {
    e.preventDefault()
    const userText = searchQuery.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      return
    }
    if (title === 'Images') {
      router.push(`/search-images/${searchQuery}`)
    }
    if (title === 'Videos') {
      router.push(`/search-videos/${searchQuery}`)
    }
    if (title === 'Musics') {
      router.push(`/search-musics/${searchQuery}`)
    }
  }
  useEffect(() => {
    const userText = searchQuery?.replace(/^\s+/, '').replace(/\s+$/, '')
    let controller = new AbortController()
    getSuggest(controller, searchQuery, userText)
    return () => {
      controller.abort()
    }
  }, [searchQuery])
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
        <Box width='100%'>
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
          {isLoading && <Progress size='xs' isIndeterminate />}
          {keywords?.length > 0 && (
            <article className={styles.suggest}>
              {keywords?.slice(0, 10).map((item) => (
                <Link
                  key={item}
                  href={
                    title === 'Images'
                      ? `/search-images/${item}`
                      : title === 'Videos'
                      ? `/search-videos/${item}`
                      : title === 'Musics'
                      ? `/search-musics/${item}`
                      : ''
                  }>
                  <a>
                    <p className={styles.suggestItem}>{item}</p>
                  </a>
                </Link>
              ))}
            </article>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default Search
