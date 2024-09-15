import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  value: false,
  updatedFormValue: false,
}

export const showSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {
    showandhide: (state) => {
      let flag = state.value
      console.log(flag)
      state.value = !flag
    },
    updateformshowandhide: (state) => {
      let flag = state.updatedFormValue
      console.log(flag)
      state.updatedFormValue = !flag
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { showandhide, updateformshowandhide} = showSlice.actions

export default showSlice.reducer