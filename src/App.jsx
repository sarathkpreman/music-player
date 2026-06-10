import { Musicplayer } from "./components/Musicplayer"
import { BrowserRouter, Routes, Route } from "react-router"
import { Allsongs } from "./components/Allsongs"
import { Playlist } from "./components/Playlist"
import { MusicProvider } from "./context/MusicContext"


function App() {

  return (
    <BrowserRouter>
    <MusicProvider>
       <div className="app">
      <main className="app-main">
        <div className="player-section">
          <Musicplayer />
        </div>
        <div className="content-section">
          <Routes>
            <Route path="/" element={<Allsongs />} />
            <Route path="/allsongs" element={<Allsongs />} />
            <Route path="/playlists" element={<Playlist />} />
          </Routes>
        </div>
      </main>
    </div>
    </MusicProvider>
    </BrowserRouter> 
  )
}

export default App
