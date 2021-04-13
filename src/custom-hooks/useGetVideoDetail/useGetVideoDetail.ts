import axios from 'axios'
import { useState } from 'react'
import { token } from '../../api-token/token'

export const useGetVideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const getVideoDetail = (videoId: string | number) => {
    setLoading(true)
    axios({
      method: 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
      url: 'https://api.shutterstock.com/v2/videos',
      params: {
        id: videoId,
        view: 'full',
      },
    })
      .then((res) => {
        setLoading(false)
        console.log(res.data.data)
        setVideoDetail(res.data.data)
      })
      .catch((err) => {
        setLoading(false)
        alert(err)
      })
  }
  return {
    videoDetail,
    loading,
    getVideoDetail,
  }
}
