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
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Input,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { token } from '../../api-token/token'
import Card, { CardOptions } from '../../components/Card/Card'
import Search from '../../components/Search/Search'
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
const sortData = ['newest', 'popular', 'relevance', 'random']
const imageType = ['photo', 'illustration', 'vector']
function SearcResult({ data, pageProp }: { data: any; pageProp: any }) {
  const [typeSort, setTypeSort] = useState<string>('popular')
  const [typeImage, setTypeImage] = useState<string>('photo')
  const [perPage, setPerPage] = useState<number>(20)
  const [page, setPage] = useState<number>(parseInt(pageProp))
  const [checkBox, setCheckBox] = useState<boolean>(true)
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
    const path = router.pathname
    const query: any = router.query
    query.sort = typeSort
    query.typeImage = typeImage
    query.safeSearch = checkBox
    query.page = page
    query.perPage = perPage
    router.push({
      pathname: path,
      query,
    })
  }
  return (
    <Box p='2'>
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
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
              <Flex mb='2' alignItems='center'>
                <Menu size='sm'>
                  <MenuButton
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
              <Flex alignItems='center' mb='2'>
                <Input
                  marginRight='10px'
                  type='number'
                  variant='flushed'
                  placeholder='Per Page'
                  min={1}
                  max={500}
                  onChange={(e) => setPerPage(parseInt(e.target.value))}
                />
                <Input
                  type='number'
                  variant='flushed'
                  placeholder='Page'
                  min={1}
                  max={100}
                  onChange={(e) => setPage(parseInt(e.target.value))}
                />
              </Flex>
              <Button onClick={handleApplyFilter} colorScheme='blue' size='sm'>
                Apply Filter
              </Button>
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
      <Flex alignItems='center' mt='3' p='5' justifyContent='flex-end'>
        {page === 1 ? (
          <>
            <Text>{page}</Text>
            <Button
              onClick={() => handleNext(page + 1)}
              ml='2'
              variant='outline'
              size='sm'
              colorScheme='blue'>
              Next
            </Button>
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
            <Button
              onClick={() => handleNext(page + 1)}
              ml='2'
              variant='outline'
              size='sm'
              colorScheme='blue'>
              Next
            </Button>
          </>
        )}
      </Flex>
    </Box>
  )
}
function ChildComponent({ description, image, id }: Required<CardOptions>) {
  return <Card description={description} image={image} id={id} />
}
function compare(prevProps: any, nextProps: any) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}
//! react.memo -> kalau true component tidak di-render , kalau false di re-render
const MemoizedChildComponent = React.memo(ChildComponent)

export default SearcResult
export const getServerSideProps = async (context: any) => {
  const query = context.params.query
  const pageProp = context.query.page || 1
  const sort = context.query.sort || 'popular'
  const typeImage = context.query.typeImage
  const safeSearch = context.query.safeSearch
  const perPage = context.query.perPage
  const data = await axios({
    method: 'get',
    headers: {
      Authorization: `Basic ${token}`,
    },
    url: `https://api.shutterstock.com/v2/images/search`,
    params: {
      query: query,
      page: pageProp,
      sort: sort,
      safe: safeSearch,
      per_page: perPage,
      image_type: typeImage,
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
