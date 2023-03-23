import { configureStore } from '@reduxjs/toolkit'
import { calcSlice } from './calcSlice'


export const store = configureStore({
  reducer: {
    calcItemsList: calcSlice.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch