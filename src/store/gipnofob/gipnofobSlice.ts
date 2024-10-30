import { createSlice } from '@reduxjs/toolkit'
import { checkSubscribe, getScore, save } from './actions'
type Status = 'success' | 'pending' | 'error' | null

type initialStateType = {
  score: {
    status: Status
    data: {
      score: number
      perSec: number
    }
  }
  save: {
    status: Status
  }
  checkSubscribe: {
    status: Status
    data: string
  }
}

const initialState: initialStateType = {
  score: {
    status: null,
    data: {
      score: 0,
      perSec: 0,
    },
  },
  save: {
    status: null,
  },
  checkSubscribe: {
    status: null,
    data: '',
  },
}

export const gipnofobSlice = createSlice({
  name: 'gipnofobSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getScore.pending, (state) => {
      state.score.status = 'pending'
    })
    builder.addCase(getScore.rejected, (state) => {
      state.score.status = 'error'
    })
    builder.addCase(getScore.fulfilled, (state, action) => {
      state.score.status = 'success'
      state.score.data = action.payload
    })

    builder.addCase(save.pending, (state) => {
      state.score.status = 'pending'
    })
    builder.addCase(save.rejected, (state) => {
      state.score.status = 'error'
    })
    builder.addCase(save.fulfilled, (state) => {
      state.score.status = 'success'
    })

    builder.addCase(checkSubscribe.pending, (state) => {
      state.score.status = 'pending'
    })
    builder.addCase(checkSubscribe.rejected, (state) => {
      state.score.status = 'error'
    })
    builder.addCase(checkSubscribe.fulfilled, (state, action) => {
      state.score.status = 'success'
      state.checkSubscribe.data = action.payload
    })
  },
})

export const gipnofobReducer = gipnofobSlice.reducer
