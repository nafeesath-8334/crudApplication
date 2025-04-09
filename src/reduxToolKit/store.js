import { configureStore } from '@reduxjs/toolkit'
import olxReducer from './slice'

export const store = configureStore({
    reducer: {
        olx: olxReducer,
    },
})