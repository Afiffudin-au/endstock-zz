import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout'
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
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { token } from '../../api-token/token'
import CardVideo, {
  CardVideoOptions,
} from '../../components/CardVideo/CardVideo'
import DatePicker from '../../components/DatePicker/DatePicker'
import FilterAction from '../../components/FilterAction/FilterAction'
import PageFilter from '../../components/PageFilter/PageFilter'
import Search from '../../components/Search/Search'
import { sortData } from '../../dataFilter/Video/dataFilter'
import RefreshButton from '../../components/RefreshButton/RefreshButton'
import moment from 'moment'
import SearchAlert from '../../components/SearchAlert/SearchAlert'
import Pagenation from '../../components/Pagenation/Pagenation'
import Head from 'next/head'
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
function SearchVideo({ data, pageProp }: { data: any; pageProp: any }) {
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
          content='Search millions of pictures, videos, music. Get high inspiration added every day.'
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
      <Pagenation
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
  const query = context.params.query
  const pageProp = context.query.page || 1
  const sort = context.query.sort
  const safeSearch = context.query.safeSearch
  const perPage = context.query.perPage
  const addedDate = context.query.addedDate
  const params: any = {
    query: query,
    page: pageProp,
    per_page: perPage,
    sort: sort,
    keyword_safe_search: safeSearch,
    added_date: addedDate,
  }
  if (params['added_date'] === 'Invalid date') {
    delete params['added_date']
  }
  const data = await axios({
    method: 'get',
    headers: {
      Authorization: `Basic ${token}`,
    },
    url: `https://api.shutterstock.com/v2/videos/search`,
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
