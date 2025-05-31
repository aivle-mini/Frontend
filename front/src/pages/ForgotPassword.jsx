import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useTheme } from '../contexts/ThemeContext';

function ForgotPassword() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [status, setStatus] = useState({
    message: '',
    isError: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: '', isError: false });

    try {
      const result = await authService.findPassword(formData.username, formData.email);
      setStatus({ message: result.message, isError: false });
      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setStatus({ message: err.message, isError: true });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 96px)', 
      display: 'flex', 
      flexDirection: 'column', 
      background: isDarkMode ? '#0f172a' : '#f8fafc',
      paddingTop: '40px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{
          width: 380,
          background: isDarkMode ? '#1e293b' : '#fff',
          borderRadius: 16,
          boxShadow: isDarkMode ? '0 4px 24px rgba(0, 0, 0, 0.2)' : '0 4px 24px rgba(53,87,119,0.10)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}>
          <h1 style={{ 
            fontSize: 28, 
            fontWeight: 700, 
            marginBottom: 32, 
            color: isDarkMode ? '#e5e7eb' : '#2d4663', 
            textAlign: 'center' 
          }}>비밀번호 찾기</h1>
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <input
                type="text"
                name="username"
                placeholder="아이디"
                value={formData.username}
                onChange={handleChange}
                style={{ 
                  width: '100%',
                  padding: '12px',
                  borderRadius: 8,
                  border: `1px solid ${isDarkMode ? '#4a5568' : '#cfd8dc'}`,
                  fontSize: 16,
                  marginBottom: 12,
                  background: isDarkMode ? '#0f172a' : '#fff',
                  color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
                }}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
                style={{ 
                  width: '100%',
                  padding: '12px',
                  borderRadius: 8,
                  border: `1px solid ${isDarkMode ? '#4a5568' : '#cfd8dc'}`,
                  fontSize: 16,
                  marginBottom: 12,
                  background: isDarkMode ? '#0f172a' : '#fff',
                  color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '12px',
                borderRadius: 8,
                background: isDarkMode ? '#3b82f6' : '#2563eb',
                color: '#fff',
                border: 'none',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 8,
                transition: 'all 0.2s ease'
              }}
            >
              비밀번호 찾기
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              style={{
                padding: '12px',
                borderRadius: 8,
                background: isDarkMode ? '#1e293b' : '#fff',
                color: isDarkMode ? '#60a5fa' : '#2563eb',
                border: `1.5px solid ${isDarkMode ? '#60a5fa' : '#2563eb'}`,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 4,
                transition: 'all 0.2s ease'
              }}
            >
              로그인으로 돌아가기
            </button>
          </form>
          {status.message && (
            <div
              style={{
                marginTop: 16,
                padding: '12px',
                borderRadius: 8,
                background: status.isError 
                  ? (isDarkMode ? '#450a0a' : '#fee2e2') 
                  : (isDarkMode ? '#022c22' : '#dcfce7'),
                color: status.isError 
                  ? (isDarkMode ? '#fca5a5' : '#dc2626') 
                  : (isDarkMode ? '#86efac' : '#16a34a'),
                width: '100%',
                textAlign: 'center',
                fontSize: 14,
                transition: 'all 0.2s ease'
              }}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;