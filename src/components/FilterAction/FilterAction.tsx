import { Button } from '@chakra-ui/react'
import React from 'react'
interface FilterActionItems {
  handleApplyFilter: () => void
  handleResetFilter: () => void
}
function FilterAction({
  handleApplyFilter,
  handleResetFilter,
}: Required<FilterActionItems>) {
  return (
    <>
      <Button
        mb='2'
        width='100%'
        onClick={handleApplyFilter}
        colorScheme='blue'
        size='sm'>
        Apply Filter
      </Button>
      <Button
        onClick={handleResetFilter}
        width='100%'
        colorScheme='red'
        size='sm'>
        Reset Filter
      </Button>
    </>
  )
}

export default FilterAction
