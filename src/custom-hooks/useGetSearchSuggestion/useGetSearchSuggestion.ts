import axios from 'axios'
import { useState } from 'react'
import { token } from '../../api-token/token'

export const useGetSearchSuggestion = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataSuggestion, setDataSuggestion] = useState<any>([])
  const getSearchSuggestion = (query:string) => {
    if(query === '') return
    setLoading(true)
    axios({
      method: 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
      url: 'https://api.shutterstock.com/v2/images/search/suggestions',
      params: { query: query },
    })
      .then((res) => {
        setLoading(false)
        setDataSuggestion(res.data)
      })
      .catch((err) => {
        setLoading(false)
      })
  }
  return {
    getSearchSuggestion,
    loading,
    dataSuggestion
  }
}
