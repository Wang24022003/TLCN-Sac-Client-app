import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-hot-toast';
import { checkOtp, customer_login, requestOtp } from '../../store/reducers/authReducer';
import { messageClear } from '../../store/reducers/dashboardReducer';
const OTP = () => {
    const [state, setState] = useState('all')

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);

    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [isNavigate, setIsNavigate] = useState(false);
    const email = localStorage.getItem('email'); 

    const [timer, setTimer] = useState(300);
   
    useEffect(() => {
        // Đếm ngược thời gian mỗi giây
        const countdown = setInterval(() => {
            setTimer(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);

        // Xóa bộ đếm ngược khi component bị hủy
        return () => clearInterval(countdown);
    }, []);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]?$/.test(value)) { // Chỉ cho phép nhập số từ 0 đến 9
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Tự động chuyển sang ô tiếp theo nếu đã nhập đủ 1 ký tự
            if (value && index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        localStorage.setItem('code', otpCode);
        dispatch(checkOtp({ email, code: otpCode }));
    };

    const handleCancel = () => {
        navigate(-1); // Quay lại trang trước
    };

    const handleResendOtp = (e) => {
        e.preventDefault();
        dispatch(requestOtp({email: email })) // Gọi API gửi lại mã OTP
            .then(() => {
                toast.success('Mã OTP đã được gửi lại vào email của bạn.');
            })
            .catch((error) => {
                toast.error(error.message || 'Có lỗi xảy ra khi gửi lại mã OTP.');
            });
            setIsNavigate(false)
    };
    
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setIsNavigate(true);
            if (isNavigate && id === 'retry-active') {
                dispatch(customer_login({
                    username: email,
                    password: localStorage.getItem('password')
                }));
                navigate('/');
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }
            else if ( id === 'register') {
                navigate('/login');
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }
            else if ( id === 'forgot-password') {
                navigate('/passwordreset');
                
            }
            else if ( id === 'otp') {
               navigate('/dashboard/change-password');
               console.log("Navigating to /dashboard/change-password");
               
           }
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
            setOtp(new Array(6).fill(''));
        }
    }, [successMessage, errorMessage]);

    // Chuyển đổi thời gian đếm ngược sang định dạng mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className='bg-white p-4 rounded-md'>
            
            <div style={styles.container}>
                <h2 style={styles.title}>Nhập mã OTP</h2>
                <div style={styles.separator}></div>
                <p style={styles.description}>
                    Vui lòng kiểm tra email của bạn để nhận tin nhắn chứa mã. Mã của bạn gồm 6 chữ số.
                </p>
                <form onSubmit={handleOtpSubmit} style={styles.form}>
                    <div style={styles.otpContainer}>
                        {otp.map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                id={`otp-input-${index}`}
                                value={otp[index]}
                                onChange={(e) => handleOtpChange(e, index)}
                                maxLength="1"
                                style={styles.otpInput}
                            />
                        ))}
                    </div>
                    <div style={styles.timer}>
                        {timer > 0 ? (
                            <span>Thời gian còn lại: <span style={{ color: 'red' }}>{formatTime(timer)}</span></span>
                        ) : (
                            <span style={{ color: 'red' }}>Mã đã hết hạn</span>
                        )}
                    </div>
                    <p style={styles.emailInfo}>Chúng tôi đã gửi mã của bạn đến: <strong>{email}</strong></p>
                    <div style={styles.separator}></div>
                    <div style={styles.actions}>
                        <button type="button" style={styles.link} onClick={handleResendOtp} disabled={timer > 0}>Chưa nhận được mã?</button>
                        <button type="button" onClick={handleCancel} style={styles.cancelButton}>Hủy</button>
                        <button 
                            type="submit" 
                            style={{
                                ...styles.submitButton,
                                backgroundColor: timer > 0 ? '#3b82f6' : '#e5e7eb', 
                                cursor: timer > 0 ? 'pointer' : 'not-allowed', 
                            }} 
                            disabled={timer > 0 ? false : true} 
                        >
                            Xác nhận
                        </button>

                    </div>
                </form>
            </div>
          
        </div>
    );
};



const styles = {
     container: {
         maxWidth: '40%',
         margin: '50px auto',
         padding: '20px',
         borderRadius: '10px',
         backgroundColor: '#ffffff',
         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
         textAlign: 'center',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
     },
     title: {
         fontSize: '1.5rem',
         fontWeight: 'bold',
         color: '#1f2937',
         marginBottom: '10px',
     },
     separator: {
         width: '100%',
         height: '1px',
         backgroundColor: '#e5e7eb',
         margin: '10px 0',
     },
     description: {
         fontSize: '1rem',
         color: '#6b7280',
         marginBottom: '20px',
         textAlign: 'center',
     },
     form: {
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         width: '100%',
     },
     otpContainer: {
         display: 'flex',
         justifyContent: 'space-evenly',
         width: '100%',
         marginBottom: '10px',
         flexWrap: 'wrap',
         gap: '8px',
     },
     otpInput: {
         flex: '1 1 45px',
         maxWidth: '45px',
         height: '45px',
         fontSize: '1.25rem',
         textAlign: 'center',
         border: '1px solid #d1d5db',
         borderRadius: '8px',
         color: '#4b5563',
     },
     timer: {
         fontSize: '0.9rem',
         color: '#6b7280',
         marginBottom: '20px',
         textAlign: 'center',
     },
     emailInfo: {
         fontSize: '0.85rem',
         color: '#6b7280',
         textAlign: 'center',
         marginTop: '10px',
     },
     actions: {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         width: '100%',
         marginTop: '10px',
         gap: '10px', // Thêm khoảng cách giữa các nút
     },
     link: {
         fontSize: '0.85rem',
         color: '#3b82f6',
         textDecoration: 'underline',
         cursor: 'pointer',
         flex: '1',
         textAlign: 'center',
     },
     cancelButton: {
         padding: '8px 16px',
         backgroundColor: '#e5e7eb',
         color: '#1f2937',
         border: 'none',
         borderRadius: '8px',
         fontSize: '1rem',
         fontWeight: '500',
         cursor: 'pointer',
         flex: '1',
         maxWidth: '100px',
         marginRight: '10px', // Tạo khoảng cách bên phải
     },
     submitButton: {
         padding: '8px 16px',
         backgroundColor: '#3b82f6',
         color: '#ffffff',
         border: 'none',
         borderRadius: '8px',
         fontSize: '1rem',
         fontWeight: '500',
         cursor: 'pointer',
         flex: '1',
         maxWidth: '100px',
         marginLeft: '10px', // Tạo khoảng cách bên trái
     },
 };

export default OTP;