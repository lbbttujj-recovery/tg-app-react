import { useContext } from 'react'
import { TabContext } from '../../contexts/tabContext'
import { TapView } from './views/tapView/TapView'
import { ExerciseView } from './views/exerciseView/ExerciseView'

export const GipnofobTabViews = () => {
  const activeTab = useContext(TabContext)
  console.log(activeTab)

  switch (activeTab) {
    case 'earn':
      return <p>earn</p>
    case 'exercise':
      return <ExerciseView />
    case 'tap':
      return <TapView />
    default:
      return null
  }
}
