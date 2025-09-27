import { useMemo, useRef,useState,useEffect } from 'react'
import './index.less'
import { useFooterStore } from '../../App'
import { message } from 'antd';
export default function Footer()
{
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
    isActive,
    setIsActive,
    audio,
    setAudio,
  } = useFooterStore();
    const splitSeconds=timeEnd.split(':')
    const seconds=parseInt(splitSeconds[0]*60)+parseInt(splitSeconds[1])
    const [messageApi, contextHolder] = message.useMessage();
    const error = (message) => {
      messageApi.open({
        type: "error",
        content: message,
      });
      setIsPlaying(false)
    };
    useEffect(()=>{
      console.log(window.location.href);
      if (audio !== null && audio.src!==''&&audio.src!==window.location.href) {
        if(audio.src!==musicUrl)
        {
          audio.pause(); // 先暂停播放
          audio.src = ""; // 清空资源
          try {
            if (typeof updateTime === 'function') {
              audio.removeEventListener("timeupdate", updateTime);
            }
          } catch (e) {
            console.log('移除事件监听器失败:', e);
          }
        }
      }
      const newAudio = new Audio(musicUrl);
      setAudio(newAudio);
      const updateTime = () => {
        setCurrentTime(newAudio.currentTime);
        let timeRecord = [];
        if (Math.floor(parseInt(newAudio.currentTime) / 60) < 10)
          timeRecord.push("0" + Math.floor(parseInt(newAudio.currentTime) / 60));
        else timeRecord.push(Math.floor(parseInt(newAudio.currentTime) / 60).toString());
        if (parseInt(newAudio.currentTime) % 60 < 10) timeRecord.push("0" + (parseInt(newAudio.currentTime % 60)));
        else timeRecord.push(parseInt((newAudio.currentTime % 60)).toString());
        setTimeStart(timeRecord.join(":"));
      }
      newAudio.addEventListener("timeupdate", updateTime);
      return () => {
        newAudio.removeEventListener("timeupdate", updateTime);
      };
    },[musicUrl])
    const progressStart=(state)=>{
      setIsPlaying(state)
            if(musicUrl==='')
            {
              error('没有音乐url,无法播放')
              return
            }
            if(state && musicUrl!=='')
            {
              audio.src=musicUrl
              audio.currentTime=currentTime
              audio.play()
            }
            else
            {
              audio.pause()
              setCurrentTime(audio.currentTime)
            }
    }
    return (
      <>
      {contextHolder}
      <div className="footer">
        <div className="song-player-container">
          <div className="song-details">
            <p className="song-name"></p>
            <p className="artist-name"></p>
          </div>
          <div className="song-controls">
            <div className="reverse-song">
              <i className="fa fa-step-backward reverse" aria-hidden="true"></i>
            </div>
            <div className="play-btn">
              <i
                className={`fa play-btnfa ${isPlaying?'fa-pause pause-btn':'fa-play play-btn'}`}
                aria-hidden="true"
                onClick={() => {
                  progressStart(!isPlaying);
                }}
              ></i>
            </div>
            <div className="next-song">
              <i className="fa fa-step-forward forward" aria-hidden="true"></i>
            </div>
          </div>
          <div className="song-progress-container">
            <p className="timer-start">{timeStart}</p>
            <div className="song-progress">
              <div
                className="song-expired"
                style={{ width: `${currentTime*500/seconds}px` }}
              ></div>
            </div>
            <p className="timer-end">{timeEnd}</p>  
          </div>
        </div>
        <div className="volume-container">
          <i className="fa fa-volume-up" aria-hidden="true"></i>
          <input
            type="range"
            min="0"
            max="100"
            className="volume"
            value={volume}
            onChange={(e)=>{
              setVolume(e.target.value)
              audio.volume=e.target.value/100
            }}
          />
        </div>
      </div>
    </>
    );
}