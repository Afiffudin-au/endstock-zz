import callAPI from '..'
import { api_config } from '../../../api-config'
import { SearchImageConfig } from '../../../data-types'
const url = `${api_config.BASE_URL}/${api_config.API_VERSION}/images/search`
export const getSearchImage = async (params:Partial<SearchImageConfig>)=>{
  const res = await callAPI({
    url,
    method: 'GET',
    params
  })
  return res
}