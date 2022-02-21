import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/layout'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Progress,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Alert,
  AlertIcon,
  AlertTitle,
  Fade,
  Badge,
  Tooltip,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import useGetImageDetail from '../../custom-hooks/useGetImageDetail/useGetImageDetail'
import { ImageDetailItems } from './Interfaces'
let previewItems: any = []
interface PreviewItems {
  url: string
  resolution: string
}
function ModalDetailImage({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean
  onClose: () => void
  id: string | number
}) {
  const {
    getImageDetail,
    isLoading,
    dataImageDetail,
  }: {
    dataImageDetail: ImageDetailItems
    getImageDetail: any
    isLoading: boolean
  } = useGetImageDetail()
  const [sizeImage, setSizeImage] = useState<string>('Preview')
  const [imageSizeError, setImageSizeError] = useState<boolean>(false)
  const [preveiwImageUrl, setPreveiwImageUrl] = useState<string>('')
  const [imageLoad, setImageLoad] = useState<boolean>(false)
  const [display, setDisplay] = useState<string>('none')
  const assets = dataImageDetail?.assets
  const router = useRouter()
  useEffect(() => {
    getImageDetail(id)
  }, [])
  useEffect(() => {
    if (dataImageDetail) {
      setPreveiwImageUrl(dataImageDetail?.assets.preview.url)
      previewItems = []
      for (const key in assets) {
        const select: any = assets
        previewItems.push({
          resolution: `${select[key].height} x ${select[key].width}`,
          url: select[key].url,
        })
      }
    }
  }, [dataImageDetail])
  const handleChangeUrlPreview = (url: string, resolution: string) => {
    if (url === undefined) {
      setImageSizeError(true)
      return
    }
    if (imageSizeError) {
      if (url !== undefined) {
        setImageSizeError(false)
      }
    }
    setSizeImage(resolution)
    setPreveiwImageUrl(url)
  }

  const handleImageLoad = (e: any) => {
    setImageLoad(true)
    setDisplay('block')
  }
  const handleSearchByKeyword = (keyword: string) => {
    onClose()
    router.push(`/search-images/${keyword}`)
  }
  return (
    <Modal
      scrollBehavior='inside'
      isCentered
      size={'full'}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {isLoading && <Progress size='xs' colorScheme='blue' isIndeterminate />}
        <ModalHeader>Image Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box mb='2'>
            <Flex flexWrap='wrap'>
              {dataImageDetail?.keywords
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
          {!isLoading && (
            <Flex flexDirection={{ sm: 'column', md: 'row' }}>
              <Box mr='2'>
                {!imageLoad && (
                  <SkeletonTheme color='#8ad6f6' highlightColor='#eceff1'>
                    <Skeleton
                      count={1}
                      style={{ width: '200px', height: '200px' }}
                    />
                  </SkeletonTheme>
                )}
                <Image
                  style={{ display: display }}
                  onLoad={handleImageLoad}
                  src={preveiwImageUrl}
                  alt={`${dataImageDetail?.description} ${preveiwImageUrl}`}
                />
              </Box>
              <Box>
                <Box>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {sizeImage}
                    </MenuButton>
                    <MenuList>
                      {previewItems?.map(
                        (item: PreviewItems, index: number) => (
                          <MenuItem
                            onClick={() =>
                              handleChangeUrlPreview(item.url, item.resolution)
                            }
                            key={index}>
                            {item.resolution}
                          </MenuItem>
                        )
                      )}
                    </MenuList>
                  </Menu>
                  {imageSizeError && (
                    <Fade in={imageSizeError}>
                      <Alert mt='2' status='error' p='2'>
                        <AlertIcon />
                        <AlertTitle mr={2} fontWeight='normal' fontSize='15px'>
                          Sorry,Image Size is not available.Please select other
                          size
                        </AlertTitle>
                      </Alert>
                    </Fade>
                  )}
                </Box>

                <Box as='p' fontSize='15px' color='blue.500'>
                  {dataImageDetail?.description}
                </Box>
              </Box>
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button size='sm' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalDetailImage
