import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_category = createAsyncThunk(
    'product/get_categories',
    async(_, { fulfillWithValue }) => {
        try {
            const {data} = await api.get('/categories?current=1&pageSize=100')
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)
// End Method 


export const homeReducer = createSlice({
     name: 'home',
     initialState:{
         result : [],
     },
     reducers : {
  
     },
     extraReducers: (builder) => {
      builder
      .addCase(get_category.fulfilled, (state, { payload }) => {
          state.result = payload.data.result;
      })
 
     }
 })

export default homeReducer.reducer