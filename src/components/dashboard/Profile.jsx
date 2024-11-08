import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth_account, auth_default_address } from '../../store/reducers/dashboardReducer';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, address } = useSelector(state => state.dashboard);

    console.log("🚀 ~ file: profile.jsx:11 ~ Profile ~ address:", address);


    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);


    useEffect(() => {
        dispatch(auth_account());
        dispatch(auth_default_address());
    }, [dispatch]);

    const handleEditClick = () => {
     navigate('/dashboard/edit-profile');
 };

    return (
        <div className='p-6 bg-white shadow-lg rounded-lg'>
            <div className='flex items-center mb-6'>
                <img 
                    src={user?.user?.avatar || 'https://via.placeholder.com/150'} 
                    alt="Avatar" 
                    className='w-20 h-20 rounded-full object-cover border-2 border-gray-300 mr-4' 
                />
                <div>
                    <h2 className='text-2xl font-semibold text-slate-600'>{user?.user?.name}</h2>
                    <p className='text-sm text-gray-500'>{user?.user?.email}</p>
                </div>
            </div>
            
            <h2 className='text-xl font-semibold text-slate-600 pb-3'>Hồ Sơ Của Tôi</h2>
            <p className='text-sm text-gray-500 mb-5'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            
            <div className='bg-gray-50 p-4 rounded-lg'>
                <form>
                    <div className='flex flex-col gap-4'>
                         <div className='flex flex-row gap-1 items-center'>
                              <label className='text-gray-700 font-medium mr-2'>Họ và tên:</label>
                              <p className='text-slate-700'>{user?.user?.name}</p>
                         </div>
                         <div className='flex flex-row gap-1 items-center'>
                              <label className='text-gray-700 font-medium mr-2'>Tuổi:</label>
                              <p className='text-slate-700'>{user?.user?.age}</p>
                         </div>
                         <div className='flex flex-row gap-1 items-center'>
                              <label className='text-gray-700 font-medium mr-2'>Email:</label>
                              <p className='text-slate-700'>{user?.user?.email}</p>
                         </div>

                        {/* Ô chọn giới tính */}
                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-700 font-medium'>Giới tính</label>
                            <div className='flex items-center gap-4'>
                                <label className='flex items-center'>
                                    <input 
                                        type="checkbox" 
                                        checked={user?.user?.gender === 'MALE'} 
                                        readOnly
                                        className='mr-2'
                                    />
                                    Nam
                                </label>
                                <label className='flex items-center'>
                                    <input 
                                        type="checkbox" 
                                        checked={user?.user?.gender === 'FEMALE'} 
                                        readOnly
                                        className='mr-2'
                                    />
                                    Nữ
                                </label>
                                <label className='flex items-center'>
                                    <input 
                                        type="checkbox" 
                                        checked={user?.user?.gender === 'OTHER'} 
                                        readOnly
                                        className='mr-2'
                                    />
                                    Khác
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </form>
            </div>

            {/* Nút Chỉnh sửa */}
            <div className='mt-6'>
                <button 
                    onClick={handleEditClick} 
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200'>
                    Chỉnh sửa
                </button>
            </div>
        </div>
    );
};

export default Profile;
