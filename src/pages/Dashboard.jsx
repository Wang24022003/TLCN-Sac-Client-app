import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList } from 'react-icons/fa';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FaBorderAll, FaGift, FaBell, FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiAccountCircleLine } from "react-icons/ri";
import api from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import {  customer_logout, messageClear, retryPassword, user_reset } from '../store/reducers/authReducer';
import { reset_count } from '../store/reducers/cardReducer';
import { auth_account } from '../store/reducers/dashboardReducer';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const [filterShow, setFilterShow] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('dashboard'); 
    const { user } = useSelector(state => state.dashboard);

    useEffect(() => {
        
        dispatch(auth_account());
    }, []);

    const logout = async () => {
        try {
            const response = await api.post('/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            localStorage.removeItem('access_token');
            dispatch(user_reset());
            dispatch(reset_count());
            navigate('/login');
            toast.success(response.data.message || 'Logout thành công');
            dispatch(messageClear());
        } catch (error) {
            console.error("Logout Error: ", error);
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi logout');
        }
    };

    const handleRequestPasswordChange = () => {
        dispatch(retryPassword({ email: userInfo.email }));
        localStorage.setItem('email', userInfo.email);
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        // Cập nhật selectedMenu dựa trên đường dẫn hiện tại
        if (path.includes('/dashboard/profile')) {
            setSelectedMenu('profile');
        } else if (path.includes('/dashboard/address')) {
            setSelectedMenu('address');
        } else if (path.includes('/dashboard/otp')) {
            setSelectedMenu('change-password');
        } else if (path.includes('/dashboard/history')) {
            setSelectedMenu('history');
        } else if (path.includes('/dashboard/my-orders')) {
            setSelectedMenu('my-orders');
        } else if (path.includes('/dashboard/my-wishlist')) {
            setSelectedMenu('my-wishlist');
        } else if (path.includes('/dashboard/voucher')) {
            setSelectedMenu('voucher');
        } else if (path.includes('/dashboard/notifications')) {
            setSelectedMenu('notifications');
        } else if (path.includes('/dashboard/chat')) {
            setSelectedMenu('chat');
        } else {
            setSelectedMenu('dashboard'); 
        }
    }, [location.pathname]);
    

    return (
        <div>
            <Header />
            <div className='bg-slate-200 mt-5'>
                <div className='w-[90%] mx-auto md-lg:block hidden'>
                    <div>
                        <button onClick={() => setFilterShow(!filterShow)} className='text-center py-3 px-3 bg-green-500 text-white'><FaList /> </button>
                    </div>
                </div>

                <div className='h-full mx-auto'>
                    <div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
                        <div className={`rounded-md z-50 md-lg:absolute ${filterShow ? '-left-4' : '-left-[360px]'} w-[270px] ml-4 bg-white`}>
                            <ul className='py-2 text-slate-600 px-4'>
                                <div className="flex items-center gap-3 p-4 border-b">
                                    <img
                                        src={user?.user?.avatar}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="text-lg font-semibold">{user?.user?.name}</span>
                                </div>

                                <li className={`flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer ${selectedMenu === 'dashboard' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white' : 'hover:bg-slate-100'}`} onClick={() => handleMenuClick('dashboard')}>
                                    <span className='text-xl'><IoIosHome /></span>
                                    <Link to='/dashboard' className='block'>Dashboard</Link>
                                </li>

                                <li className={`flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer ${selectedMenu === 'account' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white' : 'hover:bg-slate-100'}`} onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
                                    <span className='text-xl'><RiAccountCircleLine /></span>
                                    <span onClick={() => handleMenuClick('account')}>Tài khoản của tôi</span>
                                </li>

                                {accountMenuOpen && (
                                    <ul className='pl-8 text-gray-500'>
                                        <li className={`py-1 px-3 ${selectedMenu === 'profile' ? 'bg-green-300 text-white rounded' : 'hover:bg-green-100'}`}>
                                            <Link to='/dashboard/profile' onClick={() => handleMenuClick('profile')}>Hồ sơ</Link>
                                        </li>
                                        <li className={`py-1 px-3 ${selectedMenu === 'address' ? 'bg-green-300 text-white rounded' : 'hover:bg-green-100'}`}>
                                            <Link to='/dashboard/address' onClick={() => handleMenuClick('address')}>Địa chỉ</Link>
                                        </li>
                                        <li className={`py-1 px-3 ${selectedMenu === 'change-password' ? 'bg-green-300 text-white rounded' : 'hover:bg-green-100'}`}>
                                            <Link to='/dashboard/otp' onClick={() => { handleMenuClick('change-password'); handleRequestPasswordChange(); }}>Đổi mật khẩu</Link>
                                        </li>
                                        <li className={`py-1 px-3 ${selectedMenu === 'history' ? 'bg-green-300 text-white rounded' : 'hover:bg-green-100'}`}>
                                            <Link to='/dashboard/history' onClick={() => handleMenuClick('history')}>Sản phẩm xem gần đây</Link>
                                        </li>
                                    </ul>
                                )}

                                <li className={`flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer ${selectedMenu === 'my-orders' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white' : 'hover:bg-slate-100'}`} onClick={() => handleMenuClick('my-orders')}>
                                    <span className='text-xl'><FaBorderAll /></span>
                                    <Link to='/dashboard/my-orders' className='block'>My Orders</Link>
                                </li>

                                <li className={`flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer ${selectedMenu === 'wishlist' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white' : 'hover:bg-slate-100'}`} onClick={() => handleMenuClick('wishlist')}>
                                    <span className='text-xl'><FaHeart /></span>
                                    <Link to='/dashboard/my-wishlist' className='block'>Wishlist</Link>
                                </li>

                                <li className={`flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer ${selectedMenu === 'voucher' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white' : 'hover:bg-slate-100'}`} onClick={() => handleMenuClick('voucher')}>
                                    <span className='text-xl'><FaGift /></span>
                                    <Link to='/dashboard/voucher' className='block'>Kho Voucher</Link>
                                </li>

                                <li className={`flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer ${selectedMenu === 'notifications' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white' : 'hover:bg-slate-100'}`} onClick={() => handleMenuClick('notifications')}>
                                    <span className='text-xl'><FaBell /></span>
                                    <Link to='/dashboard/notifications' className='block'>Thông Báo</Link>
                                </li>

                                <li className={`flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer ${selectedMenu === 'chat' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white' : 'hover:bg-slate-100'}`} onClick={() => handleMenuClick('chat')}>
                                    <span className='text-xl'><IoChatbubbleEllipsesSharp /></span>
                                    <Link to='/dashboard/chat' className='block'>Chat</Link>
                                </li>

                                <li className='flex items-center gap-2 py-3 px-4 rounded-lg cursor-pointer hover:bg-red-100' onClick={logout}>
                                    <span className='text-xl text-red-500'><IoMdLogOut /></span>
                                    <span className="text-red-500">Logout</span>
                                </li>
                            </ul>
                        </div>

                        <div className='w-[calc(100%-270px)] md-lg:w-full'>
                            <div className='mx-4 md-lg:mx-0'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
