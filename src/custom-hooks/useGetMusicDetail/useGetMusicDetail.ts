import axios from 'axios'
import { useState } from 'react'
import { token } from '../../api-token/token'

export const useGetMusicDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataMusicDetail, setDataMusicDetail] = useState<any>([])
  const getMusicDetail = (id: string | number) => {
    setIsLoading(true)
    axios({
      method: 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
      url: 'https://api.shutterstock.com/v2/audio',
      params: {
        id: id,
      },
    })
      .then((res) => {
        setIsLoading(false)
        setDataMusicDetail(res.data.data[0])
      })
      .catch((err) => {
        setIsLoading(false)
        alert(err)
      })
  }
  return {
    isLoading,
    dataMusicDetail,
    getMusicDetail,
  }
}
