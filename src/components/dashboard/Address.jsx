import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Address = () => {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: 'Lê Minh Quang',
            phone: '(+84) 971 035 440',
            addressLine1: '41/2a, Đường Đình Hội',
            addressLine2: 'Phường Phước Long B, Thành Phố Thủ Đức, TP. Hồ Chí Minh',
            isDefault: true,
            tags: []
        },
        {
            id: 2,
            name: 'Minh Quang',
            phone: '(+84) 971 035 440',
            addressLine1: 'Số 1421-thôn 5',
            addressLine2: 'Xã Long Tân, Huyện Phú Riềng, Bình Phước',
            isDefault: false,
            tags: ['Địa chỉ lấy hàng', 'Địa chỉ trả hàng']
        },
        {
            id: 3,
            name: 'Khánh Ngân',
            phone: '(+84) 984 372 670',
            addressLine1: 'Số 53, Tân Lập 1',
            addressLine2: 'Phường Hiệp Phú, Thành Phố Thủ Đức, TP. Hồ Chí Minh',
            isDefault: false,
            tags: []
        }
    ]);

    const handleSetDefault = (id) => {
        setAddresses(addresses.map(address => ({
            ...address,
            isDefault: address.id === id
        })));
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này không?')) {
            setAddresses(addresses.filter(address => address.id !== id));
        }
    };

    return (
     
        <div className="bg-white p-6 rounded-md ">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Địa chỉ của tôi</h2>
                <Link to="/add-address" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    + Thêm địa chỉ mới
                </Link>
            </div>
            
            <div className="space-y-6">
                {addresses.map((address) => (
                    <div key={address.id} className="border-b pb-4">
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold">
                                {address.name} <span className="font-normal text-gray-600">{address.phone}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link to={`/edit-address/${address.id}`} className="text-blue-500 hover:underline">
                                    Cập nhật
                                </Link>
                                <button
                                    onClick={() => handleDelete(address.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 text-gray-700">
                            <p>{address.addressLine1}</p>
                            <p>{address.addressLine2}</p>
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                            {address.isDefault && (
                                <span className="text-red-500 font-semibold border border-red-500 px-2 py-1 text-xs rounded">
                                    Mặc định
                                </span>
                            )}
                            {address.tags.map((tag, index) => (
                                <span key={index} className="border px-2 py-1 text-xs rounded text-gray-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {!address.isDefault && (
                            <button
                                onClick={() => handleSetDefault(address.id)}
                                className="mt-2 bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded hover:bg-gray-300"
                            >
                                Thiết lập mặc định
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Address;
