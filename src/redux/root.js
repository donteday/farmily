import { configureStore } from '@reduxjs/toolkit'
import farmStore from './store/store'

export const store = configureStore({
    reducer: {
        counter: farmStore
    }
})

function sub() {
    console.log(1);
  }
store.subscribe(sub);