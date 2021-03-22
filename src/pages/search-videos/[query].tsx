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
  Input,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { token } from '../../api-token/token'
import CardVideo from '../../components/CardVideo/CardVideo'
import Search from '../../components/Search/Search'
import { peopleAges, sortData } from './dataFilter'
interface DataVideoItems {
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
  const [peopleAge, setPeopleAge] = useState<string>('teenagers')
  const [typeSort, setTypeSort] = useState<string>('popular')
  const [erorrPage, setErorrPage] = useState<boolean>(false)
  const [erorrPerPage, setErorrPerPage] = useState<boolean>(false)
  const [perPage, setPerPage] = useState<number>(20)
  const [page, setPage] = useState<number>(parseInt(pageProp || 1) || 1)
  const [safeSearch, setSafeSearch] = useState<boolean>(true)
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
    query.peopleAge = peopleAge
    query.perPage = perPage
    query.page = page
    console.log(query)
    router.push({
      pathname: path,
      query,
    })
  }
  const handleResetFilter = () => {
    setPeopleAge('teenagers')
    setTypeSort('popular')
    setSafeSearch(true)
    setErorrPage(false)
    setErorrPerPage(false)
    setPerPage(20)
    setPage(1)
    router.push(`/search-videos/${router.query.query}`, undefined, {
      shallow: true,
    })
  }
  console.log(data)
  return (
    <Box p={2}>
      <Search />
      <Box mb='2'>
        <Button size='sm' colorScheme='blue' onClick={onOpen}>
          Filter Configuration
        </Button>
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
              <Flex alignItems='center' mb='2' justifyContent='stretch'>
                <Flex flexDirection='column' flex='0.5' marginRight='10px'>
                  {erorrPerPage && (
                    <Text color='red.500' fontSize='13px'>
                      Maximum Per Page: 500
                    </Text>
                  )}
                  <Input
                    type='number'
                    variant='flushed'
                    placeholder='Per Page'
                    min={1}
                    max={500}
                    onChange={(e) => setPerPage(parseInt(e.target.value) || 1)}
                  />
                </Flex>

                <Flex flexDirection='column' flex='0.5'>
                  {erorrPage && (
                    <Text color='red.500' fontSize='13px'>
                      Maximum Page: 100
                    </Text>
                  )}

                  <Input
                    type='number'
                    variant='flushed'
                    placeholder='Page'
                    min={1}
                    max={100}
                    onChange={(e) => setPage(parseInt(e.target.value) || 1)}
                  />
                </Flex>
              </Flex>
              <Button
                mb='2'
                width='100%'
                onClick={handleApplyFilter}
                colorScheme='blue'
                size='sm'>
                Apply Filter
              </Button>
              <Button
                onClick={handleResetFilter}
                width='100%'
                colorScheme='red'
                size='sm'>
                Reset Filter
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
        spacing={5}
        // autoRows={{ sm: '200px', md: '250px', lg: '300px' }}
      >
        {data?.data?.map((item: DataVideoItems, index: number) => (
          <CardVideo
            key={item.assets.preview_webm.url}
            url={item.assets.preview_webm.url}
            thumbnail={item.assets.preview_jpg.url}
          />
        ))}
      </SimpleGrid>
      <Flex alignItems='center' mt='3' p='5' justifyContent='flex-end'>
        {page === 1 ? (
          <>
            <Text>{page}</Text>
            {data?.total_count > 0 && (
              <Button
                onClick={() => handleNext(page + 1)}
                ml='2'
                variant='outline'
                size='sm'
                colorScheme='blue'>
                Next
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              onClick={() => handleNext(page - 1)}
              mr='2'
              variant='outline'
              size='sm'
              colorScheme='blue'>
              Previous
            </Button>
            <Text>{page}</Text>
            {data?.total_count > 0 && (
              <Button
                onClick={() => handleNext(page + 1)}
                ml='2'
                variant='outline'
                size='sm'
                colorScheme='blue'>
                Next
              </Button>
            )}
          </>
        )}
      </Flex>
    </Box>
  )
}

export default SearchVideo
export const getServerSideProps = async (context: any) => {
  const query = context.params.query
  const pageProp = context.query.page || 1
  const sort = context.query.sort
  const safeSearch = context.query.safeSearch
  const peopleAge = context.query.peopleAge
  const perPage = context.query.perPage
  const data = await axios({
    method: 'get',
    headers: {
      Authorization: `Basic ${token}`,
    },
    url: `https://api.shutterstock.com/v2/videos/search`,
    params: {
      query: query,
      page: pageProp,
      per_page: perPage,
      sort: sort,
      keyword_safe_search: safeSearch,
      people_age: peopleAge,
    },
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
