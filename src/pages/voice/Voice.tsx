import React, { useEffect, useState } from 'react'
import axios from 'axios'
import clsx from 'classnames'
import { useAppDispatch, useAppSelector, useBackUrl, useTelegram } from '../../hooks'
import styles from './Voice.module.less'
import { VoicePlayer } from '../../compnents/voicePlayer/VoicePlayer'
import { ReactComponent as DeleteBin } from '../../img/delete.svg'
import { brief, getSum, getVoices, speechToText } from '../../store/voices/actions'
import { Loader } from '../../compnents/loader/Loader'

type ModeType = 'all' | 'brief'

export const Voice = () => {
  const { onClose } = useTelegram()
  const [activeMode, setActiveMode] = useState<ModeType>('all')
  const backUrl = useBackUrl()

  const voicesRequest = useAppSelector((state) => state.voice.voicesNames)
  const voiceSumRequest = useAppSelector((state) => state.voice.voiceSum)
  const speechToTextRequest = useAppSelector((state) => state.voice.speechToText)
  const briefRequest = useAppSelector((state) => state.voice.brief)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getVoices())
  }, [dispatch])

  useEffect(() => {
    if (voicesRequest.status === 'success') {
      dispatch(getSum())
    }
  }, [dispatch, voicesRequest])

  useEffect(() => {
    if (voiceSumRequest.status === 'success') {
      dispatch(speechToText())
    }
  }, [dispatch, voiceSumRequest])

  const deleteHandler = () => {
    axios.delete(`${backUrl}/voice/delete`).then(() => {
      console.log('удалено')
      onClose()
    })
  }

  const speechToTextHandler = () => {
    setActiveMode('all')
  }

  const briefHandler = () => {
    if (!briefRequest.data) {
      dispatch(brief())
    }
    setActiveMode('brief')
  }

  return (
    <div className={styles.container}>
      <div className={styles.players}>
        {voicesRequest.status === 'pending' && <Loader />}
        {voicesRequest.data.map((voice) => (
          <VoicePlayer key={voice} src={voice} />
        ))}
      </div>
      {voiceSumRequest.data && (
        <div className={styles.SummarizePlayer}>
          <VoicePlayer src={voiceSumRequest.data} />
        </div>
      )}
      <div className={clsx(styles.deleteButton)} onClick={deleteHandler}>
        <DeleteBin width={'35px'} height={'35px'} />
      </div>
      <div className={styles.content}>
        {(briefRequest.status === 'pending' || speechToTextRequest.status === 'pending') && <Loader />}
        <div>{activeMode === 'all' ? <p>{speechToTextRequest.data}</p> : <p>{briefRequest.data}</p>}</div>
        <div className={styles.tabs}>
          <div className={clsx(styles.tabButton, activeMode === 'all' && styles.active)} onClick={speechToTextHandler}>
            <div>
              <p>Распознать</p>
            </div>
          </div>
          <div className={clsx(styles.tabButton, activeMode === 'brief' && styles.active)} onClick={briefHandler}>
            <div>
              <p>Пересказать</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
