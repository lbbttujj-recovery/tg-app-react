import React, { useState } from 'react'
import clsx from 'classnames'
import styles from './TabBar.module.less'

type TabNames = 'tap' | 'earn'
export const TabBar = () => {
  const [activeTab, setActiveTab] = useState<TabNames>('tap')

  const onTabClick = (tabName: TabNames) => {
    setActiveTab(tabName)
  }
  return (
    <div className={styles.tabBar}>
      <div onClick={() => onTabClick('tap')} className={clsx(styles.tab, activeTab === 'tap' && styles.active)}>
        <p>Тапать</p>
      </div>
      <div onClick={() => onTabClick('earn')} className={clsx(styles.tab, activeTab === 'earn' && styles.active)}>
        <p>Покупать</p>
      </div>
      <div className={clsx(styles.activeTab, activeTab === 'earn' && styles.activeTabEarn)} />
    </div>
  )
}
