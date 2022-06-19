import axios, { AxiosRequestConfig } from 'axios'
import {  header_auth_server } from '../../api-config'
const callAPI = async ({ url, method, data, params }:AxiosRequestConfig)=>{
  const res = await axios({
    method: method,
    url: url,
    data :data,
    headers : header_auth_server,
    params : params
  }).catch((err) => err.response)
  if(res === undefined || res.data === undefined){
    return {
      error : true,
      message: `Unknown Error`,
      data : null,
      statusCode : 500
    }
  }
  if(res.status === 404){
    return {
      error : true,
      message: `${res.status} ${res.statusText}`,
      data : null,
      statusCode : res.status
    }
  }
  if (res.status > 300) {
    return {
      error: true,
      message: res.data.message,
      data: null,
      statusCode :  res.status
    }
  }
  const successRes = {
    error: false,
    message: 'Success',
    data: res.data,
    statusCode : res.status
  }
  return successRes
}
export default callAPI