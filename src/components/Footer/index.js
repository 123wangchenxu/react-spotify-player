import './index.less'
export default function Footer()
{
    return <div className="footer">
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
                        <i className="fa play-btnfa fa-play play-btn" aria-hidden="true"></i>
                    </div>
                    <div className="next-song">
                        <i className="fa fa-step-forward forward" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="song-progress-container">
                    <p className="timer-start">0:00</p>
                    <div className="song-progress">
                        <div className="song-expired" style={{ width: '0px' }}></div>
                    </div>
                    <p className="timer-end">0:30</p>
                </div>
            </div>
            <div className="volume-container">
                <i className="fa fa-volume-up" aria-hidden="true"></i>
                <input type="range" min="0" max="100" className="volume" value="100"/>
            </div>
        </div>
}