import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {setCheckpoint, setActiveSongData} from '../../store/song'
import c from './AudioPlayer.module.css';


const AudioPlayer = ({song_url}) => {
  const storeSongData = useSelector(store => store.song)

  const dispatch = useDispatch()

  const audioRef = useRef()
  const buttonRef = useRef()
  const startTimeRef = useRef()
  const endTimeRef = useRef()
  const sliderRef = useRef()

  const [sliderValue, setSliderValue] = useState(0)
  const [lastCheckpoint, setLastCheckpoint] = useState(0)


  const calculateMinsAndSecs = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60)
    let secs = Math.floor(totalSecs % 60)
    if (secs < 10) secs = `0${secs}`

    return `${mins}:${secs}`
  }

  // This updates the display of how long a song is
  const updateDurationDisplay = (e) => {
    let totalSecs = audioRef.current.duration
    endTimeRef.current.innerText = calculateMinsAndSecs(totalSecs)
  }





  // This will set the checkpoint as the song seeks
  const seekTrack = (e) => {
    if (storeSongData?.activeSongURL !== song_url) {
      dispatch(setActiveSongData(song_url))
    }

    const target = (parseFloat(e.target.value) / 100) * audioRef.current.duration
    dispatch(setCheckpoint(target))
  }
  // This will use the updated checkpoint to update the location of the player
  useEffect(() => {
    if (storeSongData.checkpoint !== lastCheckpoint) {
      audioRef.current.currentTime = storeSongData.checkpoint
      setLastCheckpoint(storeSongData.checkpoint)
    }
  }, [storeSongData, lastCheckpoint])





  const timeChangeHandler = () => {
    updateCurrentTimeDisplay()
    updateSliderValue()
  }
  const updateSliderValue = () => {

    if (audioRef?.current?.duration && sliderRef.current) {
      const totalSecs = audioRef.current.duration
      const percentage_complete = (audioRef.current.currentTime / totalSecs) * 100

      // This updates the 'filled in color' of the progress bar in the bottom nav
      const slider = sliderRef.current
      slider.style.background = `linear-gradient(to right, #FD3700 0%, #FD3700 ${percentage_complete}%, grey ${percentage_complete}%, grey 100%)`

      // return percentage_complete
      setSliderValue(percentage_complete)
      return

    }
    setSliderValue(0)
    return 0
  }
  const updateCurrentTimeDisplay = () => {
    let currentNumSecs = audioRef.current.currentTime
    startTimeRef.current.innerText = calculateMinsAndSecs(currentNumSecs)
  }




  // Controls the play/pause in the bottom nav
  const togglePlaying = async (e) => {
    if (storeSongData?.activeSongURL !== song_url) {
      dispatch(setActiveSongData(song_url))
    }

    if (e.target.innerText === 'Play') {
      e.target.innerText = 'Pause'
      audioRef.current['play']()

    } else {
      e.target.innerText = 'Play'
      audioRef.current['pause']()
    }
  }
   // When a user plays a song, the store holds the url of the song
   // If that store url does not match the url of this song player, then make sure this player isn't playing and reset the time
    useEffect(() => {
      if (storeSongData?.activeSongURL !== song_url) {
        audioRef.current['pause']()
        audioRef.current.currentTime = 0
        buttonRef.current.innerText = 'Play'
      }
    }, [storeSongData, song_url])




  return (
    <div className={c.player_parent}>
      <audio
        src={song_url}
        ref={audioRef}
        preload='metadata'
        loop
        onTimeUpdate={timeChangeHandler}
        onLoadedMetadata={updateDurationDisplay}
      >
      </audio>
      <button ref={buttonRef} onClick={togglePlaying} className={c.play_pause_button}>Play</button>
      <div className={c.progressbar}>
        <span ref={startTimeRef} className={c.currentTime}>0:00</span>
        <input
          ref={sliderRef}
          type='range'
          max={100}
          min={0}
          step={.01}
          value={sliderValue}
          onChange={seekTrack}
          id={c.slider}
        />
        <span ref={endTimeRef}>0:00</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
