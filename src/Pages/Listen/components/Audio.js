//使用zustand重新管理
import { useEffect } from "react"

export default function MyAduio(props)
{
    useEffect(()=>{
            const audio = new Audio(props.musicUrl);
            if (props.scrollButton) {
              audio.play();
            }
            audio.volume = props.volume / 100;
    },[props.volume])
}