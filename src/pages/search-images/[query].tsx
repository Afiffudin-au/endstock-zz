import { useDisclosure } from '@chakra-ui/hooks'
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Box,
  SimpleGrid,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Checkbox,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Card, { CardOptions } from '../../components/Card'
import Search from '../../components/Search'
import {
  imageType,
  sortData,
  peopleAges,
} from '../../dataFilter/Image/dataFilter'
import DatePicker from '../../components/DatePicker'
import FilterAction from '../../components/FilterAction'
import PageFilter from '../../components/PageFilter'
import RefreshButton from '../../components/RefreshButton'
import SearchAlert from '../../components/SearchAlert'
import Pagination from '../../components/Pagination'
import Head from 'next/head'
import { getSearchImage } from '../../api-calls/server-side/image'
import { SearchImageConfig } from '../../data-types'
import Error from 'next/error'
interface DataItems {
  description: string
  id: number | string
  assets: {
    huge_thumb: {
      height: string
      url: string
      width: string
    }
  }
}

function SearchImage({
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
  const [typeImage, setTypeImage] = useState<string>('photo')
  const [peopleAge, setPeopleAge] = useState<string>('teenagers')
  const [perPage, setPerPage] = useState<number>(20)
  const [page, setPage] = useState<number>(parseInt(pageProp) || 1)
  const [checkBox, setCheckBox] = useState<boolean>(true)
  const [erorrPerPage, setErorrPerPage] = useState<boolean>(false)
  const [erorrPage, setErorrPage] = useState<boolean>(false)
  const [startDate, setStartDate] = useState(new Date())
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const handleNext = (page: any) => {
    setPage(page)
    const path = router.pathname
    const query = router.query
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
    query.typeImage = typeImage
    query.safeSearch = checkBox
    query.page = page
    query.perPage = perPage
    query.peopleAge = peopleAge
    router.push({
      pathname: path,
      query,
    })
  }
  const handleResetFilter = () => {
    setTypeSort('popular')
    setTypeImage('photo')
    setPeopleAge('teenagers')
    setPerPage(20)
    setPage(1)
    setCheckBox(true)
    setErorrPage(false)
    setErorrPage(false)
    router.push(`/search-images/${router.query.query}`, undefined, {
      shallow: true,
    })
  }
  const handleRefresh = () => {
    setPage(1)
    router.push(`/search-images/${router.query.query}`)
  }
  return (
    <Box p='2'>
      <Head>
        <meta
          name='description'
          content='Search millions of pictures, videos, musics, audios. Get high inspiration added every day.'
        />
      </Head>
      <Search titleProps='Images' />
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
              <Flex mb='2' alignItems='center'>
                <Box flex='1'>
                  <Menu size='sm'>
                    <MenuButton
                      width='100%'
                      size='sm'
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
                  onChange={() => setCheckBox(!checkBox)}
                  ml='2'
                  isChecked={checkBox}>
                  Safe Search
                </Checkbox>
              </Flex>
              <Box mb='2'>
                <Menu size='sm'>
                  <MenuButton
                    width='100%'
                    size='sm'
                    as={Button}
                    rightIcon={<ChevronDownIcon />}>
                    {typeImage}
                  </MenuButton>
                  <MenuList>
                    {imageType.map((item) => (
                      <MenuItem onClick={() => setTypeImage(item)} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
              <Box mb='2'>
                <Menu size='sm'>
                  <MenuButton
                    width='100%'
                    size='sm'
                    as={Button}
                    rightIcon={<ChevronDownIcon />}>
                    {peopleAge}
                  </MenuButton>
                  <MenuList>
                    {peopleAges.map((item) => (
                      <MenuItem onClick={() => setPeopleAge(item)} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
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
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 4 }} spacing='10px'>
        {data?.data?.map((item: DataItems, index: number) => (
          <MemoizedChildComponent
            key={item.id}
            description={item.description}
            id={item.id}
            image={item?.assets?.huge_thumb.url}
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
function ChildComponent({ description, image, id }: Required<CardOptions>) {
  return <Card description={description} image={image} id={id} />
}
const MemoizedChildComponent = React.memo(ChildComponent)

export default SearchImage
export const getServerSideProps = async (context: any) => {
  const params: Partial<SearchImageConfig> = {
    query: context.params.query,
    page: context.query.page || 1,
    sort: context.query.sort || 'popular',
    safe: context.query.safeSearch,
    per_page: context.query.perPage,
    image_type: context.query.typeImage,
    people_age: context.query.peopleAge,
  }
  const res = await getSearchImage(params)
  const errorCode = res.error ? res.statusCode : false
  return {
    props: {
      data: res.data,
      pageProp: params.page,
      errorCode,
    },
  }
}
