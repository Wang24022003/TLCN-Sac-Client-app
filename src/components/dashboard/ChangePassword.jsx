import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1); // Quay lại trang trước
    };


    const email = localStorage.getItem('email');
    const code = localStorage.getItem('code');

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu không trùng khớp');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        //setErrorMessage('');
        dispatch(changePassword({ code, "password":newPassword, "confirmPassword":confirmPassword, email }));

        toast.success('Đổi mật khẩu thành công');
        
        setIsLoading(true); // Bắt đầu loading
        //toast.success('Mật khẩu đã được cập nhật thành công!');

        // Xóa thông tin khỏi localStorage và chuyển hướng đến trang đăng nhập
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('code');

        // Thiết lập thời gian chờ trước khi chuyển hướng
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000); // Thay đổi trang sau 3 giây

        setNewPassword('');
        setConfirmPassword('');

        // Tắt trạng thái loading sau 3 giây
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className='p-6 bg-white shadow-lg rounded-lg'>
            <h2 className='text-2xl font-bold text-gray-700 mb-6'>Thay đổi mật khẩu</h2>
        
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='flex flex-col'>
                    <label htmlFor="new_password" className="text-sm font-medium text-gray-600">Mật khẩu mới</label>
                    <input 
                        className='outline-none px-4 py-2 border border-gray-300 rounded-md focus:border-[#059473] transition text-gray-700' 
                        type="password" 
                        value={newPassword}
                        onChange={handlePasswordChange}
                        name="new_password" 
                        id="new_password"  
                        placeholder='Nhập mật khẩu mới'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="confirm_password" className="text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
                    <input 
                        className='outline-none px-4 py-2 border border-gray-300 rounded-md focus:border-[#059473] transition text-gray-700' 
                        type="password" 
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        name="confirm_password" 
                        id="confirm_password"  
                        placeholder='Xác nhận mật khẩu mới'
                    />
                </div>

                <div className="flex gap-3 justify-start">
                    <button 
                        type="button"
                        onClick={handleCancel}
                        className='px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-lg hover:bg-gray-400 transition'>
                        Hủy
                    </button>
                    <button 
                        type="submit"
                        className='px-4 py-2 bg-[#059473] text-white font-semibold rounded-md shadow-lg hover:bg-[#037d5f] transition'>
                        Cập nhật mật khẩu
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
