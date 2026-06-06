import songs from '../data/songs.js'

import { useState } from 'react'

export const useMusic = () => {
    const [allSongs,] = useState(songs)
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const handlePlaySong = (song, index) => {
        setCurrentSong(song)
        setCurrentSongIndex(index)
        setDuration(song.duration)
    }
    const formatTime = (time) => {
        if (typeof time !== "number" || isNaN(time)) {
        return "0:00"
    }

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }


    const handleNextSong = () => {
        setCurrentSongIndex((prev)=> {
            const nextIndex = (prev + 1 ) % allSongs.length;
            setCurrentSong(allSongs[nextIndex]);
            return nextIndex
        })
    }   

    const handlePreviousSong = () => {
        setCurrentSongIndex((prev)=> {
            const prevIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
            setCurrentSong(allSongs[prevIndex]);
            return prevIndex
        })
    }

    
    return { allSongs, 
        handlePlaySong, 
        currentSongIndex, 
        currentSong, 
        currentTime, 
        setCurrentTime, 
        formatTime, 
        duration, 
        setDuration,
        handleNextSong,
        handlePreviousSong
    } 
}