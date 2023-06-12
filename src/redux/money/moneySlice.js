import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'money',
  initialState: {
    value: 75
  },
  reducers: {
    incrementMoney: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { incrementMoney } = counterSlice.actions

export default counterSlice.reducer