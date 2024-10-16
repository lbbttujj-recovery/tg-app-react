import { createSlice } from '@reduxjs/toolkit'
import { brief, getSum, getVoices, speechToText } from './actions'

type Status = 'success' | 'pending' | 'error' | null

type initialStateType = {
  voicesNames: {
    status: Status
    data: string[]
  }
  voiceSum: {
    status: Status
    data: string
  }
  speechToText: {
    status: Status
    data: string
  }
  brief: {
    status: Status
    data: string
  }
}

const initialState: initialStateType = {
  voicesNames: {
    status: null,
    data: [],
  },
  voiceSum: {
    status: null,
    data: '',
  },
  speechToText: {
    status: null,
    data: '',
  },
  brief: {
    status: null,
    data: '',
  },
}

export const voiceSlice = createSlice({
  name: 'voiceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVoices.pending, (state) => {
      state.voicesNames.status = 'pending'
    })
    builder.addCase(getVoices.rejected, (state) => {
      state.voicesNames.status = 'error'
    })
    builder.addCase(getVoices.fulfilled, (state, action) => {
      state.voicesNames.status = 'success'
      state.voicesNames.data = action.payload
    })

    builder.addCase(getSum.pending, (state) => {
      state.voiceSum.status = 'pending'
    })
    builder.addCase(getSum.rejected, (state) => {
      state.voiceSum.status = 'error'
    })
    builder.addCase(getSum.fulfilled, (state, action) => {
      state.voiceSum.status = 'success'
      state.voiceSum.data = action.payload
    })

    builder.addCase(speechToText.pending, (state) => {
      state.speechToText.status = 'pending'
    })
    builder.addCase(speechToText.rejected, (state) => {
      state.speechToText.status = 'error'
    })
    builder.addCase(speechToText.fulfilled, (state, action) => {
      state.speechToText.status = 'success'
      state.speechToText.data = action.payload
    })

    builder.addCase(brief.pending, (state) => {
      state.brief.status = 'pending'
    })
    builder.addCase(brief.rejected, (state) => {
      state.brief.status = 'error'
    })
    builder.addCase(brief.fulfilled, (state, action) => {
      state.brief.status = 'success'
      state.brief.data = action.payload
    })
  },
})

export const voiceReducer = voiceSlice.reducer
