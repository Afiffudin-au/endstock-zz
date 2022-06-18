import axios, { AxiosRequestConfig } from 'axios'
import { headers_auth_client } from '../../api-config'
const callAPI = async ({ url, method, data, }:AxiosRequestConfig)=>{
  const res = await axios({
    method: method,
    url: url,
    data :data,
    headers : headers_auth_client
  }).catch((err) => err.response)
  if(res === undefined){
    return {
      error : true,
      message: `Unknown error`,
      data : null,
    }
  }
  if(res?.status === 404){
    return {
      error : true,
      message: `${res.status} ${res.statusText}`,
      data : null,
    }
  }
  if (res.status > 300) {
    return {
      error: true,
      message: res.data.message,
      data: null,
    }
  }
  const successRes = {
    error: false,
    message: res.data.message || 'Success',
    data: res.data
  }
  return successRes
}
export default callAPI