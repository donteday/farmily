import { configureStore } from '@reduxjs/toolkit'
import moneyCounter from './money/moneySlice'

export const store = configureStore({
    reducer: {
        counter: moneyCounter
    }
})