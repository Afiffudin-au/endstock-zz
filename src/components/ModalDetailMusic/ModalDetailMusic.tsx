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
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import useGetMusicDetail from '../../custom-hooks/useGetMusicDetail/useGetMusicDetail'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
interface DataMusicDetail {
  title: string
  description: string
  assets: {
    preview_mp3: {
      url: string
    }
  }
}
function ModalDetailMusic({
  id,
  isOpen,
  onClose,
}: {
  id: string | number
  isOpen: boolean
  onClose: () => void
}) {
  const {
    dataMusicDetail,
    getMusicDetail,
    isLoading,
  }: {
    dataMusicDetail: DataMusicDetail
    getMusicDetail: any
    isLoading: boolean
  } = useGetMusicDetail()
  useEffect(() => {
    getMusicDetail(id)
  }, [])
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
          {isLoading && (
            <Progress size='xs' isIndeterminate colorScheme='blue' />
          )}
          <ModalHeader>{dataMusicDetail?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{dataMusicDetail?.description}</p>
            <Link
              textColor='blue.500'
              fontSize='lg'
              href={dataMusicDetail?.assets?.preview_mp3?.url}
              isExternal>
              Preview <ExternalLinkIcon mx='2px' />
            </Link>
          </ModalBody>

          <ModalFooter>
            <Button size='sm' colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalDetailMusic
