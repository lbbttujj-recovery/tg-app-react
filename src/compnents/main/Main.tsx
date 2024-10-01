import React from 'react'
import styles from './Main.module.less'
import { useTelegram } from '../../hooks/useTelegram'
import { MoodChoice } from '../moodChoice/MoodChoice'
export const Main = () => {
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
