import { useEffect, useRef } from 'react';

export const Musicplayer = ({ 
  currentSong, 
  formatTime, 
  currentTime, 
  setCurrentTime,  
  setDuration, 
  handleNextSong, 
  handlePreviousSong,
  handlePausePlay
 }) => {
  const audioRef = useRef(null);

  

  useEffect(()=> {
    const audio = audioRef.current
    if(!audio) return;

    const handleLoadedMetaData =()=> {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      handleNextSong()

    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetaData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [setDuration, setCurrentTime, currentSong, handleNextSong])

  return (
    <div className="music-player">
      <audio ref={audioRef} src={currentSong?.url} preload='metadata' crossOrigin='anonymous'/>

      <div className="player-info">
        <div className="track-title">
          {currentSong?.title}
        </div>

        <div className="track-artist">
          {currentSong?.artist}
        </div>
      </div>

      <div className="progress-container">
  <span className="time">
    {formatTime(currentTime)}
  </span>

  <input
    type="range"
    min="0"
    max={currentSong?.duration || 0}
    value={currentTime}
    className="progress-range"
    step="1"
    onChange={(e)=> 
    {
      const newTime = Number(e.target.value)
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    }
  />

  <span className="time">
    {formatTime(currentSong?.duration || 0)}
  </span>
  </div>

    <div className='player-controls'>
       <button onClick={handlePreviousSong}>
        ⏮
      </button>

      <button onClick={handlePausePlay}>
        ▶️
      </button>

      <button onClick={handleNextSong}>
        ⏭
      </button>
    </div>

    </div>
  )
}