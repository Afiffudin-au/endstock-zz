import callAPI from '..'
import { api_config } from '../../../api-config'
import { SearchVideoConfig } from '../../../data-types'
const url = `${api_config.BASE_URL}/${api_config.API_VERSION}/videos/search`
export const getSearchVideo = async (params:Partial<SearchVideoConfig>)=>{
  const res = await callAPI({
    url,
    method: 'GET',
    params
  })
  return res
}