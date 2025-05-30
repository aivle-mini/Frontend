import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function ForgotPassword() {
  const navigate = useNavigate();
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f6f8fa' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 380,
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(53,87,119,0.10)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, color: '#2d4663', textAlign: 'center' }}>비밀번호 찾기</h1>
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
                  border: '1px solid #cfd8dc',
                  fontSize: 16,
                  marginBottom: 12
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
                  border: '1px solid #cfd8dc',
                  fontSize: 16,
                  marginBottom: 12
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '12px',
                borderRadius: 8,
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 8
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
                background: '#fff',
                color: '#2563eb',
                border: '1.5px solid #2563eb',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 4
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
                background: status.isError ? '#fee2e2' : '#dcfce7',
                color: status.isError ? '#dc2626' : '#16a34a',
                width: '100%',
                textAlign: 'center',
                fontSize: 14
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