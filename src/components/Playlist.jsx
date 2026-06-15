import { useState } from "react"
import { useMusic } from "../context/MusicContext"

export const Playlist = () => {

  const [newPlaylistName, setNewPlayList] = useState("")
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)

  const { playlists, createPlaylist, allSongs, addSongToPlayList, handlePlaySong, handlePlaylistDelete } = useMusic()

  const filteredSongs = allSongs.filter(song => {
    const match = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())

    const alreadyInPlaylist = selectedPlaylist?.songs.some(s => s.id === song.id)

    return match && !alreadyInPlaylist
  }
  )

  const handleCreatePlaylist = () => {
   if(newPlaylistName.trim() !== "") {
    createPlaylist(newPlaylistName)
    setNewPlayList("")
   }
  }


    const handleAddSong = (song) => {
      if(selectedPlaylist) {
        addSongToPlayList(selectedPlaylist.id, song)
        setSearchQuery("")
        setShowDropdown(false)
      }
  }

  const handlePlayFromPlayList = (song) => {
    const songToPlay = allSongs.find(s => s.id === song.id)
    if(songToPlay) {
      handlePlaySong(songToPlay, allSongs.indexOf(songToPlay))
    }
  }

  const handlePlaylistDeleteConfirm = (playlist) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the playlist "${playlist.name}"?`)
    if(confirmDelete) {
      handlePlaylistDelete(playlist.id)
    }
  }

  return (
    <div className="playlists">
      <h2>Playlists</h2>
      
      <div className="create-playlist">
        <div className="playlist-form">
          <input type="text" placeholder="Playlist Name" 
          onChange={(e)=> setNewPlayList(e.target.value)}
          value={newPlaylistName}
          />
          <button className="create-btn" onClick={handleCreatePlaylist}>Create</button>
        </div>
      </div>

      <div className="playlist-list">
        {playlists.length === 0 ? 
        (<p className="message">No Playlists are created yet</p>) : 
        (playlists.map((playlist, key)=> {
          return(
            <div className="playlist-item" key={key}>
              <div className="playlsit-header">
                <h3>{playlist.name}</h3>
                <div className="playlist-actions">
                  <button className="playlist-delete-btn" onClick={()=> handlePlaylistDeleteConfirm(playlist)}>Delete</button>
                </div>
              </div>

              <div className="add-song-to-playlist">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search songs.."
                    className="song-search"
                    value={selectedPlaylist?.id === playlist.id ? searchQuery : ""}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setSelectedPlaylist(playlist)
                      setShowDropdown(e.target.value.length > 0)
                    }}
                    onFocus={(e) => {
                      setSelectedPlaylist(playlist)
                      setShowDropdown(e.target.value.length > 0)
                    }}
                  />
                  {selectedPlaylist?.id === playlist.id && showDropdown && (
                    <div className="search-results">
                      {filteredSongs.length === 0 ? 
                      (<div className="drop-down-empty">
                          <p>Not Songs Found</p>
                      </div>) 
                      : 
                      (filteredSongs.slice(0, 5).map((song, key)=> {
                        return(
                          <div key={key} className="dropdown-item" onClick={()=> handleAddSong(song)}>
                            <span className="song-title">{song.title}</span>
                            <span className="song-artist">{song.artist}</span>
                          </div>
                        )
                      }))}
                    </div>
                  )}
                </div>
              </div>
              <div className="playlist-songs">
                {playlist.songs.length === 0 ? 
                (<p className="message">No Songs in this playlist yet</p>) :
                (playlist.songs.map((song, key)=> {
                  return(
                    <div className="playlist-song-item" key={key} onClick={() => handlePlayFromPlayList(song)}>
                      <span className="song-title">{song.title}</span>
                      <span className="song-artist">{song.artist}</span>
                      <span className="song-duration">{song.duration}</span>
                    </div>
                  )
                }))}
              </div>
            </div>
          )
        }))}
      </div>
    </div>
  )
}