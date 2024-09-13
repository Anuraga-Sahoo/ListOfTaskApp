import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  value: {title : "", description: "", date: "", priority:""},
}

export const getDataSlice = createSlice({
  name: 'getData',
  initialState,
  reducers: {
    userInput: (state) => {
      // let flag = state.value
      // console.log(flag)
      state.value = {...data, [state.value .target.name] : e.target.value}
    },
  },
})

// Action creators are generated for each case reducer function
export const { userInput} = getDataSlice.actions

export default getDataSlice.reducer