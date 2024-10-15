import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import clsx from 'classnames'
import { useBackUrl, useTelegram } from '../../hooks'
import styles from './Voice.module.less'
import { VoicePlayer } from '../../compnents/voicePlayer/VoicePlayer'
export const Voice = () => {
  const [voices, setVoices] = useState<string[]>([])
  const { onClose } = useTelegram()
  const [summarizeVoice, setSummarizeVoice] = useState<string>()
  const [textFromVoice, setTextFromVoice] = useState('')
  const [brief, setBrief] = useState('')
  const backUrl = useBackUrl()
  // const backUrl = 'https://lbbttujj.online'

  useEffect(() => {
    axios.get(`${backUrl}/getVoices`).then((res: AxiosResponse<string[]>) => {
      res.data.forEach((voiceName) => {
        axios
          .get(`${backUrl}/getVoices/name`, { headers: { name: voiceName }, responseType: 'arraybuffer' })
          .then((response) => {
            const audioData = response.data // Полученные данные в виде массива байт
            const blob = new Blob([audioData], { type: 'audio/mpeg' })
            const audioUrl = URL.createObjectURL(blob) // Создаем URL для аудиофайла
            setVoices((prev) => [...prev, audioUrl])
          })
          .catch((error) => {
            console.error('Ошибка при получении аудиофайла:', error)
          })
      })
    })
    return () => {
      setVoices([])
    }
  }, [])

  const getSum = () => {
    axios.get(`${backUrl}/getSum`, { responseType: 'arraybuffer' }).then((response) => {
      const audioData = response.data
      const blob = new Blob([audioData], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(blob)
      console.log(audioUrl)
      setSummarizeVoice(audioUrl)
    })
  }

  const deleteHandler = () => {
    axios.delete(`${backUrl}/delete`).then(() => {
      console.log('удалено')
      onClose()
    })
  }

  const speechToText = () => {
    axios.get(`${backUrl}/speechToText`).then((response: AxiosResponse<string>) => {
      setTextFromVoice(response.data)
    })
  }

  const briefHandler = () => {
    axios.get(`${backUrl}/brief`).then((response: AxiosResponse<string>) => {
      setBrief(response.data)
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.players}>
        {voices.map((voice) => (
          <VoicePlayer key={voice} src={voice} />
        ))}
      </div>
      {summarizeVoice && (
        <div className={styles.SummarizePlayer}>
          <VoicePlayer src={summarizeVoice} />
        </div>
      )}
      {textFromVoice && (
        <div>
          <h3>Это в целом:</h3>
          <p>{textFromVoice}</p>
        </div>
      )}
      {brief && (
        <div>
          <h3>Если в кратце: </h3>
          <p>{brief}</p>
        </div>
      )}
      <div className={clsx(styles.Button, styles.deleteButton)} onClick={getSum}>
        <div onClick={getSum}>
          <p>Получить все вместе</p>
        </div>
      </div>
      <div className={clsx(styles.Button, styles.deleteButton)}>
        <div onClick={deleteHandler}>
          <p>Удалить</p>
        </div>
      </div>
      <div className={clsx(styles.Button, styles.deleteButton)}>
        <div onClick={speechToText}>
          <p>Распознать</p>
        </div>
      </div>
      <div className={clsx(styles.Button, styles.deleteButton)}>
        <div onClick={briefHandler}>
          <p>Пересказать</p>
        </div>
      </div>
    </div>
  )
}
