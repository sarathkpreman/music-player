
import { useMusic } from "../context/MusicContext"


export const Allsongs = () => {
  const { allSongs, handlePlaySong, currentSongIndex, formatTime } = useMusic()

  return (
    <div className="songs-container">

      <div className="songs-header">
        <h1 className="songs-title">
          All Songs
        </h1>

        <span className="songs-count">
          {allSongs.length} Songs
        </span>
      </div>

  

      <div className="songs-list">
        {allSongs.map((song, index) => {
          const isActive =
            currentSongIndex === index

          return (
            <div
              key={song.id}
              className={`song-card ${
                isActive ? "active" : ""}`}
            onClick={()=> handlePlaySong(song, index)} >
              


              <div className="song-left">
                <div className="song-index">
                  {isActive ? (
                    <div className="playing-bars">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

              

                <img
                  src={song.cover}
                  alt={song.title}
                  className="song-cover"
                />

                

                <div className="song-info">
                  <h2>{song.title}</h2>

                  <div className="song-meta">
                    <p>{song.artist}</p>

                    {song.album && (
                      <>
                        <span>•</span>
                        <p>{song.album}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

          

              <div className="song-right">
                <span className="song-duration">
                  {formatTime(song.duration)}
                </span>

                <button
                  className="play-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePlaySong(song, index)
                  }}
                >
                  ►
                </button>

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}