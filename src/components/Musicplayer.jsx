export const Musicplayer = ({ currentSong, formatTime }) => {
  return (
    <div className="music-player">
      <audio />

      <div className="player-info">
        <div className="track-title">
          {currentSong?.title}
        </div>

        <div className="track-artist">
          {currentSong?.artist}
        </div>
      </div>

      <div>
        <span className="time">
          {currentSong
            ? formatTime(currentSong.duration)
            : "0:00"}
        </span>

        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  )
}