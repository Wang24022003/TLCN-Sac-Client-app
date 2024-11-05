import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

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
            
            console.log(data) 
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 


export const requestOtp = createAsyncThunk(
    'auth/requestOtp',
    async ({ email }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/auth/retry-active', { email });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const retryPassword = createAsyncThunk(
    'auth/retryPassword',
    async ({ email }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/auth/retry-password', { email });
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkOtp = createAsyncThunk(
    'auth/checkOtp',
    async ({ email, code }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/auth/check-code', { email, code });
            return fulfillWithValue(data);
            // const token = data.data.access_token; 
            // localStorage.setItem('access_token', token)
            //return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({ code, password, confirmPassword, email }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/auth/change-password', {  code, password, confirmPassword, email });
            return fulfillWithValue(data);
            // const token = data.data.access_token; 
            // localStorage.setItem('access_token', token)
            //return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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
        },
        setEmail: (state, action) => {
            state.email = action.payload; // Action để lưu email
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
            const userInfo = decodeToken(payload.data.access_token);
            state.successMessage = payload.message;
            state.loader = false;
            state.userInfo = userInfo;

          
            if (userInfo.isActive) {
                
            } else {
                state.errorMessage = "Tài khoản chưa được kích hoạt"; 
            }
        })



        .addCase(requestOtp.pending, (state) => {
            state.loader = true;
        })
        .addCase(requestOtp.fulfilled, (state, { payload }) => {
            state.successMessage = "Mã OTP đã được gửi thành công. Vui lòng kiểm tra email.";
            state.loader = false;
            
        })
        .addCase(requestOtp.rejected, (state, { payload }) => {
            state.errorMessage = payload.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
            state.loader = false;
        })


        .addCase(retryPassword.pending, (state) => {
            state.loader = true;
        })
        .addCase(retryPassword.fulfilled, (state, { payload }) => {
            state.successMessage = "Mã OTP đã được gửi thành công. Vui lòng kiểm tra email.";
            state.loader = false;
            
        })
        .addCase(retryPassword.rejected, (state, { payload }) => {
            state.errorMessage = payload.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
            state.loader = false;
        })

        .addCase(checkOtp.pending, (state) => {
            state.loader = true;
        })
        
        .addCase(checkOtp.fulfilled, (state, { payload }) => {
            const token = payload.data.access_token; 
            //localStorage.setItem('access_token', token);  // Lưu token vào localStorage
            //const userInfo = decodeToken(token); // Giải mã để lấy thông tin người dùng từ token
            state.successMessage = "Mã OTP đã được xác thực thành công";
            state.loader = false;
            //state.userInfo = userInfo; // Cập nhật thông tin người dùng trong Redux state
        })
        
        .addCase(checkOtp.rejected, (state, { payload }) => {
            state.errorMessage = payload?.message || "Mã OTP không hợp lệ";
            state.loader = false;
        })


        .addCase(changePassword.pending, (state) => {
            state.loader = true;
        })
        
        .addCase(changePassword.fulfilled, (state, { payload }) => {
            const token = payload.data.access_token; 
            //localStorage.setItem('access_token', token);  // Lưu token vào localStorage
            //const userInfo = decodeToken(token); // Giải mã để lấy thông tin người dùng từ token
            state.successMessage = payload.message;
            state.loader = false;
            //state.userInfo = userInfo; // Cập nhật thông tin người dùng trong Redux state
        })
        
        .addCase(changePassword.rejected, (state, { payload }) => {
            state.errorMessage = payload?.message || "Mã OTP không hợp lệ";
            state.loader = false;
        })
    }
})
export const {messageClear,user_reset, setEmail} = authReducer.actions
export default authReducer.reducer