import React from 'react'
import styles from './Score.module.less'
type ScoreProps = {
  currentScore: number
}
export const Score: React.FC<ScoreProps> = ({ currentScore }) => {
  return (
    <div className={styles.score}>
      <p>{currentScore}</p>
    </div>
  )
}
