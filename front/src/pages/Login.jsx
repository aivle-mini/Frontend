import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',   // API 스펙: username 사용
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  /** 로그인 요청 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');           // 에러 초기화

    try {
      await authService.login(formData.username, formData.password);

      // 도서 목록 페이지로 이동
      navigate('/books');
    } catch (err) {
      // ❌ 실패: 메시지 표시
      setErrorMsg(err.message);
    }
  };

  /** 입력 변경 핸들러 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f6f8fa' }}>
      {/* 상단 제목 */}
      <div style={{ position: 'absolute', top: 150, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
        <h2 style={{ fontSize: 38, fontWeight: 700, color: '#2d4663', letterSpacing: 2, background: 'rgba(255,255,255,0.85)', padding: '12px 36px', borderRadius: 12, boxShadow: '0 2px 12px rgba(53,87,119,0.07)' }}>
          걷기가서재_”작가의산책”
        </h2>
      </div>
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
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#2d4663', letterSpacing: 2 }}>로그인</h1>
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <input
              type="text"
              name="username"
              placeholder="아이디"
              value={formData.username}
              onChange={handleChange}
              style={{ padding: '12px', borderRadius: 8, border: '1px solid #cfd8dc', fontSize: 16, marginBottom: 4 }}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              style={{ padding: '12px', borderRadius: 8, border: '1px solid #cfd8dc', fontSize: 16, marginBottom: 12 }}
              required
            />
            <button type="submit" style={{ padding: '12px', borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', marginTop: 8, cursor: 'pointer' }}>
              로그인
            </button>
            <button 
              type="button" 
              onClick={handleRegister}
              style={{ padding: '12px', borderRadius: 8, background: '#fff', color: '#2563eb', fontWeight: 700, fontSize: 18, border: '1.5px solid #2563eb', marginTop: 4, cursor: 'pointer' }}
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
                color: '#666', 
                fontSize: 14, 
                marginTop: 8,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              비밀번호를 잊으셨나요?
            </button>
            {errorMsg && (
              <div style={{ color: '#dc2626', fontSize: 14, marginTop: 8, textAlign: 'center' }}>
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