import { createContext } from 'react'
type TabNames = 'tap' | 'earn' | 'exercise'

export const TabContext = createContext<TabNames>('tap')
