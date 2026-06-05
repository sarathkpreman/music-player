import { Musicplayer } from "./components/Musicplayer"
import { BrowserRouter, Routes, Route } from "react-router"
import { Allsongs } from "./components/Allsongs"
import { Playlist } from "./components/Playlist"
import { useMusic } from "./hooks/useMusic"

function App() {

  const music = useMusic()

  return (
    <BrowserRouter>
      <div className="app">
      <main className="app-main">
        <div className="player-section">
          <Musicplayer 
          currentSong={music.currentSong}
          formatTime={music.formatTime}
          duration={music.duration}
          setDuration={music.setDuration}
          currentTime={music.currentTime}
          setCurrentTime={music.setCurrentTime}
          handleNextSong={music.handleNextSong}
          handlePreviousSong={music.handlePreviousSong}
          />
        </div>
        <div className="content-section">
          <Routes>
            <Route path="/" element={<Allsongs 
            allSongs={music.allSongs}
            handlePlaySong={music.handlePlaySong}
            currentSongIndex={music.currentSongIndex}
            formatTime={music.formatTime}

            />} />
            <Route path="/allsongs" element={<Allsongs 
            allSongs={music.allSongs}
            handlePlaySong={music.handlePlaySong}
            currentSongIndex={music.currentSongIndex}
            formatTime={music.formatTime}
            />} />
            
            <Route path="/playlists" element={<Playlist />} />
          </Routes>
        </div>
      </main>
    </div>
    </BrowserRouter> 
  )
}

export default App
