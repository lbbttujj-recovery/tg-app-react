import React from 'react'
import styles from './TaskContent.module.less'

type TaskContentProps = {
  text: string
  iconUrl?: string
  actionUrl?: string
  actionText?: string
}

export const TaskContent: React.FC<TaskContentProps> = ({ text, actionText }) => {
  return (
    <div className={styles.taskContent}>
      <h1>{text}</h1>
      <button>{actionText}</button>
    </div>
  )
}
