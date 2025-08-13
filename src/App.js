import './App.less'
import AlbumList from './components/AlbumList';
function App() {
  return (
    <div className="App">
      <div className="app-container">
        <div className="left-side-section">
          <AlbumList/>
        </div>
      </div>
    </div>
  );
}

export default App;
