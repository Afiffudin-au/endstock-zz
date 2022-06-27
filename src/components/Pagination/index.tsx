import { Flex, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import React from 'react'
interface PaginationOptions {
  page: number
  data: any
  handleNext: any
}
function Pagination({ page, data, handleNext }: Required<PaginationOptions>) {
  return (
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
  )
}

export default Pagination
