import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { token } from '../../api-token/token'
import Search from '../../components/Search/Search'

function SearchVideo({ data }: any) {
  const [placement, setPlacement] = React.useState('left')
  const { isOpen, onOpen, onClose } = useDisclosure()
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
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
}

export default SearchVideo
export const getServerSideProps = async (context: any) => {
  const query = context.params.query
  const data = await axios({
    method: 'get',
    headers: {
      Authorization: `Basic ${token}`,
    },
    url: `https://api.shutterstock.com/v2/videos/search`,
    params: {
      query: query,
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
    },
  }
}
