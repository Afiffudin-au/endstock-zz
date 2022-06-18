import callAPI from '..'
import { api_config } from '../../../api-config'
const url = `${api_config.BASE_URL}/${api_config.API_VERSION}/audio`
export const getMusicDetailAPI = async (id:string) => {
  const res = await callAPI({
    url: `${url}/${id}`,
    method: 'GET',
  })
  return res
}