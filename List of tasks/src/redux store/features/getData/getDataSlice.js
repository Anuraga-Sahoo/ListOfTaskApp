import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  formData: {
    title: '',
    description: '',
    date: '',
    priority: ''
  },
  storage : []
}

export const getDataSlice = createSlice({
  name: 'getData',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetFormData: (state) => {
      state.formData =  state.formData ;
    },
    storeData: (state,action) => {
      // const { name, value } = action.payload;
      // let data = state.formData[name]
      //  date = value;
      
      state.storage.push({...state.formData })
    }

  },
})

// Action creators are generated for each case reducer function
export const { updateFormData,resetFormData, storeData } = getDataSlice.actions

export default getDataSlice.reducer