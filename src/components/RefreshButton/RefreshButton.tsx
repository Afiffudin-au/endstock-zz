import { Tooltip, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiRefreshCcw } from 'react-icons/fi'

function RefreshButton({ handleRefresh }: { handleRefresh: () => void }) {
  return (
    <Tooltip label='Refresh This Page' aria-label='A tooltip'>
      <IconButton
        onClick={handleRefresh}
        size='sm'
        colorScheme='blue'
        aria-label='Refresh'
        icon={<FiRefreshCcw />}
      />
    </Tooltip>
  )
}

export default RefreshButton
