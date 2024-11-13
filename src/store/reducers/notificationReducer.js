import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_notifications = createAsyncThunk(
     'notifications/get_notifications',
     async(id, { rejectWithValue,fulfillWithValue }) => {
         try {
             //const token = localStorage.getItem("access_token");
 
             const  {data} = await api.get(`/notifications?userId=${id}`)
             
             return fulfillWithValue(data)
         } catch (error) {
             return rejectWithValue(error.response)
         }
     }
 )
 
 // End Method


 export const patch_notifications = createAsyncThunk(
     'notifications/patch_notifications',
     async(id = '', { rejectWithValue,fulfillWithValue }) => {
         try {
             const {data} = await api.patch(`/notifications/mark-as-read/${id}`)
             return fulfillWithValue(data)
         } catch (error) {
             return rejectWithValue(error.response)
         }
     }
 )
 
 // End Method

export const notificationReducer = createSlice({
     name: 'notification',
     initialState:{
          notificationss: [],
          notifications_count:0,
          
     },
     reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        noti_reset: (state,_) => {
            state.notifications_count = 0
        
      }
 
    },
     extraReducers: (builder) => {
      builder


      .addCase(get_notifications.pending, (state) => {
          state.loader = true;
      })
  
      .addCase(get_notifications.fulfilled, (state, { payload }) => {
          state.notificationss = payload.data.result; 
          state.notifications_count = state.notificationss.filter(
               (notification) => !notification.isRead
           ).length;

         

          //state.successMessage = payload.data.message;
          //state.loader = false;
      })
  
      .addCase(get_notifications.rejected, (state, { payload }) => {
          //state.errorMessage = payload.data.message; 
          state.loader = false;
      })


      .addCase(patch_notifications.fulfilled, (state, { payload }) => {
          // Cập nhật thông báo cụ thể thành đã đọc
          const index = state.notificationss.findIndex(
              (notification) => notification._id === payload.data._id
          );
          if (index !== -1) {
              state.notificationss[index].isRead = true;


              state.notifications_count = state.notificationss.filter(
               (notification) => !notification.isRead
           ).length;
          }
      })

      
     }
 })
 export const {noti_reset} = notificationReducer.actions
export default notificationReducer.reducer