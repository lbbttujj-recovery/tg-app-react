import React from 'react'
import styles from './TaskList.module.less'
import { Task } from './task/Task'

const tasks = [
  { text: 'Подписаться в телеграмм', isSuccess: false },
  { text: 'Подписаться в Инсте', isSuccess: false },
]

type TaskListProps = {
  openBottomView: () => void
}

export const TaskList: React.FC<TaskListProps> = ({ openBottomView }) => {
  return (
    <div>
      <p>Задания</p>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <Task onClick={() => openBottomView()} text={task.text} isSuccess={task.isSuccess} />
        ))}
      </div>
    </div>
  )
}
