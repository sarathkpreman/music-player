import songs from '../data/songs.js'
import { useEffect } from 'react'

import { useState } from 'react'

export const useMusic = () => {
    const [allSongs, setAllSongs] = useState(songs)
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState()


    useEffect(() => {
    const loadSongs = async () => {
    const songsWithDuration = await Promise.all(
      songs.map((song) => {
        return new Promise((resolve) => {
          const audio = new Audio(song.url);

          audio.addEventListener("loadedmetadata", () => {
            resolve({
              ...song,
              duration: audio.duration,
            });
                });
                });
                })
             );

            setAllSongs(songsWithDuration);
            };

        loadSongs();
    }, []);


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


    const play = () => setIsPlaying(true)
    const pause = () => setIsPlaying(false)


    const handleNextSong = () => {
        setCurrentSongIndex((prev)=> {
            const nextIndex = (prev + 1 ) % allSongs.length;
            setCurrentSong(allSongs[nextIndex]);
            return nextIndex
        })
        setIsPlaying(false)
    }   

    const handlePreviousSong = () => {
        setCurrentSongIndex((prev)=> {
            const prevIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
            setCurrentSong(allSongs[prevIndex]);
            return prevIndex
        })
        setIsPlaying(false)
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
        handlePreviousSong,
        play,
        pause, 
        isPlaying
    } 
}