import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useTheme } from '../contexts/ThemeContext';

function Login() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [emailError, setEmailError] = useState('');

  /** 이메일 유효성 검사 */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /** 로그인 요청 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setEmailError('');

    if (!validateEmail(formData.username)) {
      setEmailError('유효한 이메일 형식이 아닙니다.');
      return;
    }

    try {
      await authService.login(formData.username, formData.password);
      navigate('/books');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  /** 입력 변경 핸들러 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'username') {
      setEmailError('');
    }
  };

  /** 회원가입 페이지 이동 */
  const handleRegister = () => {
    navigate('/register');
  };

  /** 비밀번호 찾기 (미구현) */
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 96px)',
      display: 'flex', 
      flexDirection: 'column', 
      background: isDarkMode ? '#1a1a1a' : '#f6f8fa',
      paddingTop: '40px'
    }}>
      {/* 상단 제목 */}
      <div style={{ 
        marginBottom: '60px',
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center'
      }}>
        <h2 style={{ 
          fontSize: 38, 
          fontWeight: 700, 
          color: isDarkMode ? '#e5e7eb' : '#2d4663', 
          letterSpacing: 2, 
          background: isDarkMode ? 'rgba(45, 45, 45, 0.85)' : 'rgba(255, 255, 255, 0.85)', 
          padding: '12px 36px', 
          borderRadius: 12, 
          boxShadow: isDarkMode ? '0 2px 12px rgba(0, 0, 0, 0.2)' : '0 2px 12px rgba(53, 87, 119, 0.07)'
        }}>
          걷기가서재_"작가의산책"
        </h2>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{
          width: 380,
          background: isDarkMode ? '#2d2d2d' : '#fff',
          borderRadius: 16,
          boxShadow: isDarkMode ? '0 4px 24px rgba(0, 0, 0, 0.2)' : '0 4px 24px rgba(53, 87, 119, 0.10)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h1 style={{ 
            fontSize: 32, 
            fontWeight: 700, 
            marginBottom: 32, 
            color: isDarkMode ? '#e5e7eb' : '#2d4663', 
            letterSpacing: 2 
          }}>로그인</h1>
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <input
              type="email"
              name="username"
              placeholder="이메일 입력"
              value={formData.username}
              onChange={handleChange}
              style={{ 
                padding: '12px', 
                borderRadius: 8, 
                border: `1px solid ${emailError ? '#ef4444' : isDarkMode ? '#4a5568' : '#cfd8dc'}`,
                fontSize: 16, 
                marginBottom: 4,
                background: isDarkMode ? '#1a1a1a' : '#fff',
                color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
              }}
              required
            />
            {emailError && (
              <div style={{ 
                color: '#ef4444', 
                fontSize: 12, 
                marginTop: -2,
                marginBottom: 4 
              }}>
                {emailError}
              </div>
            )}
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              style={{ 
                padding: '12px', 
                borderRadius: 8, 
                border: `1px solid ${isDarkMode ? '#4a5568' : '#cfd8dc'}`,
                fontSize: 16, 
                marginBottom: 12,
                background: isDarkMode ? '#1a1a1a' : '#fff',
                color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
              }}
              required
            />
            <button 
              type="submit" 
              style={{ 
                padding: '12px', 
                borderRadius: 8, 
                background: isDarkMode ? '#3b82f6' : '#2563eb', 
                color: '#fff', 
                fontWeight: 700, 
                fontSize: 18, 
                border: 'none', 
                marginTop: 8, 
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              로그인
            </button>
            <button 
              type="button" 
              onClick={handleRegister}
              style={{ 
                padding: '12px', 
                borderRadius: 8, 
                background: isDarkMode ? '#2d2d2d' : '#fff', 
                color: isDarkMode ? '#60a5fa' : '#2563eb', 
                fontWeight: 700, 
                fontSize: 18, 
                border: `1.5px solid ${isDarkMode ? '#60a5fa' : '#2563eb'}`, 
                marginTop: 4, 
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              회원가입
            </button>
            <button 
              type="button"
              onClick={handleForgotPassword}
              style={{ 
                padding: '8px', 
                background: 'none', 
                border: 'none', 
                color: isDarkMode ? '#9ca3af' : '#666', 
                fontSize: 14, 
                marginTop: 8,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              비밀번호를 잊으셨나요?
            </button>
            {errorMsg && (
              <div style={{ 
                color: isDarkMode ? '#ef4444' : '#dc2626', 
                fontSize: 14, 
                marginTop: 8, 
                textAlign: 'center' 
              }}>
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;