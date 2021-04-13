import axios from 'axios'
import { token } from '../../api-token/token'

export const useGetVideoDetail = (videoId: string | number) => {
  axios({
    method: 'get',
    headers: {
      Authorization: `Basic ${token}`,
    },
    url: 'https://api.shutterstock.com/v2/videos',
    params: {
      id: videoId,
    },
  })
}
