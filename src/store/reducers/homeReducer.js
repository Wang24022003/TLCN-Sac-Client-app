import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_category = createAsyncThunk(
    'product/get_categories',
    async(_, { fulfillWithValue }) => {
        try {
            const {data} = await api.get('/categories?current=1&pageSize=100')
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)
// End Method 


export const get_products = createAsyncThunk(
     'product/get_products',
     async(_, { fulfillWithValue }) => {
         try {
             const {data} = await api.get('/products?current=1&pageSize=100')
              console.log(data)
             return fulfillWithValue(data)
         } catch (error) {
             console.log(error.response)
         }
     }
 )
 // End Method 

 export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async ({ min, max }, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/products?current=1&pageSize=1111&min=${min}&max=${max}`);
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
        }
    }
)
// End Method




export const homeReducer = createSlice({
     name: 'home',
     initialState:{
          categories: [],
          products: [],
          latest_product : [],
          topRated_product : [],
          discount_product : [],
          priceRange : []
     },
     reducers : {
  
     },
     extraReducers: (builder) => {
      builder
      .addCase(get_category.fulfilled, (state, { payload }) => {
          state.categories = payload.data.result;
      })

      .addCase(get_products.fulfilled, (state, { payload }) => {
          state.products = payload.data.result;
          state.latest_product = payload.data.result;
          state.topRated_product = payload.data.result;
          state.discount_product = payload.data.result;
          //state.priceRange = payload.data.result;
      })


      .addCase(price_range_product.fulfilled, (state, { payload }) => {
        state.priceRange = payload.data.result;
        
    })
 
 
     }
 })

export default homeReducer.reducer