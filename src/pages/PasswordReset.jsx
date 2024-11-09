import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../store/reducers/authReducer';

const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();


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

        console.log("🚀 ~ file: PasswordReset.jsx:45 ~ handleSubmit ~ confirmPassword:", confirmPassword);


        console.log("🚀 ~ file: PasswordReset.jsx:45 ~ handleSubmit ~ newPassword:", newPassword);

        setIsLoading(true); // Bắt đầu loading
        //toast.success('Mật khẩu đã được cập nhật thành công!');

        // Xóa thông tin khỏi localStorage và chuyển hướng đến trang đăng nhập
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('code');

        // Thiết lập thời gian chờ trước khi chuyển hướng
        setTimeout(() => {
            navigate('/login');
        }, 2000); // Thay đổi trang sau 3 giây

        setNewPassword('');
        setConfirmPassword('');

        // Tắt trạng thái loading sau 3 giây
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div style={styles.pageWrapper}>
            <Header />
            <div style={styles.container}>
                <h2 style={styles.title}>Đặt lại mật khẩu</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Mật khẩu mới:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            style={styles.input}
                            placeholder="Nhập mật khẩu mới"
                            required
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Xác nhận mật khẩu:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu"
                            required
                        />
                    </div>
                    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                    <button type="submit" style={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    pageWrapper: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
    },
    container: {
        maxWidth: '500px',
        width: '100%',
        padding: '20px',
        margin: '50px auto',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    inputContainer: {
        marginBottom: '15px',
        width: '100%',
        textAlign: 'left',
    },
    label: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#4b5563',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '12px',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        transition: 'border-color 0.2s',
    },
    error: {
        color: 'red',
        fontSize: '0.875rem',
        marginTop: '10px',
        textAlign: 'center',
    },
    submitButton: {
        padding: '12px',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#3b82f6',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '500',
        marginTop: '10px',
        transition: 'background-color 0.3s',
    },
};

export default PasswordReset;
