import React from 'react'
import styles from './Mood.module.less'
import { useTelegram } from '../../hooks'
import { MoodChoice } from '../../compnents/moodChoice/MoodChoice'
export const Mood = () => {
  const { onToggleMainButton, user } = useTelegram()

  return (
    <div>
      <h4 className={styles.title} onClick={onToggleMainButton}>{`Как настроение сейчас, ${user}?`}</h4>
      <div className={styles.main}>
        <MoodChoice />
      </div>
    </div>
  )
}
