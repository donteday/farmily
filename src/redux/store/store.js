import { createSlice } from '@reduxjs/toolkit'

const bedExmple = {
  plowed: false,
  plant: ''
};

export const counterSlice = createSlice({
  name: 'money',
  initialState: {
    money: 75,
    data: [
      {
        plowed: true,
        plant: '',
      },
      {
        plowed: true,
        plant: '',
      },
      {
        plowed: true,
        plant: '',
      },
      {
        plowed: true,
        plant: '',
      },
      {
        plowed: true,
        plant: '',
      },
      {
        plowed: false,
        plant: '',
      },
      {
        plowed: false,
        plant: '',
      },
      {
        plowed: false,
        plant: '',
      },
      {
        plowed: false,
        plant: '',
      },
      {
        plowed: false,
        plant: '',
      },
    
    ]
  },
  reducers: {
    incrementMoney: (state, action) => {
      state.money += action.payload
    },
    plowed: (state, index) => {
      state.data[index.payload].plowed = true;
    },
    bedAdd: (state) => {
      for (let i = 0; i < 5; i++) {
        state.data = [...state.data, bedExmple];
      }
    },
    setPlant: (state, action) => {
      state.data[action.payload.index].plant = action.payload.plant;
    },
  }
})



export const { incrementMoney, plowed, bedAdd, setPlant } = counterSlice.actions

export default counterSlice.reducer