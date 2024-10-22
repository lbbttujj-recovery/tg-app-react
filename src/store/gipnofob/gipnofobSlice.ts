import { createSlice } from '@reduxjs/toolkit'
import { getScore, save } from './actions'
type Status = 'success' | 'pending' | 'error' | null

type initialStateType = {
  score: {
    status: Status
    data: number
  }
  save: {
    status: Status
  }
}

const initialState: initialStateType = {
  score: {
    status: null,
    data: 0,
  },
  save: {
    status: null,
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
  },
})

export const gipnofobReducer = gipnofobSlice.reducer
