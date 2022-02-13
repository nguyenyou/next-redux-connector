import { createWrapper, HYDRATE } from 'next-redux-connector'
import { configureStore, createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action.payload)
      return {
        ...state,
        ...action.payload.counter,
      }
    },
  },
})

export const { increment, decrement } = counterSlice.actions

export const makeStore = () => {
  return configureStore({
    reducer: {
      [counterSlice.name]: counterSlice.reducer,
    },
  })
}

export const wrapper = createWrapper(makeStore)
