import React, { useState } from 'react'
import clsx from 'classnames'
import styles from './TabBar.module.less'
import { TabNames } from '../GipnofobTap'

type TabBarProps = {
  activeTab: TabNames
  setActiveTab: (tabName: TabNames) => void
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
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
      <div onClick={() => onTabClick('exercise')} className={clsx(styles.tab, activeTab === 'exercise' && styles.active)}>
        <p>Задания</p>
      </div>
      <div
        className={clsx(
          styles.activeTab,
          activeTab === 'earn' && styles.activeTabEarn,
          activeTab === 'exercise' && styles.activeTabExercise,
        )}
      />
    </div>
  )
}
