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
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useGetImageDetail } from '../../custom-hooks/useGetImageDetail/useGetImageDetail'
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
  const assets = dataImageDetail?.assets
  useEffect(() => {
    getImageDetail(id)
  }, [])
  useEffect(() => {
    if (dataImageDetail) {
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
  }
  return (
    <Modal
      scrollBehavior='inside'
      isCentered
      size='6xl'
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {isLoading && <Progress size='xs' colorScheme='blue' isIndeterminate />}
        <ModalHeader>Image Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {!isLoading && (
            <Flex>
              <Box mr='2'>
                <Image
                  src={dataImageDetail?.assets.preview.url}
                  alt={`${dataImageDetail?.description} ${dataImageDetail?.assets.preview.url}`}
                />
              </Box>
              <Box>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {sizeImage}
                  </MenuButton>
                  <MenuList>
                    {previewItems?.map((item: PreviewItems, index: number) => (
                      <MenuItem
                        onClick={() =>
                          handleChangeUrlPreview(item.url, item.resolution)
                        }
                        key={index}>
                        {item.resolution}
                      </MenuItem>
                    ))}
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
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button size='sm' colorScheme='blue' mr={3}>
            Save
          </Button>
          <Button size='sm' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalDetailImage
