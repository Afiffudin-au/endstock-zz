import axios from 'axios'
import { useState } from 'react'
import { token } from '../../api-token/token'

export const useGetSearchVideoSuggestion = ()=>{
  const [loadingVideoSuggestion,setLoadingVideoSuggestion] = useState<boolean>(false)
  const [dataVideoSuggestion, setDataVideoSuggestion] = useState<any>([])
  const getSearchVideoSuggestion = (query:string) =>{
    setLoadingVideoSuggestion(true)
    axios({
      method: 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
      url : 'https://api.shutterstock.com/v2/images/search/suggestions',
      params : {
        query : query,
        limit : 10
      }
    }).then(res=>{
      setLoadingVideoSuggestion(false)
      setDataVideoSuggestion(res.data)
    }).catch(err=>{
      setLoadingVideoSuggestion(false)
    })  
  }
  return{
    getSearchVideoSuggestion,
    dataVideoSuggestion,
    loadingVideoSuggestion
  }
}