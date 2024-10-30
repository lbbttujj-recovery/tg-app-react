import React from 'react'
import styles from './Task.module.less'

type TaskProps = {
  text: string
  isSuccess: boolean
  onClick?: () => void
}
export const Task: React.FC<TaskProps> = ({ text, isSuccess, onClick }) => {
  return (
    <div onClick={onClick} className={styles.task}>
      <div>
        <p>{text}</p>
        {isSuccess && <p>success</p>}
      </div>
    </div>
  )
}
