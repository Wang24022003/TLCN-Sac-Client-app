import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/auth/register',info)
            //localStorage.setItem('access_token',data.access_token)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const customer_login = createAsyncThunk(
    'auth/customer_login',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/auth/login',info)
            const token = data.data.access_token; 
            localStorage.setItem('access_token', token)
            //localStorage.setItem('access_token',data.access_token)
            console.log(data) 
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

const decodeToken = (access_token) => {
    if (access_token) {
        const userInfo = jwtDecode(access_token)
        return userInfo
    } else {
        return ''
    }
}
// End Method 



export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        loader : false,
        userInfo : decodeToken(localStorage.getItem('access_token')),
        errorMessage : '',
        successMessage: '', 
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        user_reset: (state,_) => {
            state.userInfo = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
        .addCase(customer_register.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(customer_register.rejected, (state, { payload }) => {
            state.errorMessage = payload.message;
            state.loader = false;
        })
        .addCase(customer_register.fulfilled, (state, { payload }) => {
            //const userInfo = decodeToken(payload.token)
            state.successMessage = payload.message;
            state.loader = false;
            //state.userInfo = userInfo
        })

        .addCase(customer_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(customer_login.rejected, (state, { payload }) => {
            state.errorMessage = payload.message;
            state.loader = false;
        })
        .addCase(customer_login.fulfilled, (state, { payload }) => {
            const userInfo = decodeToken(payload.data.access_token)
            state.successMessage = payload.message;
            state.loader = false;
            state.userInfo = userInfo
        })
    }
})
export const {messageClear,user_reset} = authReducer.actions
export default authReducer.reducer