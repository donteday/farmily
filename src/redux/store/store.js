import { createSlice } from '@reduxjs/toolkit'

const bedExmple = {
  plowed: false,
  plant: ''
};

const yardExmple = {
  plowed: false,
  pet: '',
};

export const counterSlice = createSlice({
  name: 'money',
  initialState: localStorage.userData
    ? JSON.parse(localStorage.userData)
    : {
      barnIn: false,
      money: 100,
      moneyMultiplier: 1,
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
          pet: '',
          moneyPerSecond: null
        },
        {
          plowed: false,
          pet: '',
          moneyPerSecond: null
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
    plowedYard: (state, index) => {
      state.dataBarn[index.payload].plowed = true;
    },
    bedAdd: (state) => {
      for (let i = 0; i < 5; i++) {
        state.dataGarden = [...state.dataGarden, bedExmple];
      }
    },
    yardAdd: (state) => {
        state.dataBarn = [...state.dataBarn, yardExmple];
    },
    setPlant: (state, action) => {
      state.dataGarden[action.payload.index].plant = action.payload.plant;
    },
    setPet: (state, action) => {
      state.dataBarn[action.payload.index].pet = action.payload.pet;
      state.dataBarn[action.payload.index].moneyPerSecond = action.payload.money;
      state.dataBarn[action.payload.index].sell = action.payload.sell;
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





export const { incrementMoney, plowed, plowedYard, bedAdd, yardAdd, setPlant, setPet, makeShopActiveItem, setSellPrice, setDatePlant, barnEnter} = counterSlice.actions

export default counterSlice.reducer