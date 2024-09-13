import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  value: false,
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
    
  },
})

// Action creators are generated for each case reducer function
export const { showandhide} = showSlice.actions

export default showSlice.reducer