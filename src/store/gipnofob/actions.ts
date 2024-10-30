import { createAsyncThunk } from '@reduxjs/toolkit'
import { useBackUrl } from '../../hooks'
import axios, { AxiosResponse } from 'axios'

export const save = createAsyncThunk<string, { id: number; score: number }>('gipnofob/save', async (params) => {
  const backUrl = useBackUrl()
  const response = (await axios.post(`${backUrl}/api/gipnofob/save`, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  })) as AxiosResponse<string>
  return response.data
})

export const checkSubscribe = createAsyncThunk<string, { id: number; groupId: number }>('gipnofob/subscribe', async (params) => {
  const backUrl = useBackUrl()
  const response = (await axios.post(`${backUrl}/api/gipnofob/checkSubscribe`, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  })) as AxiosResponse<string>
  console.log(response)
  return response.data
})

type ScoreResponse = { score: number; perSec: number }

export const getScore = createAsyncThunk<ScoreResponse, number>('gipnofob/getScore', async (id) => {
  const params = new URLSearchParams([['id', `${id}`]])
  const backUrl = useBackUrl()
  const response = (await axios.get(`${backUrl}/api/gipnofob/getScore`, { params })) as AxiosResponse<ScoreResponse>
  return response.data
})
