import axios from 'axios'
import { useState } from 'react'
import { token } from '../../api-token/token'

export const useGetImageDetail = ()=>{
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [dataImageDetail,setDataImageDetail] = useState<any>()
  const getImageDetail = (id:Required<string|number>)=>{
    setIsLoading(true)
    axios({
      method : 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
      url : `https://api.shutterstock.com/v2/images/${id}`
    }).then(res=>{
      setDataImageDetail(res.data)
      setIsLoading(false)
    }).catch(err=>{
      alert(err)
      setIsLoading(false)
    })
  }
  return{
    getImageDetail,
    dataImageDetail,
    isLoading
  }
}