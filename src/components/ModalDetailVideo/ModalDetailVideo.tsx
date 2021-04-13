import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Progress,
  Box,
  Flex,
  Badge,
  Stack,
  Tooltip,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useGetVideoDetail } from '../../custom-hooks/useGetVideoDetail/useGetVideoDetail'
import CardVideoDetail from '../CardVideoDetail/CardVideoDetail'
interface DetailVideoItems {
  id: string
  description: string
  keywords: any
  assets: {
    preview_jpg: {
      url: string
    }
    preview_webm: {
      url: string
    }
  }
}
function ModalDetailVideo({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean
  onClose: () => void
  id: string | number | undefined
}) {
  const {
    getVideoDetail,
    loading,
    videoDetail,
  }: {
    getVideoDetail: any
    loading: boolean
    videoDetail: any
  } = useGetVideoDetail()
  const router = useRouter()
  useEffect(() => {
    getVideoDetail(id)
  }, [])
  const selectVideoDetail: DetailVideoItems = videoDetail[0]
  const handleSearchByKeyword = (keyword: string) => {
    onClose()
    router.push(`/search-videos/${keyword}`)
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
        isCentered
        size={'full'}
        closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          {loading && <Progress size='xs' isIndeterminate colorScheme='blue' />}
          <ModalHeader>Video Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb='2'>
              <Flex flexWrap='wrap'>
                {selectVideoDetail?.keywords
                  ?.slice(0, 10)
                  ?.map((item: any, index: number) => (
                    <Box
                      m='1'
                      cursor='pointer'
                      key={index}
                      onClick={() => handleSearchByKeyword(item)}>
                      <Tooltip
                        hasArrow
                        label={`Search For ${item}`}
                        aria-label='A keyword for search'>
                        <Badge
                          fontWeight='normal'
                          variant='solid'
                          p='1'
                          colorScheme='teal'>
                          {item}
                        </Badge>
                      </Tooltip>
                    </Box>
                  ))}
              </Flex>
            </Box>
            {!loading && (
              <Flex alignItems='center' flexDirection='column'>
                <Box w={{ sm: '100%', md: '2xl' }} mb='2'>
                  <CardVideoDetail
                    thumbnail={selectVideoDetail?.assets.preview_jpg.url}
                    url={selectVideoDetail?.assets.preview_webm.url}
                  />
                </Box>
                <Box as='p' fontSize='15px' color='blue.500'>
                  {selectVideoDetail?.description}
                </Box>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' size='sm' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalDetailVideo
