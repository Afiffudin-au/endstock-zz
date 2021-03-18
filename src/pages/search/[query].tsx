import { useDisclosure } from '@chakra-ui/hooks'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Box,
  Grid,
  SimpleGrid,
  IconButton,
  Text,
  Flex,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
function SearcResult({ data }: { data: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [page, setPage] = useState<any>(1)
  const router = useRouter()
  const handleNext = (page: any) => {
    setPage(page)
    const path = router.pathname
    const query = router.query
    query.pageNumber = page
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
              <p>type here</p>
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
  const page = context.query.pageNumber || 1
  const data = await axios({
    method: 'get',
    headers: {
      Authorization: `Basic ${token}`,
    },
    url: `https://api.shutterstock.com/v2/images/search?page=${page}`,
    params: { query: query },
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
    },
  }
}
