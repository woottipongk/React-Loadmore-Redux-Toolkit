import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './reducers/counterSlice'
import contentSlice from './reducers/contentSlice';

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        contentSlice
    },
})