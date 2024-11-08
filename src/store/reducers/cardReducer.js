import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const add_to_card = createAsyncThunk(
    'card/add_to_card',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/carts/add',info) 
            
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const add_to_wishlist = createAsyncThunk(
    'dashboard/add_to_wishlist',
    async (info, { rejectWithValue }) => {
        try {
            // Lấy token từ localStorage
            const token = localStorage.getItem("access_token");
            
            // Gửi request với header Authorization chứa Bearer token
            const { data } = await api.post(`/like-products/add`, info, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
// End Method

export const get_wishlist_products = createAsyncThunk(
    'dashboard/get_wishlist_products',
    async (_, { rejectWithValue }) => {
        try {

            // const token = localStorage.getItem("access_token");
            
            // const { data } = await api.get(`/like-products/user`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });
            
            // return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
// End Method

export const cardReducer = createSlice({
    name: 'card',
    initialState:{
        card_products : [], 
        card_product_count: 0,
        wishlist_count : 0,
        wishlist: [],
        price: 0, 
        errorMessage : '',
        successMessage: '', 
        shipping_fee: 0,
        outofstock_products : []
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        reset_count: (state,_) => {
            state.card_product_count = 0
            state.wishlist_count = 0
        }
 
    },
    extraReducers: (builder) => {
        builder
        
        .addCase(add_to_wishlist.rejected, (state, { payload }) => {
            state.errorMessage = payload.error; 
        })
        .addCase(add_to_wishlist.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message; 
            //state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1   
            
        })

        .addCase(get_wishlist_products.fulfilled, (state, { payload }) => {
            
            state.wishlist_count = payload.data.items.length;
            state.wishlist = payload.data.items; 
        });
        
        
    }
})
export const {messageClear,reset_count} = cardReducer.actions
export default cardReducer.reducer