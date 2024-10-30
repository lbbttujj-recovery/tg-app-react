import React, { useEffect, useState } from 'react'
import styles from './GipnofobTap.module.less'
import { TabBar } from './tabBar/TabBar'
import { useAppDispatch, useTelegram } from '../../hooks'
import { getScore } from '../../store/gipnofob/actions'
import { GipnofobTabViews } from './gipnofobTabViews'
import { TabContext } from '../../contexts/tabContext'

export type TabNames = 'tap' | 'earn' | 'exercise'

export const GipnofobTap = () => {
  const { user, id } = useTelegram()
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<TabNames>('tap')

  useEffect(() => {
    dispatch(getScore(id || 3))
    console.log('dddd')
  }, [dispatch])
  return (
    <div className={styles.app}>
      <p>hello {user}</p>
      <TabContext.Provider value={activeTab}>
        <GipnofobTabViews />
      </TabContext.Provider>
      <TabBar setActiveTab={setActiveTab} activeTab={activeTab} />
    </div>
  )
}
