import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import instance from './../../api/axios-config';

export const get_category = createAsyncThunk(
    'product/get_categories',
    async(_, { fulfillWithValue }) => {
        // try {
        //     // const {data} = await api.get('/categories?current=1&pageSize=100')
        //     //
        //     // return fulfillWithValue(data)
        // } catch (error) {
        //     console.log(error.response)
        // }
        const re =await instance.get(`categories?current=1&pageSize=1000`);
        console.log("🚀 ~ file: homeReducer.js:18 ~ async ~ re:", re);

    }


)
// End Method 


export const query_product = createAsyncThunk(
     'product/query_product',
     async(query = '', { fulfillWithValue }) => {
         try {
            //  const {data} = await api.get(`/products?${query}`)
              
            //  return fulfillWithValue(data)
         } catch (error) {
             console.log(error.response)
         }
     }
 )
 // End Method 

//  export const product_details = createAsyncThunk(
//     'product/product_details',
//     async(id, { fulfillWithValue }) => {
        
//         try {
//             const {data} = await api.get(`/products/${id}`)
              
//             return fulfillWithValue(data)
//         } catch (error) {
//             console.log(error.response)
//         }
//     }
// )
// End Method 
 

export const product_details = createAsyncThunk(
    'product/product_details',
    async(id, { fulfillWithValue }) => {
        const token = localStorage.getItem("access_token");

        console.log("🚀 ~ file: homeReducer.js:54 ~ async ~ token:", token);

        if(token){
            try {
                const {data} = await api.get(`/products/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                  
                return fulfillWithValue(data)
            } catch (error) {
                console.log(error.response)
            }
        }
        else 
        {
            try {
                const {data} = await api.get(`/products/${id}`)
                  
                return fulfillWithValue(data)
            } catch (error) {
                console.log(error.response)
            }
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
          metadata : {
            "current": "1",
            "pageSize": "10",
            "pages": 0,
            "total": 0
        },
        product: {},
        relatedProducts: [],
        moreProducts: []
          
     },
     reducers : {
  
     },
     extraReducers: (builder) => {
      builder
      .addCase(get_category.fulfilled, (state, { payload }) => {
          state.categories = payload.data.result;
      })


 
    .addCase(query_product.fulfilled, (state, { payload }) => {
        state.products = payload.data.result;
        state.latest_product = payload.data.result;
          state.topRated_product = payload.data.result;
          state.discount_product = payload.data.result;
          state.metadata = payload.data.meta;
        
    })



    .addCase(product_details.fulfilled, (state, { payload }) => { 
        state.product = payload.data;
        state.relatedProducts = payload.data;
        state.moreProducts = payload.data; 
    })
 
     }
 })

export default homeReducer.reducer