import { useFormState } from 'react-dom'
import './index.less'
import { useEffect, useState } from 'react'
import { getAlbum } from '../../api/albums'
import { getEverydayRecommend} from '../../api/browse'
export default function Browse() {
  const headers=['Everyday Recommend','NEW RELEASES','FEATURED']
  const [active,setActive]=useState('Everyday Recommend')
  const [album,setAlbum]=useState('')
  const[everydaysong,setEverydaySong]=useState([])
  const singer_images=[]
  useEffect(()=>{
      (async ()=>{
        if(active==='Everyday Recommend')
        {
          const datas=await getEverydayRecommend()
          setEverydaySong(datas.data.data.song_list)
        }
      })()
  },[active])
  return <>
  <div className="section-title">
    <div>
      <h3 className="header-title">Browse</h3>
      <div className='browse-headers'>
          {
            headers.map((item,index)=>{
              return <p key={index} onClick={()=>{
                setActive(item)
              }} className={active===item&&'active'}>{item}</p>
            })
          }
      </div>
      <div className="songs-display">
        {
          active==='Everyday Recommend'?everydaysong.map((item,index)=>{
            return <div className='songs-display-item'>
              <img src={item.sizable_cover.replace('{size}','200')}/>
              <div className='song-display-detail'>
                {item.filename}
              </div>
            </div>
          }):<div>haha</div>
      }
      </div>
    </div>
  </div>
  </>
}
