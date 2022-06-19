import { useState } from 'react'
import { getSuggestionAPI } from '../../api-calls/client-side/suggestion'
const useSuggestion = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [keywords, setKeywords] = useState([])
  const getSuggest = async (
    controller: any,
    query: string,
    userText: string,
    type: 'images' | 'videos'
  ) => {
    if (userText === '') {
      setKeywords([])
      return
    }
    if (keywords.length > 0) {
      setKeywords([])
    }
    setIsLoading(true)
    const res = await getSuggestionAPI(query, controller,type)
    if (res.error) {
      setIsLoading(false)
      // alert(res.message)
    } else {
      setIsLoading(false)
      const unique: any = [...new Set(res.data.data)]
      setKeywords(unique)
    }
  }
  const reset = () => setKeywords([])
  return {
    isLoading,
    keywords,
    getSuggest,
    reset
  }
}
export default useSuggestion
