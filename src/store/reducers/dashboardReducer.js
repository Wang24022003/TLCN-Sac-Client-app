import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const auth_account = createAsyncThunk(
     'dashboard/auth_account',
     async (_, { rejectWithValue }) => {
         try {
             // Lấy token từ localStorage
             const token = localStorage.getItem("access_token");
             
             // Gửi request với header Authorization chứa Bearer token
             const { data } = await api.get(`/auth/account`, {
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
 
export const auth_edit_profile = createAsyncThunk(
    'dashboard/auth_edit_profile',
    async (data_profile, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");

            // Gửi yêu cầu PATCH để cập nhật hồ sơ với dữ liệu mới
            const { data } = await api.patch(`/auth/update-web-profile`, data_profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


// End Method 
export const auth_default_address = createAsyncThunk(
    'dashboard/auth_default_address',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");

            // Gửi yêu cầu PATCH để cập nhật hồ sơ với dữ liệu mới
            const { data } = await api.get(`/address-user/user/default-address`,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return fulfillWithValue(data); 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// End Method


export const auth_refresh = createAsyncThunk(
    'dashboard/auth_refresh',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");

            // Gửi yêu cầu PATCH để cập nhật hồ sơ với dữ liệu mới
            const { data } = await api.get(`auth/refresh`,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return fulfillWithValue(data); 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// End Method

export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState:{
        recentOrders : [], 
        errorMessage : '',
        successMessage: '', 
        totalOrder: 0,
        pendingOrder: 0,
        cancelledOrder: 0, 
        user:{},
        address:{}
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
        
    .addCase(auth_account.fulfilled, (state, { payload }) => { 
        state.user = payload.data;
        
    })

    .addCase(auth_refresh.fulfilled, (state, { payload }) => { 
        state.user = payload.data;
        
    })

    .addCase(auth_edit_profile.fulfilled, (state, { payload }) => {
        state.user = payload.data; // Update user info with the new profile data
        state.successMessage = "Profile updated successfully";
    })

    .addCase(auth_edit_profile.rejected, (state, { payload }) => {
        state.errorMessage = payload; // Store the error message in case of failure
    })


    .addCase(auth_default_address.pending, (state) => {
        state.loader = true;
    })
    .addCase(auth_default_address.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.address = payload.data;
        state.loader = false;
        
    })
    .addCase(auth_default_address.rejected, (state, { payload }) => {
        state.errorMessage = payload.message ;
        state.loader = false;
    })
        
    }
})
export const {messageClear} = dashboardReducer.actions
export default dashboardReducer.reducer