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
      return {
        ...state,
        ...action.payload.counter,
      }
    },
  },
})

export const greetingSlice = createSlice({
  name: 'greeting',
  initialState: {
    message: 'Hello world',
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.greeting,
      }
    },
  },
})

export const { increment, decrement } = counterSlice.actions
export const { setMessage } = greetingSlice.actions

export const makeStore = () => {
  return configureStore({
    reducer: {
      [counterSlice.name]: counterSlice.reducer,
      [greetingSlice.name]: greetingSlice.reducer,
    },
  })
}

export const wrapper = createWrapper(makeStore)
