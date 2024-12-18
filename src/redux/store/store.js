import { createSlice} from '@reduxjs/toolkit';
// import axios from 'axios';

const bedExmple = {
  plowed: false,
  plant: ''
};

const yardExmple = {
  plowed: false,
  pet: '',
};

const dataGardenExample = [
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
const dataBarnExample = [
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

// const chatId = 205235580;

// export const fetchUserData = createAsyncThunk('users/fetchUserData', async () => {
//   const response = await axios.get(`/api/users/${chatId}`);
//   return response.data.userData; // Возвращаем полученные данные
// });

const localStore = localStorage.userDataTest2

const dataBarnStart = localStore ? JSON.parse(localStore).dataBarn : dataBarnExample;

const moneyStart = localStore ? JSON.parse(localStore).money : 100;

export const counterSlice = createSlice({
  name: 'money',
  initialState: {
    sound: true,
    view: 'garden',
    money: moneyStart,
    moneyMultiplier: 1,
    shopActiveItem: null,
    dataGarden: dataGardenExample,
    dataBarn: dataBarnStart,
    loading: true,
    error: null
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
    update: (state, action) => {
      state[action.payload.name] = action.payload.source;
    },
    setUserData: (state, action) => {
      state.dataGarden = action.payload; 
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUserData.pending, (state) => {
  //       state.loading = true; // Устанавливаем состояние загрузки
  //       state.error = null; // Сбрасываем ошибку
  //     })
  //     .addCase(fetchUserData.fulfilled, (state, action) => {
  //       state.loading = false; // Устанавливаем состояние загрузки в false
  //       state.dataGarden = action.payload; // Обновляем dataGarden
  //     })
  //     .addCase(fetchUserData.rejected, (state, action) => {
  //       state.loading = false; // Устанавливаем состояние загрузки в false
  //       state.error = action.error.message; // Сохраняем ошибку
  //     });
  // },
})





export const { incrementMoney, 
  plowed, 
  plowedYard, 
  bedAdd, 
  yardAdd, 
  setPlant,
  setLoading, 
  setPet, makeShopActiveItem, setSellPrice, setDatePlant, barnEnter, update, setUserData } = counterSlice.actions

export default counterSlice.reducer