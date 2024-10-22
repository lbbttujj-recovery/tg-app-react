import { configureStore } from '@reduxjs/toolkit'
import { voiceReducer } from './voices/voiceSlice'
import { gipnofobReducer } from './gipnofob/gipnofobSlice'

export const store = configureStore({
  reducer: {
    voice: voiceReducer,
    gipnofob: gipnofobReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
