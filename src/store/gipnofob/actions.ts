import { createAsyncThunk } from '@reduxjs/toolkit'
import { useBackUrl } from '../../hooks'
import axios, { AxiosResponse } from 'axios'

export const save = createAsyncThunk<string, number>('gipnofob/save', async (score) => {
  const backUrl = useBackUrl()
  const response = (await axios.post(
    `${backUrl}/api/gipnofob/save`,
    { score },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )) as AxiosResponse<string>
  return response.data
})

export const getScore = createAsyncThunk<number, void>('gipnofob/getScore', async () => {
  const backUrl = useBackUrl()
  const response = (await axios.get(`${backUrl}/api/gipnofob/getScore`)) as AxiosResponse<number>
  return response.data
})
