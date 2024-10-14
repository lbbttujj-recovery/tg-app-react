import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import clsx from 'classnames'
import { useTelegram } from '../../hooks'
import styles from './Voice.module.less'
import { VoicePlayer } from '../../compnents/voicePlayer/VoicePlayer'
export const Voice = () => {
  const [voices, setVoices] = useState<string[]>([])
  const { onClose } = useTelegram()
  const [summarizeVoice, setSummarizeVoice] = useState<string>()
  // const backUrl = useBackUrl()
  const backUrl = 'https://lbbttujj.online'

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
            console.log(audioUrl)

            // Теперь можно воспроизводить аудиофайл
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
    axios.post(`${backUrl}/delete`).then(() => {
      console.log('удалено')
      window.location.reload()
      onClose()
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.players}>
        {voices.map((voice) => (
          <VoicePlayer key={voice} src={voice} />
        ))}
      </div>
      <div className={styles.SummarizePlayer}>
        <h3>Все вместе</h3>
        {summarizeVoice ? (
          <VoicePlayer src={summarizeVoice} />
        ) : (
          <div className={clsx(styles.Button)} onClick={getSum}>
            <p>Получить все вместе</p>
          </div>
        )}
      </div>
      <div className={clsx(styles.Button, styles.deleteButton)}>
        <div onClick={deleteHandler}>
          <p>Удалить</p>
        </div>
      </div>
    </div>
  )
}
