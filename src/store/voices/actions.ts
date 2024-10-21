import axios, { AxiosResponse } from 'axios'
import { useBackUrl } from '../../hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getSum = createAsyncThunk<string, void>('voice/getSum', async () => {
  const backUrl = useBackUrl()
  const response = await axios.get(`${backUrl}/api/voice/getSum`, { responseType: 'arraybuffer' })
  const audioData = response.data
  const blob = new Blob([audioData], { type: 'audio/mpeg' })
  return URL.createObjectURL(blob)
})

export const speechToText = createAsyncThunk<string, void>('voice/speechToText', async () => {
  const backUrl = useBackUrl()
  const response = (await axios.get(`${backUrl}/api/voice/speechToText`)) as AxiosResponse<string>
  return response.data
})

export const brief = createAsyncThunk<string, void>('voice/brief', async () => {
  const backUrl = useBackUrl()
  const response = (await axios.get(`${backUrl}/api/voice/brief`)) as AxiosResponse<string>
  return response.data
})

export const deleteAll = createAsyncThunk<string, void>('voice/deleteAll', async () => {
  const backUrl = useBackUrl()
  const response = await axios.delete(`${backUrl}/api/voice/delete`)
  return response.data
})

export const getVoices = createAsyncThunk<string[], void>('voice/getVoices', async () => {
  const backUrl = useBackUrl()
  const voicesName = (await axios.get(`${backUrl}/api/voice/getVoices`)) as AxiosResponse<string[]>
  const resVoices: string[] = []
  try {
    // Проходим по всем голосам
    for (const voice of voicesName.data) {
      const response = await axios.get(`${backUrl}/api/voice/getVoices/name`, {
        headers: { name: voice },
        responseType: 'arraybuffer',
      })

      const audioData = response.data
      const blob = new Blob([audioData], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(blob)

      resVoices.push(audioUrl)
    }
  } catch (error) {
    console.error('Ошибка при получении аудиофайла:', error)
  }
  return resVoices
})
