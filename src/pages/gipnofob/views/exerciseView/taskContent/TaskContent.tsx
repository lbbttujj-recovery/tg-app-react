import React from 'react'
import styles from './TaskContent.module.less'

type TaskContentProps = {
  text: string
  iconUrl?: string
  actionUrl?: string
  actionText?: string
  action?: () => void
}

export const TaskContent: React.FC<TaskContentProps> = ({ text, actionText, action, actionUrl }) => {
  return (
    <div className={styles.taskContent}>
      <h1>{text}</h1>
      <button onClick={() => console.log(actionUrl)}>{actionText}</button>
      <button onClick={action}>Проверить</button>
    </div>
  )
}
