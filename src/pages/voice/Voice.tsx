import React, { useEffect, useState } from 'react'
import clsx from 'classnames'
import { useAppDispatch, useAppSelector } from '../../hooks'
import styles from './Voice.module.less'
import { VoicePlayer } from '../../compnents/voicePlayer/VoicePlayer'
import { ReactComponent as DeleteBin } from '../../img/delete.svg'
import { brief, deleteAll, getSum, getVoices, speechToText } from '../../store/voices/actions'
import { Loader } from '../../compnents/loader/Loader'

type ModeType = 'all' | 'brief' | 'deleted'

export const Voice = () => {
  // const { onClose } = useTelegram()
  const [activeMode, setActiveMode] = useState<ModeType>('all')

  const voicesRequest = useAppSelector((state) => state.voice.voicesNames)
  const voiceSumRequest = useAppSelector((state) => state.voice.voiceSum)
  const speechToTextRequest = useAppSelector((state) => state.voice.speechToText)
  const briefRequest = useAppSelector((state) => state.voice.brief)
  const deleteRequest = useAppSelector((state) => state.voice.deleteAll)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getVoices())
  }, [dispatch])

  useEffect(() => {
    if (voicesRequest.status === 'success') {
      dispatch(getSum())
      console.log('ssss')
    }
  }, [dispatch, voicesRequest])

  useEffect(() => {
    if (voiceSumRequest.status === 'success') {
      dispatch(speechToText())
    }
  }, [dispatch, voiceSumRequest])

  useEffect(() => {
    if (deleteRequest.data) {
      dispatch(getVoices())
      dispatch(getSum())
      setActiveMode('deleted')
    }
  }, [deleteRequest])

  const deleteHandler = () => {
    dispatch(deleteAll())
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
        {(briefRequest.status === 'pending' || speechToTextRequest.status === 'pending' || deleteRequest.status === 'pending') && (
          <Loader />
        )}
        <div className={styles.contentText}>
          {activeMode === 'all' && <p>{speechToTextRequest.data}</p>}
          {activeMode === 'brief' && <p>{briefRequest.data}</p>}
          {activeMode === 'deleted' && <p>Удалено, обнови бота</p>}
          {/*{voicesRequest.status === 'deleted' && <p>Удалено, обнови бота</p>}*/}
        </div>
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
