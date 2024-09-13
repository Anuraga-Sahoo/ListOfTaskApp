import { configureStore } from '@reduxjs/toolkit'
import showReducer from '../redux store/features/show/showSlice.js'
import getDataReducer from '../redux store/features/getData/getDataSlice.js'

export const store = configureStore({
  reducer: {
    show: showReducer ,
    getData: getDataReducer,
  },
})