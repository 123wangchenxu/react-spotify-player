import { useMemo, useRef,useState,useEffect } from 'react'
import './index.less'
export default function Footer(props)
{
    const splitSeconds=props.time_end.split(':')
    const seconds=parseInt(splitSeconds[0]*60)+parseInt(splitSeconds[1])
    const intervalRef = useRef(null);
    let timeRecord=[]
    const progressStart=()=>{
            if (intervalRef.current) return; 
            const audio = new Audio(props.musicUrl);
            audio.play();
            intervalRef.current=setInterval(()=>{
                props.setColorCount(colorCount=>
                    {
                        timeRecord = [];
                        if (Math.floor(colorCount / 60 )< 10)
                          timeRecord.push("0" + Math.floor(colorCount / 60));
                        else timeRecord.push(Math.floor(colorCount / 60).toString());
                        if (colorCount % 60 < 10)
                          timeRecord.push("0" + (colorCount % 60));
                        else timeRecord.push((colorCount % 60).toString());
                        props.setTimeStart(timeRecord.join(":"));
                        if (colorCount === seconds)
                            clearInterval(intervalRef.current);
                        return colorCount+1
                    }
                )
            },1000)
    }
    return (
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
                className="fa play-btnfa fa-play play-btn"
                aria-hidden="true"
                onClick={() => {
                  props.btn_click();
                  progressStart();
                }}
              ></i>
            </div>
            <div className="next-song">
              <i className="fa fa-step-forward forward" aria-hidden="true"></i>
            </div>
          </div>
          <div className="song-progress-container">
            <p className="timer-start">{props.timeStart}</p>
            <div className="song-progress">
              <div
                className="song-expired"
                style={{ width: `${props.colorCount*500/seconds}px` }}
              ></div>
            </div>
            <p className="timer-end">{props.time_end}</p>
          </div>
        </div>
        <div className="volume-container">
          <i className="fa fa-volume-up" aria-hidden="true"></i>
          <input
            type="range"
            min="0"
            max="100"
            className="volume"
            defaultValue={100}
          />
        </div>
      </div>
    );
}