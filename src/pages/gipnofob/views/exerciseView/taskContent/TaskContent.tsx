import React from 'react'
import styles from './TaskContent.module.less'
import { useNavigate } from 'react-router-dom'

type TaskContentProps = {
  text: string
  iconUrl?: string
  actionUrl?: string
  actionText?: string
  action?: () => void
}

export const TaskContent: React.FC<TaskContentProps> = ({ text, actionText, action, actionUrl }) => {
  const redirectToUrl = () => {
    if (!actionUrl) {
      return
    }
    window.location.href = actionUrl
  }

  return (
    <div className={styles.taskContent}>
      <h1>{text}</h1>
      <button onClick={redirectToUrl}>{actionText}</button>
      <button onClick={action}>Проверить</button>
    </div>
  )
}
