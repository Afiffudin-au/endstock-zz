import { api_config } from './../../api-config/index';
import { useState } from 'react'
import { headers_auth_client } from '../../api-config'
const useSuggestion = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [keywords, setKeywords] = useState([])
  const getSuggest = (controller:any, query:string, userText:string) => {
    if (userText === '') {
      setKeywords([])
      return
    }
    if (keywords.length > 0) {
      setKeywords([])
    }
    setIsLoading(true)
    fetch(
      `${api_config.BASE_URL}/${api_config.API_VERSION}/images/search/suggestions?query=${query}`,
      {
        signal: controller.signal,
        method: 'GET',
        headers: headers_auth_client
      }
    )
      .then((res:any) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setIsLoading(false)
        const unique:any = [...new Set(data.data)]
        setKeywords(unique)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error('Error', err)
      })
  }
  return {
    isLoading,
    keywords,
    getSuggest,
  }
}
export default useSuggestion
