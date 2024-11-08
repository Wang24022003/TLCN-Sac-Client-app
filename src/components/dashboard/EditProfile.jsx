import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth_account, auth_edit_profile, auth_refresh } from '../../store/reducers/dashboardReducer';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.dashboard);

    const [formData, setFormData] = useState({
        name: user?.user?.name || '',
        age: user?.user?.age || '',
        email: user?.user?.email || '',
        gender: user?.user?.gender || ''
    });

    useEffect(() => {
        dispatch(auth_account());
    }, [dispatch]);

    useEffect(() => {
        setFormData({
            name: user?.user?.name || '',
            age: user?.user?.age || '',
            email: user?.user?.email || '',
            gender: user?.user?.gender || ''
        });
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleGenderChange = (gender) => {
        setFormData(prevData => ({
            ...prevData,
            gender
        }));
    };

    const handleSaveClick = () => {
        const {gender, name, age }= formData;
        dispatch(auth_edit_profile({
            gender, name, age
            
          }));
          dispatch(auth_refresh());
        navigate('/dashboard/profile');
    };

    const handleCancelClick = () => {
        navigate('/dashboard/profile');
    };

    return (
        <div className='p-6 bg-white shadow-lg rounded-lg'>
            <h2 className='text-xl font-semibold text-slate-600 pb-3'>Chỉnh Sửa Hồ Sơ</h2>
            <p className='text-sm text-gray-500 mb-5'>Cập nhật thông tin hồ sơ của bạn</p>
            
            <div className='bg-gray-50 p-4 rounded-lg'>
                <form>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <label className='text-gray-700 font-medium'>Họ và tên:</label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                                className='p-2 border rounded'
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-gray-700 font-medium'>Tuổi:</label>
                            <input
                                type='number'
                                name='age'
                                value={formData.age}
                                onChange={handleInputChange}
                                className='p-2 border rounded'
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-gray-700 font-medium'>Email:</label>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                className='p-2 border rounded'
                                readOnly
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-gray-700 font-medium'>Giới tính</label>
                            <div className='flex items-center gap-4'>
                                <label className='flex items-center'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={formData.gender === 'MALE'}
                                        onChange={() => handleGenderChange('MALE')}
                                        className='mr-2'
                                    />
                                    Nam
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={formData.gender === 'FEMALE'}
                                        onChange={() => handleGenderChange('FEMALE')}
                                        className='mr-2'
                                    />
                                    Nữ
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={formData.gender === 'OTHER'}
                                        onChange={() => handleGenderChange('OTHER')}
                                        className='mr-2'
                                    />
                                    Khác
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className='mt-6 flex gap-4'>
                <button
                    onClick={handleSaveClick}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200'>
                    Lưu
                </button>
                <button
                    onClick={handleCancelClick}
                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200'>
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
