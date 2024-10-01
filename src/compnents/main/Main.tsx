import React, { useEffect } from 'react'
import styles from './Main.module.less'
import { useTelegram } from '../../hooks/useTelegram'
import { MoodChoice } from '../moodChoice/MoodChoice'
export const Main = () => {
  const { onToggleMainButton, user } = useTelegram()

  useEffect(() => {
    fetch('https://lbbttujj.online/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }, [])

  return (
    <div>
      <h4 className={styles.title} onClick={onToggleMainButton}>{`Как настроение сейчас, ${user}?`}</h4>
      <div className={styles.main}>
        <MoodChoice />
      </div>
    </div>
  )
}
