import axios from 'axios'
import { useState } from 'react'
import { token } from '../../api-token/token'

export const useGetSearchImageSuggestion = () => {
  const [loadingImageSuggestion, setLoadingImageSuggestion] = useState<boolean>(false)
  const [dataImageSuggestion, setDataImageSuggestion] = useState<any>([])
  const getSearchImageSuggestion = (query:string) => {
    if(query === '') return
    setLoadingImageSuggestion(true)
    axios({
      method: 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
      url: 'https://api.shutterstock.com/v2/images/search/suggestions',
      params: { query: query,limit : 10 },
    })
      .then((res) => {
        setLoadingImageSuggestion(false)
        setDataImageSuggestion(res.data)
      })
      .catch((err) => {
        setLoadingImageSuggestion(false)
      })
  }
  return {
    getSearchImageSuggestion,
    loadingImageSuggestion,
    dataImageSuggestion
  }
}
