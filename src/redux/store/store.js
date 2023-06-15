import { createSlice } from '@reduxjs/toolkit'

const bedExmple = {
  plowed: false,
  plant: ''
};

export const counterSlice = createSlice({
  name: 'money',
  initialState: !localStorage.userData
    ? JSON.parse(localStorage.userData)
    : {
      barnIn: false,
      money: 75,
      shopActiveItem: null,
      dataGarden: [
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

      ],
      dataBarn: [
        {
          plowed: true,
          pet: 'chicken',
          moneyPerSecond: 10
        },
        {
          plowed: false,
          pet: '',
        },
        {
          plowed: false,
          pet: '',
        }
      ]
    },
  reducers: {
    incrementMoney: (state, action) => {
      state.money += action.payload
    },
    plowed: (state, index) => {
      state.dataGarden[index.payload].plowed = true;
    },
    bedAdd: (state) => {
      for (let i = 0; i < 5; i++) {
        state.dataGarden = [...state.dataGarden, bedExmple];
      }
    },
    setPlant: (state, action) => {
      state.dataGarden[action.payload.index].plant = action.payload.plant;
    },
    setSellPrice: (state, action) => {
      state.dataGarden[action.payload.index].sell = action.payload.price;
    },
    makeShopActiveItem: (state, action) => {
      state.shopActiveItem = action.payload;
    },
    setDatePlant: (state, action) => {
      state.dataGarden[action.payload.index].date = action.payload.date;
      state.dataGarden[action.payload.index].namePlant = action.payload.namePlant;
      state.dataGarden[action.payload.index].riseTime = action.payload.riseTime;
    },
    barnEnter: (state) => {
      state.barnIn = !state.barnIn;
    }

  }
})





export const { incrementMoney, plowed, bedAdd, setPlant, makeShopActiveItem, setSellPrice, setDatePlant, barnEnter} = counterSlice.actions

export default counterSlice.reducer