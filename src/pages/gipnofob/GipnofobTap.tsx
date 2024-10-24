import React, { useEffect } from 'react'
import { TapComponent } from './tapComponent/TapComponent'
import styles from './GipnofobTap.module.less'
import { TabBar } from './tabBar/TabBar'
import { ProfitPerHour } from './profitPerHour/ProfitPerHour'
import { useAppDispatch, useTelegram } from '../../hooks'
import { getScore } from '../../store/gipnofob/actions'

export const GipnofobTap = () => {
  const { user } = useTelegram()
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log('sdf')
    dispatch(getScore())
  }, [dispatch])
  return (
    <div className={styles.app}>
      <p>hello {user}</p>
      <ProfitPerHour />
      <TapComponent />
      <TabBar />
    </div>
  )
}
