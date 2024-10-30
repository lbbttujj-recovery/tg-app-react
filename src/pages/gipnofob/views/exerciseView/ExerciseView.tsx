import React, { useState } from 'react'
import { BottomView } from '../../../../compnents/bottomView/BottomView'
import { TaskList } from './taskList/TaskList'
import { TaskContent } from './taskContent/TaskContent'

export const ExerciseView = () => {
  const [active, setActive] = useState(false)

  return (
    <div>
      <TaskList openBottomView={() => setActive(true)} />
      <BottomView isOpen={active} onClose={() => setActive(false)}>
        <TaskContent text={'test'} actionText={'test'} />
      </BottomView>
    </div>
  )
}
