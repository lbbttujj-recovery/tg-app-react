import React, { useState } from 'react'
import { BottomView } from '../../../../compnents/bottomView/BottomView'
import { TaskList } from './taskList/TaskList'
import { TaskContent } from './taskContent/TaskContent'
import { useAppDispatch, useTelegram } from '../../../../hooks'
import { checkSubscribe } from '../../../../store/gipnofob/actions'

export const ExerciseView = () => {
  const [active, setActive] = useState(false)
  const { id } = useTelegram()
  const dipatch = useAppDispatch()
  const groupId = 1001692424174

  const actionCheck = () => {
    if (!id) {
      return
    }
    dipatch(checkSubscribe({ id, groupId }))
  }

  return (
    <div>
      <TaskList openBottomView={() => setActive(true)} />
      <BottomView isOpen={active} onClose={() => setActive(false)}>
        <TaskContent text={'Подпишись нв канал'} actionText={'Подписаться'} action={actionCheck} />
      </BottomView>
    </div>
  )
}
