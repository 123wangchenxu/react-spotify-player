import './index.less'
import { useParams } from 'react-router-dom'
import { getSongDetail,SearchLyrics,getLyrics,getListenSong } from '../../api/listen'
import { getSingerImage } from '../../api/browse'
import { useEffect, useState,useRef} from 'react'
import Footer from '../../components/Footer'
import React from 'react'
export default function Listen()
{
  const [singData, setSingData] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const { id } = useParams();
  const [lyrics, setLyrics] = useState([]);
  const lyricsContainerRef = useRef(); // 歌词容器的引用
  const activeLineRef = useRef(); // 当前活动歌词行的引用
  const [scrollButton,setScrollButton]=useState(false)
  const [activeLyrics,setActiveLyrics]=useState('')
  const [colorCount,setColorCount]=useState(0)
  const [time_start,setTimeStart]=useState("00:00")
  const [musicUrl,setMusicUrl]=useState('')
  const FooterMemo = React.memo(Footer, (prevProps, nextProps) => {
    // 比较除了 lyrics 之外的所有 props
    return (
      prevProps.colorCount === nextProps.colorCount
    );
  });
  useEffect(() => {
    (async () => {
      const datas = await getSongDetail(id);
      setSingData(datas.data.data[0]);
      const imgData = await getSingerImage(id);
      setImgUrl(
        imgData.data.data[0][0].sizable_avatar.replace("{size}", "400")
      );
      const lyricdata = await SearchLyrics(id);
      const getLyric = await getLyrics(
        lyricdata.data.candidates[0].id,
        lyricdata.data.candidates[0].accesskey
      );
      const musicData=await getListenSong(id)
      if(musicData.data.url)
      {
        setMusicUrl(musicData.data.url)
      }
      /*
      拿到数据之前，需要登录，设计登录界面
      */
      setLyrics(getLyric.data.decodeContent.split("\n").slice(10));
      if(scrollButton)
      {
        const time_end = lyrics.slice(-2)[0].slice(1, 6).split(':');
        const seconds=parseInt(time_end[0])*60+parseInt(time_end[1])
        let count=0;
        let currentIndex=1
        let intervalId=setInterval(()=>{
          count+=1;
          if(count===seconds*100)
          {
            clearInterval(intervalId)
          }
          let current_time = lyrics.slice(currentIndex)[0].slice(1, 9).split(":");
          let current_seconds =parseInt(current_time[0]) * 6000 + parseInt(current_time[1]*100);
          if(current_seconds===count)
          {
            setActiveLyrics(currentIndex-1)
            lyricsContainerRef.current.scrollTo({
              top: (currentIndex-1)*30,
              behavior: 'smooth'
            })
            currentIndex+=1
          }
        },10)
      }
    })();
  }, [scrollButton]);
  return (
    <div className="listen">
      <div className="listen-detail">
        <div className="listen-img">
          <img src={imgUrl} />
        </div>
        {lyrics[0] && (
          <div className="listen-lyrics">
            <div className="lyrics-title">
              {lyrics[0].replace("\\r", "").slice(10)}
            </div>
            <div className="lyrics-detail" ref={lyricsContainerRef}>
              {lyrics.slice(1).map((item, index) => {
                return (
                  <p
                    key={index}
                    ref={activeLyrics === index ? activeLineRef : null}
                    className={activeLyrics === index && "active"}
                  >
                    {item.replace("\\r", "").slice(10)}
                  </p>
                );
              })}
            </div>
            <FooterMemo
              timeStart={time_start}
              setTimeStart={setTimeStart}
              time_end={
                lyrics.length ? lyrics.slice(-2)[0].slice(1, 6) : "00:00"
              }
              btn_click={() => setScrollButton(true)}
              setColorCount={setColorCount}
              colorCount={colorCount}
              musicUrl={musicUrl}
            />
          </div>
        )}
      </div>
    </div>
  );
}