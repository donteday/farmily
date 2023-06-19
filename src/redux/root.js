import { configureStore } from '@reduxjs/toolkit'
import farmStore from './store/store'

export const store = configureStore({
    reducer: {
        counter: farmStore
    }
})

function sub() {
    localStorage.userDataTest = JSON.stringify(store.getState().counter);
  }
store.subscribe(sub);