import './index.less'
import { useParams } from 'react-router-dom'
import { getSongDetail,SearchLyrics,getLyrics } from '../../api/listen'
import { getSingerImage } from '../../api/browse'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
export default function Listen()
{
    const [singData,setSingData]=useState({})
    const [imgUrl,setImgUrl]=useState('')
    const {id}=useParams()
    const [lyrics,setLyrics]=useState([])
    useEffect(()=>{
        (async()=>{
            const datas=await getSongDetail(id)
            setSingData(datas.data.data[0])
            const imgData=await getSingerImage(id)
            setImgUrl(
              imgData.data.data[0][0].sizable_avatar.replace("{size}", "400")
            );
            const lyricdata=await SearchLyrics(id)
            const getLyric = await getLyrics(
              lyricdata.data.candidates[0].id,
              lyricdata.data.candidates[0].accesskey
            );
            setLyrics(getLyric.data.decodeContent.split('\n').slice(10))
            console.log(lyrics)
        })()
    },[])
    return (
      <div className="listen">
        <div className="listen-detail">
          <div className="listen-img">
            <img src={imgUrl} />
          </div>
          <div className="listen-lyrics">
            <div className="lyrics-title">
              {lyrics[0].replace("\\r", "").slice(10)}
            </div>
            <div className='lyrics-detail'>
                {lyrics.slice(1).map((item, index) => {
                return <p key={index}>{item.replace("\\r", "").slice(10)}</p>;
                })}
            </div>
            <Footer time_start={} time_end={}/>
          </div>
        </div>
      </div>
    );
}