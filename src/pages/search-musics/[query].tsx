import { Box } from '@chakra-ui/layout'
import axios from 'axios'
import React from 'react'
import { token } from '../../api-token/token'
import Search from '../../components/Search/Search'

function SearchMusic({ data }: { data: any }) {
  return (
    <Box p='2'>
      <Search titleProps='Musics' />
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Box>
  )
}
export default SearchMusic
export const getServerSideProps = async (context: any) => {
  const query = context.params.query
  const params = {
    query: query,
  }
  const data = await axios({
    method: 'get',
    headers: {
      Authorization: `Basic ${token}`,
    },
    url: `https://api.shutterstock.com/v2/images/search`,
    params,
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
  console.log(data)
  return {
    props: {
      data,
    },
  }
}
