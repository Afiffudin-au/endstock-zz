import axios from 'axios'
import { useState } from 'react'
import { token } from '../../api-token/token'

export const useGetSearchImageSuggestion = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataImageSuggestion, setDataImageSuggestion] = useState<any>([])
  const getSearchImageSuggestion = (query:string) => {
    if(query === '') return
    setLoading(true)
    axios({
      method: 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
      url: 'https://api.shutterstock.com/v2/images/search/suggestions',
      params: { query: query,limit : 10 },
    })
      .then((res) => {
        setLoading(false)
        setDataImageSuggestion(res.data)
      })
      .catch((err) => {
        setLoading(false)
      })
  }
  return {
    getSearchImageSuggestion,
    loading,
    dataImageSuggestion
  }
}
