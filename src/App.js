import './App.less'
import AlbumList from './components/AlbumList';
import { getNewSongs } from './api/text';
import { useEffect } from 'react';
import request from './utils/httpInstance';
import { Outlet } from 'react-router-dom';
import SideMenu from './components/SideMenu';
import ArtistList from './components/ArtistList';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';
import { create } from "zustand";

export const useFooterStore = create((set) => ({
  musicUrl: "",
  isPlaying:false,
  volume:60,
  currentTime:0,
  timeStart:"00:00",
  timeEnd:"00:00",
  isActive:false,
  audio:null,
  setAudio: (audio) => set(()=>({ audio: audio })),
  setIsActive: (isActive) => set(()=>({ isActive: isActive })),
  setTimeStart: (timeStart) => set(()=>({ timeStart: timeStart })),
  setTimeEnd: (timeEnd) => set(()=>({ timeEnd: timeEnd })),
  setVolume: (volume) => set(()=>({ volume: volume })),
  setIsPlaying: (isPlaying) => set(()=>({ isPlaying: isPlaying })),
  setMusicUrl: (url) => set(()=>({ musicUrl: url })),
  setCurrentTime: (currentTime) => set(()=>({ currentTime: currentTime })),
}));

function App() {
  const location=useLocation()
  useEffect(()=>{
      const songs=async ()=>{
        const getsongs=await getNewSongs()
      }
      songs()
  },[])
  return (
    <div className="App">
      <div className="app-container">
        {location.pathname.startsWith("/listen") ? (
          <></>
        ) : (
          <div className="left-side-section">
            <SideMenu />
            <ArtistList />
          </div>
        )}
        {
          location.pathname.startsWith("/listen") ? (
            <Outlet></Outlet>
          ) : (
            <div className="main-section">
              <Header />
              <div className="main-section-container">
                <Outlet />
              </div>
            </div>
          )
        }
        <Footer />
      </div>
    </div>
  );
}

export default App;
