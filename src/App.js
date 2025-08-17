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
function App() {
  useEffect(()=>{
      const songs=async ()=>{
        const getsongs=await getNewSongs()
        console.log(getsongs)
      }
      songs()
  },[])
  return (
    <div className="App">
      <div className="app-container">
        <div className="left-side-section">
          <SideMenu/>
          <ArtistList/>
        </div>
        <div className='main-section'>
          <Header/>
          <div className='main-section-container'>
            <Outlet/>
          </div>
        </div>
        <Footer time_start={"00:00"} time_end={"00:00"}/>
      </div>
    </div>
  );
}

export default App;
