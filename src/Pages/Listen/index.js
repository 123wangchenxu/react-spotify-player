import './index.less'
import { useParams } from 'react-router-dom'
import { getSongDetail,SearchLyrics,getLyrics,getListenSong } from '../../api/listen'
import { getSingerImage } from '../../api/browse'
import { useEffect, useState,useRef} from 'react'
import Footer from '../../components/Footer'
import React from 'react'
import colority from 'colority'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useFooterStore } from '../../App'
import { message } from 'antd'
export default function Listen()
{
  const [messageApi, contextHolder] = message.useMessage();
  const [singData, setSingData] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const { id } = useParams();
  const [lyrics, setLyrics] = useState([]);
  const lyricsContainerRef = useRef(); // 歌词容器的引用
  const activeLineRef = useRef(); // 当前活动歌词行的引用
  const [activeLyrics,setActiveLyrics]=useState('')
  const {
    musicUrl,
    isPlaying,
    volume,
    currentTime,
    timeStart,
    timeEnd,
    setTimeStart,
    setTimeEnd,
    setVolume,
    setIsPlaying,
    setMusicUrl,
    setCurrentTime,
  } = useFooterStore(); 
  useEffect(() => {
    const error = (content='找不到该歌曲的url，您还不是会员！') => {
      messageApi.open({
        type: "error",
        content: content,
      });
    };
    (async () => {
      if(musicUrl==='')
      {
          let datas = await getSongDetail(id);
          setSingData(datas.data.data[0]);
          let imgData = await getSingerImage(id);
          setImgUrl(
            imgData.data.data[0][0].sizable_avatar.replace("{size}", "400")
          );
          let imageURL = imgData.data.data[0][0].sizable_avatar.replace(
            "{size}",
            "400"
          );
          colority(
            imageURL,
            {
              skip: 30000,
            },
          (colors) => {
            let gradientColors = colors
              .map((c) => c.replace("rgb", "rgba").replace(")", ",0.5)"))
              .join(", ");
            document.body.style.background = `linear-gradient(90deg, ${gradientColors}), black`;
            document.body.style.backgroundBlendMode = "screen";
            if(colors.length>2)
            {
                document.documentElement.style.setProperty(
                "--main-gradient",
                `${colors[2]}`
              );
            }
          }
        );
        let lyricdata = await SearchLyrics(id);
        let getLyric = await getLyrics(
          lyricdata.data.candidates[0].id,
          lyricdata.data.candidates[0].accesskey
        );
        let musicData=await getListenSong(id)
        setLyrics(getLyric.data.decodeContent.split("\n").slice(10));
        setTimeEnd(
          getLyric.data.decodeContent
            .split("\n")
            .slice(10)
            .slice(-2)[0]
            .slice(1, 6)
        );
        if (musicData.data.url) {
          setMusicUrl(musicData.data.url);
        } else {
          //这里为了方便页面处理，如果没有音乐url,弹出错误提示
          error();
        }
      }
      if (isPlaying && musicUrl !== "") {
        const currentSeconds = currentTime;
        // 找到最接近 currentSeconds 的歌词行索引
        const index = lyrics.findIndex((line, i) => {
          if (!line || line.length < 9) return false;
          const [mm, ss] = line.slice(1, 9).split(":");
          const lineSeconds = parseInt(mm) * 60 + parseFloat(ss);
          const nextLine = lyrics[i + 1];
          let nextSeconds = Infinity;
          if (nextLine && nextLine.length >= 9) {
            const [nmm, nss] = nextLine.slice(1, 9).split(":");
            nextSeconds = parseInt(nmm) * 60 + parseFloat(nss);
          }
          // 如果 currentTime 在这一行和下一行之间，就选这一行
          return currentSeconds >= lineSeconds && currentSeconds <= nextSeconds;
        });
        if (index !== -1) {
          setActiveLyrics(index);
          if (lyricsContainerRef.current) {
            lyricsContainerRef.current.scrollTo({
              top: index * 30,
              behavior: "smooth",
            });
          }
        }
      }
    })();
  }, [isPlaying,currentTime]);
  return (
    <>
    {contextHolder}
    <div className="listen">
      <div className="listen-detail">
        <div className="listen-img">
          <img src={imgUrl} crossOrigin="anonymous" />
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
          </div>
        )}
      </div>
    </div>
    </>
  );
}