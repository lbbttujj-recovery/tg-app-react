import React, { ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'classnames'
import styles from './BottomView.module.less'

type BottomViewProps = {
  isOpen?: boolean
  onClose?: () => void
  children: ReactElement
  zIndex?: number
}
export const BottomView: React.FC<BottomViewProps> = ({ isOpen = false, onClose, zIndex = 1, children }) => {
  const handleClose = () => {
    onClose && onClose()
  }

  return createPortal(
    <div>
      <div className={clsx(styles.bottomViewOverlay, isOpen && styles.overlayActive)} onClick={handleClose} />
      <div className={clsx(styles.bottomViewContent, isOpen && styles.open)}>{children}</div>
    </div>,
    document.body,
  )
}
