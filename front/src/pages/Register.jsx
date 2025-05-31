import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useTheme } from '../contexts/ThemeContext';

function Register() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { email, username, password, confirmPassword } = formData;

    if (!email || !username || !password || !confirmPassword) {
      setError('모든 항목을 입력하세요.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    try {
      await authService.register(email, username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    border: `1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
    borderRadius: '8px',
    fontSize: '16px',
    background: isDarkMode ? '#1a1a1a' : '#fff',
    color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: isDarkMode ? '#3b82f6' : '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '32px',
      borderRadius: '16px',
      boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      background: isDarkMode ? '#2d2d2d' : '#ffffff',
      color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '24px',
        textAlign: 'center',
        color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
      }}>회원가입</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
        />
        
        {error && (
          <div style={{
            color: '#ef4444',
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <button
          type="submit"
          style={{
            ...buttonStyle,
            background: loading ? (isDarkMode ? '#1d4ed8' : '#3b82f6') : (isDarkMode ? '#3b82f6' : '#2563eb'),
          }}
          disabled={loading}
        >
          {loading ? '가입 중...' : '회원가입'}
        </button>
      </form>
      
      <div style={{
        marginTop: '24px',
        textAlign: 'center',
      }}>
        <button 
          onClick={() => navigate('/')} 
          style={{
            color: isDarkMode ? '#60a5fa' : '#2563eb',
            textDecoration: 'none',
            fontSize: '14px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          이미 계정이 있으신가요? 로그인
        </button>
      </div>
    </div>
  );
}

export default Register;