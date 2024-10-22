import React, { useEffect, useRef, useState } from 'react'
import styles from './VoicePlayer.module.less'
import Play from '../../../img/play.png'

type VoicePlayerProps = {
  src: string
}
export const VoicePlayer: React.FC<VoicePlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timePlay, setTimePlay] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setTimePlay(Number(audio.currentTime))
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    if (isPlaying) {
      audio.pause()
    } else {
      console.log(audio)
      audio.play()
    }

    setIsPlaying(!isPlaying)
  }
  return (
    <div className={styles.playerContainer}>
      <button className={styles.playButton} onClick={togglePlayPause}>
        <img src={Play} alt={'play'} width="25px" className={styles.playImage} />
      </button>
      <div className={styles.player}>
        <audio ref={audioRef} src={src} preload="metadata"></audio>
        <div style={{ width: `calc(${(Number(timePlay) / Number(duration)) * 100}% + 10px)` }} className={styles.duration}></div>
      </div>
      <div className={styles.durationNumber}>
        <p>{duration.toFixed(1)}s</p>
      </div>
    </div>
  )
}
