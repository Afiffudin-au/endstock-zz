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
import { useGetMusicDetail } from '../../custom-hooks/useGetMusicDetail/useGetMusicDetail'

function ModalDetailMusic({
  id,
  isOpen,
  onClose,
}: {
  id: string | number
  isOpen: boolean
  onClose: () => void
}) {
  const { dataMusicDetail, getMusicDetail, isLoading } = useGetMusicDetail()
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab rerum
              mollitia molestias ipsa reiciendis error consequuntur fugit
              aliquid repudiandae, nihil placeat obcaecati possimus temporibus
              architecto nostrum assumenda tenetur exercitationem iste.
            </p>
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
