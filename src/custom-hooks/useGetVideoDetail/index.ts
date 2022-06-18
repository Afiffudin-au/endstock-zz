import { useState } from 'react'
import { getVideoDetailAPI } from '../../api-calls/client-side/video'
const useGetVideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState<any>({
    keywords : [],
    description : '',
    assets : {
      preview_jpg : {
        url : ''
      },
      preview_webm : {
        url : ''
      }
    }
  })
  const [loading, setLoading] = useState<boolean>(false)
  const getVideoDetail = async (videoId: string) => {
    setLoading(true)
    const res = await getVideoDetailAPI(videoId)
    if(res.error){
      setLoading(false)
      alert(res.message)
    }else{
      setLoading(false)
      setVideoDetail(res.data)
    }
  }
  return {
    videoDetail,
    loading,
    getVideoDetail,
  }
}
export default useGetVideoDetail
