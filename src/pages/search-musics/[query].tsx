import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/layout'
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { token } from '../../api-token/token'
import CardMusic, {
  CardMusicOptions,
} from '../../components/CardMusic/CardMusic'
import FilterAction from '../../components/FilterAction/FilterAction'
import PageFilter from '../../components/PageFilter/PageFilter'
import Pagenation from '../../components/Pagenation/Pagenation'
import RefreshButton from '../../components/RefreshButton/RefreshButton'
import Search from '../../components/Search/Search'
import SearchAlert from '../../components/SearchAlert/SearchAlert'
import { sortTypes, sortOrderTypes } from '../../dataFilter/Music/dataFilter'
interface DataMusicItems {
  id: string
  title: string
  description: string
  assets: {
    clean_audio: {
      file_size: number
    }
    preview_mp3: {
      file_size: number
      url: string
    }
    waveform: {
      file_size: number
      url: string
    }
  }
}
function SearchMusic({ data, pageProp }: { data: any; pageProp: any }) {
  const [sortType, setSortType] = useState<string>('sort')
  const [sortOrderType, setSortOrderType] = useState<string>('desc')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [page, setPage] = useState<number>(parseInt(pageProp || 1) || 1)
  const [perPage, setPerPage] = useState<number>(20)
  const [erorrPerPage, setErorrPerPage] = useState<boolean>(false)
  const [erorrPage, setErorrPage] = useState<boolean>(false)
  const router = useRouter()
  const handleNext = (page: number) => {
    setPage(page)
    const path = router.pathname
    const query: any = router.query
    query.page = page
    router.push({
      pathname: path,
      query,
    })
  }
  const handleApplyFilter = () => {
    if (perPage > 500) {
      setErorrPerPage(true)
      return
    }
    if (erorrPerPage) {
      setErorrPerPage(false)
    }

    if (page > 100) {
      setErorrPage(true)
      return
    }
    if (erorrPage) {
      setErorrPage(false)
    }
    const path = router.pathname
    const query: any = router.query
    query.page = page
    query.perPage = perPage
    query.sortType = sortType
    query.sortOrderType = sortOrderType
    if (sortType === 'sort') {
      delete query.sortType
    }
    router.push({
      pathname: path,
      query,
    })
  }
  const resetState = () => {
    setSortType('Sort')
    setSortOrderType('desc')
    setPage(1)
    setPerPage(20)
    setErorrPerPage(false)
    setErorrPage(false)
  }
  const handleResetFilter = () => {
    resetState()
    router.push(`/search-musics/${router.query.query}`, undefined, {
      shallow: true,
    })
  }
  const handleRefresh = () => {
    setPage(1)
    router.push(`/search-musics/${router.query.query}`)
  }
  return (
    <Box p='2'>
      <Head>
        <meta
          name='description'
          content='Search millions of pictures, videos, musics, audios,. Get high inspiration added every day.'
        />
      </Head>
      <Search titleProps='Musics' />
      {data.data?.length === 0 && <SearchAlert />}
      <Flex alignItems='center' justifyContent='space-between'>
        <Button colorScheme='blue' size='sm' onClick={onOpen}>
          Filter Configuration
        </Button>
        <Box>
          <RefreshButton handleRefresh={handleRefresh} />
        </Box>
      </Flex>

      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>
              <IconButton
                size='sm'
                onClick={onClose}
                colorScheme='blue'
                aria-label='Exit'
                icon={<CloseIcon />}
              />
            </DrawerHeader>
            <DrawerBody>
              <Flex mb='2'>
                <Box mr='2' flex='0.5'>
                  <Menu size='sm'>
                    <MenuButton
                      width='100%'
                      size='sm'
                      as={Button}
                      rightIcon={<ChevronDownIcon />}>
                      {sortType}
                    </MenuButton>
                    <MenuList>
                      {sortTypes.map((item) => (
                        <MenuItem onClick={() => setSortType(item)} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
                <Box flex='0.5'>
                  <Menu size='sm'>
                    <MenuButton
                      width='100%'
                      size='sm'
                      as={Button}
                      rightIcon={<ChevronDownIcon />}>
                      {sortOrderType}
                    </MenuButton>
                    <MenuList>
                      {sortOrderTypes.map((item) => (
                        <MenuItem
                          onClick={() => setSortOrderType(item)}
                          key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
              <PageFilter
                setPage={setPage}
                setPerPage={setPerPage}
                erorrPage={erorrPage}
                erorrPerPage={erorrPerPage}
              />
              <Box>
                <FilterAction
                  handleApplyFilter={handleApplyFilter}
                  handleResetFilter={handleResetFilter}
                />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      {data?.data?.map((item: DataMusicItems, index: number) => (
        <MemoizedChildComponent
          key={item.id}
          title={item.title}
          description={item.description}
          thumbnail={item.assets.waveform.url}
          id={item.id}
        />
      ))}
      <Pagenation
        data={data}
        page={parseInt(pageProp)}
        handleNext={handleNext}
      />
    </Box>
  )
}
function ChildComponent({
  title,
  description,
  thumbnail,
  id,
}: Required<CardMusicOptions>) {
  return (
    <CardMusic
      title={title}
      description={description}
      thumbnail={thumbnail}
      id={id}
    />
  )
}
const MemoizedChildComponent = React.memo(ChildComponent)
export default SearchMusic
export const getServerSideProps = async (context: any) => {
  const query = context.params.query
  const pageProp = context.query.page || 1
  const perPage = context.query.perPage
  const sortType = context.query.sortType
  const sortOrderType = context.query.sortOrderType
  const params = {
    query: query,
    page: pageProp,
    per_page: perPage,
    sort: sortType,
    sort_order: sortOrderType,
  }
  const data = await axios({
    method: 'get',
    headers: {
      Authorization: `Basic ${token}`,
    },
    url: `https://api.shutterstock.com/v2/audio/search`,
    params,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
  return {
    props: {
      data,
      pageProp,
    },
  }
}
