import songs from '../data/songs.js'
import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const MusicContext = createContext()

export const MusicProvider = ({children}) => {

  const [allSongs, setAllSongs] = useState(songs)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const currentSong = allSongs[currentSongIndex]
  
  const [playlists, setPlaylists] = useState(() => {
    try {
      if (typeof window === 'undefined') return []
      const raw = localStorage.getItem('musicPlayerPlayLists')
      const parsed = raw ? JSON.parse(raw) : []
        if (!Array.isArray(parsed)) return []
        return parsed.map((p) => ({
        id: p?.id ?? crypto.randomUUID(),
        name: typeof p?.name === 'string' ? p.name : 'Untitled Playlist',
        songs: Array.isArray(p?.songs) ? p.songs : [],
      }))
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      if(playlists.length > 0) {
        localStorage.setItem('musicPlayerPlayLists', JSON.stringify(playlists))
      } else {
        localStorage.removeItem('musicPlayerPlayLists')
      }
    } catch {
      // ignore write errors
    }
  }, [playlists])



  useEffect(() => {
    let cancelled = false
    const audios = []
    const loadSongs = async () => {
      const songsWithDuration = await Promise.all(
        songs.map((song) => {
          return new Promise((resolve) => {
            const audio = new Audio(song.url)
            audios.push(audio)

            let settled = false
            const done = (resolvedDuration = 0) => {            
              if (settled) return
            settled = true
            clearTimeout(timeoutId)
            audio.src = ''
            resolve({ ...song, duration: resolvedDuration })
          }
          const timeoutId = setTimeout(() => done(song.duration ?? 0), 10000)

          audio.addEventListener(
            'loadedmetadata',
            () => done(Number.isFinite(audio.duration) ? audio.duration : (song.duration ?? 0)),
            { once: true }
          )
          audio.addEventListener('error', () => done(song.duration ?? 0), { once: true })
        
          })
        })
      )

    if (!cancelled) setAllSongs(songsWithDuration)
    }

    loadSongs()
    return () => {
      cancelled = true
      audios.forEach((audio)=> {
        audio.src = ''
        audio.load()
      })
    }
  }, [])

  const handlePlaySong = (song, index) => {
  setCurrentSongIndex(index)
  setDuration(song.duration || 0)
  setCurrentTime(0)
  setIsPlaying(true)
}

  const play = () => setIsPlaying(true)

  const pause = () => setIsPlaying(false)

  const handleNextSong = () => {
      setCurrentSongIndex((prev) => {
     const nextIndex = (prev + 1) % allSongs.length
     setDuration(allSongs[nextIndex]?.duration ?? 0)
      return nextIndex
    })

    setCurrentTime(0)
    //setIsPlaying(false)
  }

  const handlePreviousSong = () => {
      setCurrentSongIndex((prev) => {
      const prevIndex = prev === 0 ? allSongs.length - 1 : prev - 1
      setDuration(allSongs[prevIndex]?.duration ?? 0)
      return prevIndex
    })

    setCurrentTime(0)
      //setIsPlaying(false)
    
  }

  const formatTime = (time) => {
    if (typeof time !== 'number' || isNaN(time)) {
      return '0:00'
    }

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: crypto.randomUUID(),
      name: name,
      songs: [],
    }
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist])
  }

  const addSongToPlayList = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: [...playlist.songs, song],
          }
        } else {
          return playlist
        }
      })
    )
  }


  const handlePlaylistDelete = (playlistId) => {
    setPlaylists((prev) => prev.filter((playlist) => playlist.id !== playlistId))
  }

    return <MusicContext.Provider value={{
        allSongs,
    currentSong,
    currentSongIndex,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    isPlaying,
    play,
    pause,
    handlePlaySong,
    handleNextSong,
    handlePreviousSong,
    formatTime,
    playlists,
    createPlaylist,
    addSongToPlayList,
    handlePlaylistDelete
    }}>{children}</MusicContext.Provider>
}


export const useMusic = () => {
  const contextValue  = useContext(MusicContext)
  if(!contextValue) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return contextValue
}