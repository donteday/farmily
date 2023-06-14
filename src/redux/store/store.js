import { createSlice } from '@reduxjs/toolkit'

const bedExmple = {
  plowed: false,
  plant: ''
};

export const counterSlice = createSlice({
  name: 'money',
  initialState: {
    money: 75,
    shopActiveItem: null,
    data: [
      {
        plowed: true,
        plant: '',
        sell: 0,
      },
      {
        plowed: true,
        plant: '',
        sell: 0,
      },
      {
        plowed: true,
        plant: '',
        sell: 0,
      },
      {
        plowed: true,
        plant: '',
        sell: 0,
      },
      {
        plowed: true,
        plant: '',
        sell: 0,
      },
      {
        plowed: false,
        plant: '',
        sell: 0,
      },
      {
        plowed: false,
        plant: '',
        sell: 0,
      },
      {
        plowed: false,
        plant: '',
        sell: 0,
      },
      {
        plowed: false,
        plant: '',
        sell: 0,
      },
      {
        plowed: false,
        plant: '',
        sell: 0,
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
    setSellPrice: (state, action) => {
      state.data[action.payload.index].sell = action.payload.price;
    },
    makeShopActiveItem: (state, action) => {
      state.shopActiveItem = action.payload;
    },

  }
})



export const { incrementMoney, plowed, bedAdd, setPlant, makeShopActiveItem, setSellPrice } = counterSlice.actions

export default counterSlice.reducer