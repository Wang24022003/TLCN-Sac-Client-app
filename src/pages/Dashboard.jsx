import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FaBorderAll, FaGift, FaBell } from "react-icons/fa"; // Thêm FaGift và FaBell
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import api from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { retryPassword, user_reset } from '../store/reducers/authReducer';
import { reset_count } from '../store/reducers/cardReducer';
import { auth_account } from '../store/reducers/dashboardReducer';


const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth)
    const [filterShow, setFilterShow] =  useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const {user} = useSelector(state => state.dashboard)


    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);


    useEffect(() => {
        dispatch(auth_account())
    },[])




    const logout = async () => {
        try {
            localStorage.removeItem('access_token');
            dispatch(user_reset());
            dispatch(reset_count());
            navigate('/login');
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleRequestPasswordChange = () => {
        // Dispatch retryPassword với email từ userInfo
        dispatch(retryPassword({ email: userInfo.email }));
        localStorage.setItem('email', userInfo.email);
    };

    return (
        <div>
            <Header/>
            <div className='bg-slate-200 mt-5'>
                <div className='w-[90%] mx-auto md-lg:block hidden'>
                    <div>
                        <button onClick={() => setFilterShow(!filterShow)} className='text-center py-3 px-3 bg-green-500 text-white'><FaList/> </button>
                    </div> 
                </div>

                <div className='h-full mx-auto'>
                    <div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
                        <div className={`rounded-md z-50 md-lg:absolute ${filterShow ? '-left-4' : '-left-[360px]'} w-[270px] ml-4 bg-white`}>

                            <ul className='py-2 text-slate-600 px-4'> 
                                <div className="flex items-center gap-3 p-4 border-b">
                                    <img 
                                        src={user?.user?.avatar} 
                                        //src="http://res.cloudinary.com/dyhpycx4c/image/upload/v1730186934/new-img/eh8udjbm4x4zossupogb.png"
                                        alt="User Avatar" 
                                        className="w-10 h-10 rounded-full" 
                                    />
                                    {/* <span className="text-lg font-semibold">{userName}</span> */}
                                    <span className="text-lg font-semibold">{user?.user?.name}</span>
                                </div>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><IoIosHome /></span>
                                    <Link to='/dashboard' className='block' >Dashboard</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2 cursor-pointer' onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
                                    <span className='text-xl'><RiAccountCircleLine/></span>
                                    <span>Tài khoản của tôi</span>
                                </li>
                                {accountMenuOpen && (
                                    <ul className='pl-8 text-gray-500'>
                                        <li className='py-1'>
                                            <Link to='/dashboard/profile'>Hồ sơ</Link>
                                        </li>
                                        <li className='py-1'>
                                            <Link to='/dashboard/address'>Địa chỉ</Link>
                                        </li>
                                        <li className='py-1'>
                                            <Link to='/dashboard/otp' onClick={handleRequestPasswordChange}>Đổi mật khẩu</Link>
                                        </li>
                                        <li className='py-1'>
                                            <Link to='/dashboard/history'>Sản phẩm xem gần đây</Link>
                                        </li>
                                    </ul>
                                )}
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><FaBorderAll/></span>
                                    <Link to='/dashboard/my-orders' className='block' >My Orders</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><FaHeart/></span>
                                    <Link to='/dashboard/my-wishlist' className='block' >Wishlist</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><FaGift/></span>
                                    <Link to='/dashboard/voucher' className='block' >Kho Voucher</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><FaBell/></span>
                                    <Link to='/dashboard/notifications' className='block' >Thông Báo</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><IoChatbubbleEllipsesSharp/></span>
                                    <Link to='/dashboard/chat' className='block' >Chat</Link>
                                </li>
                                {/* <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><RiLockPasswordLine/></span>
                                    <Link to='/dashboard/change-password' className='block' >Change Password</Link>
                                </li> */}
                                <li className='flex justify-start items-center gap-2 py-2 cursor-pointer' onClick={logout}>
                                    <span className='text-xl'><IoMdLogOut/></span>
                                    <span>Logout</span>
                                </li>
                            </ul> 
                        </div>

                        <div className='w-[calc(100%-270px)] md-lg:w-full'>
                            <div className='mx-4 md-lg:mx-0'>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;
