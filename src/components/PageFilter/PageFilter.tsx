import { Flex, Input, Text } from '@chakra-ui/react'
import React from 'react'
interface PageFilterItems {
  setPage: any
  setPerPage: any
  erorrPerPage: boolean
  erorrPage: boolean
}
function PageFilter({
  setPage,
  setPerPage,
  erorrPerPage,
  erorrPage,
}: Required<PageFilterItems>) {
  return (
    <Flex alignItems='center' mb='2' justifyContent='stretch'>
      <Flex flexDirection='column' flex='0.5' marginRight='10px'>
        {erorrPerPage && (
          <Text color='red.500' fontSize='13px'>
            Maximum Per Page: 500
          </Text>
        )}
        <Input
          type='number'
          variant='flushed'
          placeholder='Per Page'
          min={1}
          max={500}
          onChange={(e) => setPerPage(parseInt(e.target.value) || 1)}
        />
      </Flex>

      <Flex flexDirection='column' flex='0.5'>
        {erorrPage && (
          <Text color='red.500' fontSize='13px'>
            Maximum Page: 100
          </Text>
        )}

        <Input
          type='number'
          variant='flushed'
          placeholder='Page'
          min={1}
          max={100}
          onChange={(e) => setPage(parseInt(e.target.value) || 1)}
        />
      </Flex>
    </Flex>
  )
}

export default PageFilter
