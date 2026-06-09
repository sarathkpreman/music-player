import { useEffect, useRef } from 'react';

export const Musicplayer = ({ 
  currentSong, 
  formatTime, 
  currentTime, 
  setCurrentTime,  
  setDuration, 
  duration,
  handleNextSong, 
  handlePreviousSong,
  play,
  pause,
  isPlaying
 }) => {
  const audioRef = useRef(null);


    const handleTimeChange = (e) => {
    const audio = audioRef.current
    if(!audio) return
    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)

  }

  useEffect(()=> {
    const audio = audioRef.current
    if(!audio) return;

    const handleLoadedMetaData =()=> {
      setDuration(audio.duration)
      setCurrentTime(0)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
    }

    // const handleEnded = () => {
    //   handleNextSong()

    // }

    audio.addEventListener('loadedmetadata', handleLoadedMetaData)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    // audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetaData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      // audio.removeEventListener('ended', handleEnded)
    }
  }, [setDuration, setCurrentTime, currentSong, handleNextSong])


  useEffect(() => {
  const audio = audioRef.current

  if (!audio) return

  if (isPlaying) {
    audio.play().catch((error) => {
      console.error("PLAY FAILED", error)
    })
  } else {
    audio.pause()
  }
}, [isPlaying, currentSong])




  return (
    <div className="music-player">
      <audio ref={audioRef} src={currentSong?.url} preload='metadata' crossOrigin='anonymous' onEnded={handleNextSong}/>

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
    max={duration}
    value={currentTime}
    className="progress-range"
    step="0.01"
    onChange={handleTimeChange}
  />

  <span className="time">
    {formatTime(duration)}
  </span>
  </div>

    <div className='player-controls'>
       <button onClick={handlePreviousSong}>
        ⏮
      </button>

      <button onClick={()=> isPlaying ? pause() : play()}>
        {isPlaying ? '⏸' : '▶'}
      </button>

      <button onClick={handleNextSong}>
        ⏭
      </button>
    </div>

    <div className='volume-container'>
      <span className='volume-icon'>🔊</span>
      <input type="range" min="0" max="1" step="0.01" onChange={(e) => {
        const audio = audioRef.current
        if(!audio) return
        audio.volume = e.target.value
      }} />
    </div>

    </div>
  )
}