import { useState } from 'react'
import { getMusicDetailAPI } from '../../api-calls/client-side/music'
const useGetMusicDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataMusicDetail, setDataMusicDetail] = useState<any>({
    title : '',
    description : '',
    assets : {
      preview_mp3 : {
        url : ''
      }
    }
  })
  const getMusicDetail = async (id: string) => {
    setIsLoading(true)
    const res = await getMusicDetailAPI(id)
    if(res.error){
      setIsLoading(false)
      alert(res.message)
    }else{
      setIsLoading(false)
      setDataMusicDetail(res.data)
    }
  }
  return {
    isLoading,
    dataMusicDetail,
    getMusicDetail,
  }
}
export default useGetMusicDetail
