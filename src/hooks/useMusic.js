import songs from '../data/songs.js'
import { useEffect, useState } from 'react'

export const useMusic = () => {
  const [allSongs, setAllSongs] = useState(songs)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const [isPlaying, setIsPlaying] = useState()

  const currentSong = allSongs[currentSongIndex]

  useEffect(() => {
    const loadSongs = async () => {
      const songsWithDuration = await Promise.all(
        songs.map((song) => {
          return new Promise((resolve) => {
            const audio = new Audio(song.url)

            audio.addEventListener('loadedmetadata', () => {
              resolve({
                ...song,
                duration: audio.duration,
              })
            })
          })
        })
      )

      setAllSongs(songsWithDuration)
    }

    loadSongs()
  }, [])

  const handlePlaySong = (song, index) => {
  console.log("CLICKED", song.title)

  setCurrentSongIndex(index)
  setDuration(song.duration || 0)
  setCurrentTime(0)
  setIsPlaying(true)
}

  const play = () => setIsPlaying(true)

  const pause = () => setIsPlaying(false)

  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % allSongs.length)

    setCurrentTime(0)
    //setIsPlaying(false)
  }

  const handlePreviousSong = () => {
    setCurrentSongIndex((prev) =>
      prev === 0 ? allSongs.length - 1 : prev - 1
    )

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

  return {
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
  }
}