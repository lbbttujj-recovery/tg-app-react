import React, { useState } from 'react'
import { Pie } from './charts/Pie'
import { Intensity } from './charts/intensity'
import styles from './MoodChoice.module.less'
import { useBackUrl } from '../../hooks'

export const MoodChoice = () => {
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [custom, setCustom] = useState('')
  const URL = useBackUrl()
  const [imageUrl, setImageUrl] = useState('')

  const onClickPart = (part: string) => {
    setSelectedSlice(null)
    setIsLoading(true)
    fetch(`${URL}/create-image`, {
      method: 'POST',
      body: JSON.stringify({ mood: part }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.text().then((data) => {
          setImageUrl(data)
        })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className={styles.moodChoiceContainer}>
      {isLoading && <p>Загрузка...</p>}
      <p>Ввести самому</p>
      <div style={{ display: 'flex', marginBottom: '50px' }}>
        <input style={{ height: '50px', width: '250px' }} value={custom} onChange={(event) => setCustom(event.target.value)} />
        <button onClick={() => onClickPart(custom)} style={{ marginLeft: '20px' }}>
          Ввести
        </button>
      </div>
      {imageUrl ? (
        <img alt="gpt" onClick={() => setImageUrl('')} src={imageUrl} style={{ position: 'absolute' }} width="100%" />
      ) : (
        <div>
          {selectedSlice === null ? <p>Выбери</p> : <Intensity selectedSlice={selectedSlice} onPartClick={onClickPart} />}
          <Pie setSelectedSlice={setSelectedSlice} />
        </div>
      )}
    </div>
  )
}
