import callAPI from '..'
import { api_config } from '../../../api-config'
import { SearchMusicConfig } from '../../../data-types'
const url = `${api_config.BASE_URL}/${api_config.API_VERSION}/audio/search`
export const getSearchMusic = async (params:Partial<SearchMusicConfig>)=>{
  const res = await callAPI({
    url,
    method: 'GET',
    params
  })
  return res
}