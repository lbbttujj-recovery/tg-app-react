import React, { useEffect, useState } from 'react'
import { BottomView } from '../../../../compnents/bottomView/BottomView'
import { TaskList } from './taskList/TaskList'
import { TaskContent } from './taskContent/TaskContent'
import { useAppDispatch, useAppSelector, useTelegram } from '../../../../hooks'
import { checkSubscribe } from '../../../../store/gipnofob/actions'

export const ExerciseView = () => {
  const [active, setActive] = useState(false)
  const { id } = useTelegram()
  const dipatch = useAppDispatch()
  const checkSubscribeRequest = useAppSelector((state) => state.gipnofob.checkSubscribe)
  const [errorMessage, setErrorMessage] = useState('')
  // const groupId = -1002430404117

  const actionCheck = () => {
    // if (!id) {
    //   return
    // }
    dipatch(checkSubscribe(id || 6950061672))
  }

  useEffect(() => {
    if (checkSubscribeRequest.data === null) {
      return
    }
    if (!checkSubscribeRequest.data) {
      setErrorMessage('Ты не подписан')
    } else {
      setActive(false)
      setErrorMessage('')
    }
  }, [checkSubscribeRequest])

  return (
    <div>
      <TaskList openBottomView={() => setActive(true)} />
      <BottomView isOpen={active} onClose={() => setActive(false)}>
        <div>
          <TaskContent
            text={'Подпишись на канал'}
            actionText={'Подписаться'}
            actionUrl={'https://t.me/lbbttujjgroup'}
            action={actionCheck}
          />
          {errorMessage}
        </div>
      </BottomView>
    </div>
  )
}
