import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function Register() {
  const navigate = useNavigate();
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

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ textAlign: 'left', fontSize: 32, fontWeight: 700, marginBottom: 32 }}>회원가입</h1>
      <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              아이디
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input"
              placeholder="사용할 아이디를 입력하세요"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              비밀번호 확인
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>
          
          {error && (
            <div style={{ 
              padding: '0.75rem', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444',
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="button"
            disabled={loading}
            style={{ marginTop: '1rem' }}
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={() => navigate('/login')}
              style={{ 
                color: 'var(--primary-color)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              이미 계정이 있으신가요? 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;