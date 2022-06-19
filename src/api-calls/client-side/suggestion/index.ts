import callAPI from '..'
import { api_config } from '../../../api-config'
export const getSuggestionAPI = async (query:string,controller:any,  type: 'images' | 'videos') => {
  const res = await callAPI({
    url: `${api_config.BASE_URL}/${api_config.API_VERSION}/${type}/search/suggestions?query=${query}`,
    method: 'GET',
    controller
  })
  return res
}