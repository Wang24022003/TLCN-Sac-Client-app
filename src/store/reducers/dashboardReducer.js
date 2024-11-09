import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const auth_account = createAsyncThunk(
     'dashboard/auth_account',
     async (_, { rejectWithValue,fulfillWithValue }) => {
         try {
             // Lấy token từ localStorage
             const token = localStorage.getItem("access_token");
             
             // Gửi request với header Authorization chứa Bearer token
             const { data } = await api.get(`/auth/account`, {
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
             });
             
             return fulfillWithValue(data); 
         } catch (error) {
             return rejectWithValue(error.response?.data || error.message);
         }
     }
 );
// End Method 
 
export const auth_edit_profile = createAsyncThunk(
    'dashboard/auth_edit_profile',
    async (data_profile, { rejectWithValue,fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");

            // Gửi yêu cầu PATCH để cập nhật hồ sơ với dữ liệu mới
            const { data } = await api.patch(`/auth/update-web-profile`, data_profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return fulfillWithValue(data);  
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


// End Method 
// export const auth_default_address = createAsyncThunk(
//     'dashboard/auth_default_address',
//     async (_, { rejectWithValue, fulfillWithValue }) => {
//         try {
//             const token = localStorage.getItem("access_token");

//             // Gửi yêu cầu PATCH để cập nhật hồ sơ với dữ liệu mới
//             const { data } = await api.get(`/address-user/user/default-address`,  {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             return fulfillWithValue(data); 
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
// End Method


export const auth_refresh = createAsyncThunk(
    'dashboard/auth_refresh',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token_old = localStorage.getItem("access_token");

            console.log("🚀 ~ file: dashboardReducer.js:76 ~ token_old:", token_old);


            // Gửi yêu cầu PATCH để cập nhật hồ sơ với dữ liệu mới
            const { data } = await api.get(`auth/refresh`,  {
                headers: {
                    Authorization: `Bearer ${token_old}}`,
                },
            });

            const token = data.data.access_token; 
            console.log("🚀 ~ file: dashboardReducer.js:95 ~ token:", token);

            localStorage.setItem('access_token', token)
            return fulfillWithValue(data); 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// End Method


export const files_file = createAsyncThunk(
    'dashboard/files_file',
    async (data_profile, { rejectWithValue,fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("access_token");

            // Gửi yêu cầu PATCH để cập nhật hồ sơ với dữ liệu mới
            const { data } = await api.patch(`/files/file`, data_profile, {
                headers: {

                    

                    Authorization: `Bearer ${token}`,
                },
            });
            //console.log("🚀 ~ file: dashboardReducer.js:110 ~ data:", data);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// End Method


export const get_product_history = createAsyncThunk(
    'dashboard/get_product_history',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {

            const token = localStorage.getItem("access_token");
            
            const { data } = await api.get(`/products/product/recent`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
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
        address:{},
        image:"",
        history:[]
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
        

    .addCase(auth_account.pending, (state) => {
        state.loader = true;
    })

    .addCase(auth_account.fulfilled, (state, { payload }) => {
        state.user = payload.data; 
        state.successMessage = payload.message;
    })

    .addCase(auth_account.rejected, (state, { payload }) => {
        state.errorMessage = payload.message; 
    })


    .addCase(auth_refresh.pending, (state) => {
        state.loader = true;
    })

    .addCase(auth_refresh.fulfilled, (state, { payload }) => {
        state.user = payload.data; 
        state.successMessage = payload.message;
    })

    .addCase(auth_refresh.rejected, (state, { payload }) => {
        state.errorMessage = payload.message; 
    })


    .addCase(auth_edit_profile.pending, (state) => {
        state.loader = true;
    })

    .addCase(auth_edit_profile.fulfilled, (state, { payload }) => {
        state.user = payload.data; 
        state.successMessage = payload.message;
    })

    .addCase(auth_edit_profile.rejected, (state, { payload }) => {
        state.errorMessage = payload.message; 
    })



    // .addCase(auth_default_address.pending, (state) => {
    //     state.loader = true;
    // })
    // .addCase(auth_default_address.fulfilled, (state, { payload }) => {
    //     state.successMessage = payload.message;
    //     state.address = payload.data;
    //     state.loader = false;
        
    // })
    // .addCase(auth_default_address.rejected, (state, { payload }) => {
    //     state.errorMessage = payload.message ;
    //     state.loader = false;
    // })
        



    .addCase(files_file.pending, (state) => {
        state.loader = true;
    })

    .addCase(files_file.fulfilled, (state, { payload }) => {
        state.image = payload.data; // Update user info with the new profile data
        state.successMessage = payload.message;
    })

    .addCase(files_file.rejected, (state, { payload }) => {
        state.errorMessage = payload.message; // Store the error message in case of failure
    })


    .addCase(get_product_history.pending, (state) => {
        state.loader = true;
    })

    .addCase(get_product_history.fulfilled, (state, { payload }) => {
        state.history = payload.data; 
        state.successMessage = payload.message;
    })

    .addCase(get_product_history.rejected, (state, { payload }) => {
        state.errorMessage = payload.message; 
    })

    }
})
export const {messageClear} = dashboardReducer.actions
export default dashboardReducer.reducer