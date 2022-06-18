import { useState } from 'react'
import { getImageDetailAPI } from '../../api-calls/client-side/image'
const useGetImageDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataImageDetail, setDataImageDetail] = useState<any>({
    assets : {
      preview: {
        url : ''
      }
    },
    keywords : [],
    description : ''
  })
  const getImageDetail = async (id: Required<string>) => {
    setIsLoading(true)
    const res = await getImageDetailAPI(id)
    if(res.error){
      setIsLoading(false)
      alert(res.message)
    }else{
      setIsLoading(false)
      setDataImageDetail(res.data)
    }
  }
  return {
    getImageDetail,
    dataImageDetail,
    isLoading,
  }
}
export default useGetImageDetail
