import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retryPassword, messageClear } from '../store/reducers/authReducer';
import { toast } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);

    const [email, setEmail] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpRequest = (e) => {
     e.preventDefault();
     localStorage.setItem('email', email);
     //dispatch(setEmail(email)); 
     dispatch(retryPassword({ email })); 
 };
 

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate('/otp/forgot-password');
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    return (
        <div>
            {loader && (
                <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <div className="loader">Loading...</div>
                </div>
            )}
            <Header />
            <div className='container mx-auto p-8'>
                <h2 className='text-center text-2xl font-bold text-slate-600'>Xác minh tài khoản</h2>
                <form onSubmit={handleOtpRequest} className='mt-6 max-w-lg mx-auto bg-white p-6 rounded shadow'>
                    <div className='mb-4'>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            required
                            placeholder="Nhập email của bạn"
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        />
                    </div>
                    <button
                        type="submit"
                        className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md'
                    >
                        Gửi mã OTP
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default VerifyEmail;