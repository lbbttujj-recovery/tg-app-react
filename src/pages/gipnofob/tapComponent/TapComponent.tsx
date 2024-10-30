import React, { useEffect, useState } from 'react'
import Gipnofob1 from '../../../img/gipnofob_1.jpg'
import Baget from '../../../img/baget1.png'
import styles from './TapComponent.module.less'
import { Score } from './score/Score'
import { debounce } from 'lodash'
import { useAppDispatch, useAppSelector, useTelegram } from '../../../hooks'
import { save } from '../../../store/gipnofob/actions'

const { id: tgId } = useTelegram()

const sendToBack = (number: number, dispatch: any) => {
  if (!tgId) {
    dispatch(save({ id: 3, score: number }))
    return
  }
  dispatch(save({ id: tgId, score: number }))
  console.log(number)
}

const throttledSendToBack = debounce(sendToBack, 1000)

export const TapComponent = () => {
  const dispatch = useAppDispatch()
  const scoreFromBack = useAppSelector((state) => state.gipnofob.score)
  const [currentScore, setCurrentScore] = useState(scoreFromBack.data)

  useEffect(() => {
    if (currentScore === 0) {
      if (scoreFromBack.status === 'success') {
        console.log('ssss')
        setCurrentScore(scoreFromBack.data)
      }
    }
  }, [scoreFromBack])
  const onIconClick = () => {
    // эффект нажатия
    setCurrentScore((state) => {
      throttledSendToBack(state + 1, dispatch)
      return state + 1
    })
  }
  return (
    <div>
      <div className={styles.tapIconWrapper}>
        <Score currentScore={currentScore} />
        <img className={styles.baget} src={Baget} alt={'baget'} />
        <img className={styles.tapIcon} src={Gipnofob1} alt={'1'} onClick={onIconClick} />
      </div>
    </div>
  )
}
