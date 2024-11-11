import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 


export const address_province = createAsyncThunk(
     'dashboard/address_province',
     async(_, { rejectWithValue,fulfillWithValue }) => {
         try {
             //const token = localStorage.getItem("access_token");
 
             const  {data} = await api.get(`/address/province`)
             
             return fulfillWithValue(data)
         } catch (error) {
             return rejectWithValue(error.response)
         }
     }
 )
 
 // End Method 

 export const address_district = createAsyncThunk(
     'dashboard/address_district',
     async(id = '', { rejectWithValue,fulfillWithValue }) => {
         try {
             //const token = localStorage.getItem("access_token");
 
             const  {data} = await api.get(`/address/district?idProvince=${id}`)
             
             return fulfillWithValue(data)
         } catch (error) {
             return rejectWithValue(error.response)
         }
     }
 )
 
 // End Method 

 export const address_ward = createAsyncThunk(
     'dashboard/address_ward',
     async({ provinceId, districtId }, { rejectWithValue, fulfillWithValue }) => {
         try {
             const { data } = await api.get(`/address/ward?provinceId=${provinceId}&districtId=${districtId}`);
             return fulfillWithValue(data);
         } catch (error) {
             return rejectWithValue(error.response);
         }
     }
 );
 
 
 
 // End Method 



 export const add_address_user = createAsyncThunk(
     'auth/add_address_user',
     async(info, { rejectWithValue,fulfillWithValue }) => {
         try {
             const {data} = await api.post('/address-user',info)

             console.log("🚀 ~ file: addressReducer.js:63 ~ async ~ data:", data);

             //localStorage.setItem('access_token',data.access_token)
             
             return fulfillWithValue(data)
         } catch (error) {
             return rejectWithValue(error.response.data)
         }
     }
 )
 // End Method 

export const addressReducer = createSlice({
    name: 'address',
    initialState:{
        recentOrders : [], 
        errorMessage : '',
        errorMessages : null,
        successMessage: '', 
        totalOrder: 0,
        pendingOrder: 0,
        cancelledOrder: 0, 
        provinces:[],
        districts:[],
        wards:[],
       
    
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
        

        .addCase(address_province.pending, (state) => {
          state.loader = true;
      })
  
      .addCase(address_province.fulfilled, (state, { payload }) => {
          state.provinces = payload.data; 
          //state.successMessage = payload.data.message;
          //state.loader = false;
      })
  
      .addCase(address_province.rejected, (state, { payload }) => {
          //state.errorMessage = payload.data.message; 
          state.loader = false;
      })
    

      .addCase(address_district.pending, (state) => {
          state.loader = true;
      })
  
      .addCase(address_district.fulfilled, (state, { payload }) => {
          state.districts = payload.data; 
          //state.successMessage = payload.data.message;
          //state.loader = false;
      })
  
      .addCase(address_district.rejected, (state, { payload }) => {
          //state.errorMessage = payload.data.message; 
          state.loader = false;
      })




      .addCase(address_ward.pending, (state) => {
          state.loader = true;
      })
  
      .addCase(address_ward.fulfilled, (state, { payload }) => {
          state.wards = payload.data; 
          //state.successMessage = payload.data.message;
          //state.loader = false;
      })
  
      .addCase(address_ward.rejected, (state, { payload }) => {
          //state.errorMessage = payload.data.message; 
          state.loader = false;
      })


      .addCase(add_address_user.pending, (state) => {
          state.loader = true;
      })
  
      .addCase(add_address_user.fulfilled, (state, { payload }) => {


          //state.wards = payload.data; 
          state.successMessage = "Thêm địa chỉ thành công";
          //state.loader = false;
      })
  
      .addCase(add_address_user.rejected, (state, { payload }) => {


          state.errorMessages = payload.message; 
          state.loader = false;
      })
    

    }
})
export const {messageClear} = addressReducer.actions
export default addressReducer.reducer