import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, SimpleGrid } from '@chakra-ui/layout'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Checkbox,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CardVideo, { CardVideoOptions } from '../../components/CardVideo'
import DatePicker from '../../components/DatePicker'
import FilterAction from '../../components/FilterAction'
import PageFilter from '../../components/PageFilter'
import Search from '../../components/Search'
import { sortData } from '../../dataFilter/Video/dataFilter'
import RefreshButton from '../../components/RefreshButton'
import moment from 'moment'
import SearchAlert from '../../components/SearchAlert'
import Pagination from '../../components/Pagination'
import Head from 'next/head'
import { getSearchVideo } from '../../api-calls/server-side/video'
import { SearchVideoConfig } from '../../data-types'
import Error from 'next/error'
interface DataVideoItems {
  id: string
  description: string
  assets: {
    preview_jpg: {
      url: string
    }
    preview_webm: {
      url: string
    }
  }
}
function SearchVideo({
  data,
  pageProp,
  errorCode,
}: {
  data: any
  pageProp: any
  errorCode: number
}) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  const [typeSort, setTypeSort] = useState<string>('popular')
  const [erorrPage, setErorrPage] = useState<boolean>(false)
  const [erorrPerPage, setErorrPerPage] = useState<boolean>(false)
  const [perPage, setPerPage] = useState<number>(20)
  const [page, setPage] = useState<number>(parseInt(pageProp || 1) || 1)
  const [safeSearch, setSafeSearch] = useState<boolean>(true)
  const [startDate, setStartDate] = useState<any>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    query.sort = typeSort
    query.safeSearch = safeSearch
    query.perPage = perPage
    query.page = page
    if (startDate) {
      query.addedDate = moment(startDate).format('YYYY-MM-DD')
    } else {
      delete query.addedDate
    }

    router.push({
      pathname: path,
      query,
    })
  }
  const handleResetFilter = () => {
    setTypeSort('popular')
    setSafeSearch(true)
    setErorrPage(false)
    setErorrPerPage(false)
    setPerPage(20)
    setPage(1)
    setStartDate('')
    router.push(`/search-videos/${router.query.query}`, undefined, {
      shallow: true,
    })
  }
  const handleRefresh = () => {
    setPage(1)
    router.push(`/search-videos/${router.query.query}`)
  }
  return (
    <Box p={2}>
      <Head>
        <meta
          name='description'
          content='Search millions of pictures, videos, musics, audios. Get high inspiration added every day.'
        />
      </Head>
      <Search titleProps='Videos' />
      {data.data?.length === 0 && <SearchAlert />}

      <Box mb='2' display='flex' justifyContent='space-between'>
        <Button size='sm' colorScheme='blue' onClick={onOpen}>
          Filter Configuration
        </Button>
        <Box>
          <RefreshButton handleRefresh={handleRefresh} />
        </Box>
      </Box>
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
              <Flex alignItems='center' mb='2'>
                <Box flex='1'>
                  <Menu>
                    <MenuButton
                      size='sm'
                      width='100%'
                      as={Button}
                      rightIcon={<ChevronDownIcon />}>
                      {typeSort}
                    </MenuButton>
                    <MenuList>
                      {sortData.map((item) => (
                        <MenuItem onClick={() => setTypeSort(item)} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
                <Checkbox
                  onChange={() => setSafeSearch(!safeSearch)}
                  ml='2'
                  isChecked={safeSearch}>
                  Safe Search
                </Checkbox>
              </Flex>
              <PageFilter
                setPage={setPage}
                setPerPage={setPerPage}
                erorrPage={erorrPage}
                erorrPerPage={erorrPerPage}
              />

              <Box mb='2'>
                <DatePicker startDate={startDate} setStartDate={setStartDate} />
              </Box>

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
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 3 }} spacing={5}>
        {data?.data?.map((item: DataVideoItems, index: number) => (
          <MemoizedChildComponent
            id={item.id}
            description={item.description}
            key={item.assets.preview_webm.url}
            url={item.assets.preview_webm.url}
            thumbnail={item.assets.preview_jpg.url}
          />
        ))}
      </SimpleGrid>
      <Pagination
        data={data}
        page={parseInt(pageProp)}
        handleNext={handleNext}
      />
    </Box>
  )
}
function ChildComponent({
  description,
  url,
  thumbnail,
  id,
}: Required<CardVideoOptions>) {
  return (
    <CardVideo
      id={id}
      description={description}
      url={url}
      thumbnail={thumbnail}
    />
  )
}
const MemoizedChildComponent = React.memo(ChildComponent)
export default SearchVideo
export const getServerSideProps = async (context: any) => {
  const params: Partial<SearchVideoConfig> = {
    query: context.params.query,
    page: context.query.page || 1,
    per_page: context.query.perPage,
    sort: context.query.sort,
    keyword_safe_search: context.query.safeSearch,
    added_date: context.query.addedDate,
  }
  if (params['added_date'] === 'Invalid date') {
    delete params['added_date']
  }
  const res = await getSearchVideo(params)
  const errorCode = res.error ? res.statusCode : false
  return {
    props: {
      data: res.data,
      pageProp: params.page,
      errorCode,
    },
  }
}
