import { CloseIcon } from '@chakra-ui/icons'
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
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { token } from '../../api-token/token'
import CardMusic, {
  CardMusicOptions,
} from '../../components/CardMusic/CardMusic'
import RefreshButton from '../../components/RefreshButton/RefreshButton'
import Search from '../../components/Search/Search'
import SearchAlert from '../../components/SearchAlert/SearchAlert'
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
function SearchMusic({ data }: { data: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const handleRefresh = () => {
    router.push(`/search-musics/${router.query.query}`)
  }
  return (
    <Box p='2'>
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
            <DrawerBody></DrawerBody>
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
  const params = {
    query: query,
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
  console.log(data)
  return {
    props: {
      data,
    },
  }
}
