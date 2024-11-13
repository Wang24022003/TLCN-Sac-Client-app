import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get_notifications, patch_notifications } from '../../store/reducers/notificationReducer';
import { format, formatDistanceToNow, parseISO } from 'date-fns';


const Notifications = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { notificationss} = useSelector(state => state.notification);
    const [notifications, setNotifications] = useState([]);
    const { user, address, successMessage,errorMessage} = useSelector(state => state.dashboard);
    
    useEffect(() => {
        if (user?.user?._id) {
            dispatch(get_notifications(`${user.user._id}`));
        }
    }, [user,dispatch]);


    const markAllAsRead = () => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => ({
                ...notification,
                isRead: true,
            }))
        );
    };


    const handleNotificationClick = (notification) => {
        // Nếu thông báo chưa đọc, đánh dấu là đã đọc
        if (!notification.isRead) {
            dispatch(patch_notifications(notification._id));
            
        }
        // Điều hướng đến trang liên kết (nếu có)
        if (notification.navigate) {
            window.open(notification.navigate, '_blank');
        }
    };

    const unreadCount = notificationss.filter(notification => !notification.isRead).length;

    return (
        <div className="bg-white p-6 rounded-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Thông báo</h2>
                {/* <span className="text-red-500">{unreadCount} thông báo chưa đọc</span> */}
                <button onClick={markAllAsRead} className="text-blue-500 hover:underline">
                    Đánh dấu đã xem tất cả
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {notificationss.map((notification) => (
                    <div
                        key={notification.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200
                            ${
                                notification.isRead
                                    ? 'bg-white hover:bg-gray-100' // Màu trắng cho thông báo đã đọc, hover thành xám nhạt
                                    : 'bg-green-100 hover:bg-white' // Màu xanh nhạt cho thông báo chưa đọc, hover thành trắng
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                    >
                        <img 
                            src="https://img.icons8.com/ios/452/bell.png" // Ảnh chuông từ Icons8
                            alt="icon"
                            className="w-12 h-12 mr-4"
                        />


                        <div className="flex-grow">
                            <h4 className="text-lg font-semibold text-gray-800">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                           
                            <div className="text-xs text-gray-500">
                                {/* Hiển thị ngày tháng theo định dạng "Ngày, Tháng, Năm" */}
                                {format(parseISO(notification.createdAt), 'dd/MM/yyyy HH:mm')}
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            {/* Hiển thị thời gian từ hiện tại */}
                            <div className="text-xs text-gray-500 mb-2">
                                {formatDistanceToNow(parseISO(notification.createdAt), { addSuffix: true })}
                            </div>
                            {/* <button
                                className="px-3 py-1 border border-gray-300 text-black rounded
                                    hover:text-red-500 hover:border-red-500 transition-colors duration-200"
                            >
                                Xem chi tiết
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
