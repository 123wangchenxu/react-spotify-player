import { useFormState } from 'react-dom'
import './index.less'
import { useEffect, useState } from 'react'
import { getAlbum } from '../../api/albums'
import { get80Songs, getEverydayRecommend, getKoreaListSong, getKoreaSongs, getPlayListTag} from '../../api/browse'
import { Link } from 'react-router-dom'
export default function Browse() {
  const headers=['Everyday Recommend','1980s','Korea hot Song']
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
        else if(active==='1980s')
        {
          setEverydaySong([])
          const datas=await get80Songs()
          setEverydaySong(datas.data.data.song_list)
        }
        else
        {
          setEverydaySong([])
          const datas=await getKoreaSongs()
          const allsongs=await getKoreaListSong(datas.data.data.special_list[6].global_collection_id)
          const koreaSongs=allsongs.data.data.songs
          koreaSongs.forEach(element => {
            element.filename=element.remark
            element.sizable_cover=element.cover
          });
          setEverydaySong(koreaSongs)
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
          everydaysong.map((item,index)=>{
            return <div className='songs-display-item' key={index}>
              <Link to={`/listen/${item.hash}`}>
                <img src={item.sizable_cover.replace('{size}','200')}/>
              </Link>
              <div className='song-display-detail'>
                {item.filename}
              </div>
            </div>
          })
      }
      </div>
    </div>
  </div>
  </>
}
