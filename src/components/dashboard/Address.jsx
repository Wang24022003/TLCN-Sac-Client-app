import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_address_user, messageClear,  patch_address_user } from '../../store/reducers/dashboardReducer';
import toast from 'react-hot-toast';

const Address = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, address, successMessage,errorMessage} = useSelector(state => state.dashboard);

    useEffect(() => {
        if (user?.user?._id) {
            dispatch(get_address_user(`user=${user.user._id}`));
        }
    }, [user,address]);

    const handleSetDefault = (id) => {
        dispatch(patch_address_user(id));  
        
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());  
        }

         if (errorMessage) {



           
            navigate('/login');
            toast.success(errorMessage);
            dispatch(messageClear());  
        }

        

    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này không?')) {
            // Thực hiện hành động xóa địa chỉ (có thể bổ sung API để xóa)
        }
    };

    return (
        <div className="bg-white p-6 rounded-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Địa chỉ của tôi</h2>
                <Link to="/add-address" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    + Thêm địa chỉ mới
                </Link>
            </div>
            
            <div className="space-y-6">
                {address && address.length > 0 ? (
                    address.map((addr) => (
                        <div key={addr._id} className="border-b pb-4">
                            <div className="flex items-center justify-between">
                                <div className="text-lg font-semibold">
                                    {addr.receiver} <span className="font-normal text-gray-600">{addr.phone}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Link to={`/edit-address/${addr._id}`} className="text-blue-500 hover:underline">
                                        Cập nhật
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(addr._id)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 text-gray-700">
                                <p>{addr.specific}</p>
                                <p>{addr.wards}, {addr.districts}, {addr.province}</p>
                            </div>
                            <div className="mt-2 flex items-center space-x-2">
                                {addr.isDefault && (
                                    <span className="text-red-500 font-semibold border border-red-500 px-2 py-1 text-xs rounded">
                                        Mặc định
                                    </span>
                                )}
                            </div>
                            {!addr.isDefault && (
                                <button
                                    onClick={() => handleSetDefault(addr._id)}  // Sửa lại để gọi handleSetDefault
                                    className="mt-2 bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded hover:bg-gray-300"
                                >
                                    Thiết lập mặc định
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Không có địa chỉ nào.</p>
                )}
            </div>
        </div>
    );
};

export default Address;
