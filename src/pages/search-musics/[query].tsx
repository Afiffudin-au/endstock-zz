import { Box } from '@chakra-ui/layout'
import axios from 'axios'
import React from 'react'
import { token } from '../../api-token/token'
import CardMusic from '../../components/CardMusic/CardMusic'
import Search from '../../components/Search/Search'
import SearchAlert from '../../components/SearchAlert/SearchAlert'
interface DataMusicItems {
  id: string
  title: string
  description: string
  assets: {
    clean_audio: {
      file_size: number
    }
    preview_mp3: {
      file_size: number
      url: string
    }
    waveform: {
      file_size: number
      url: string
    }
  }
}
function SearchMusic({ data }: { data: any }) {
  return (
    <Box p='2'>
      <Search titleProps='Musics' />
      {data.data?.length === 0 && <SearchAlert />}

      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      {data?.data?.map((item: DataMusicItems, index: number) => (
        <CardMusic
          key={item.id}
          title={item.title}
          description={item.description}
          thumbnail={item.assets.waveform.url}
          id={item.id}
        />
      ))}
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
    url: `https://api.shutterstock.com/v2/audio/search`,
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
