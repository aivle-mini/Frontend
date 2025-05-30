import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
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
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ padding: '12px', borderRadius: 8, border: '1px solid #cfd8dc', fontSize: 16, marginBottom: 4 }}
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ padding: '12px', borderRadius: 8, border: '1px solid #cfd8dc', fontSize: 16, marginBottom: 12 }}
              required
            />
            <button type="submit" style={{ padding: '12px', borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', marginTop: 8, cursor: 'pointer' }}>
              로그인
            </button>
            <button type="button" style={{ padding: '12px', borderRadius: 8, background: '#fff', color: '#2563eb', fontWeight: 700, fontSize: 18, border: '1.5px solid #2563eb', marginTop: 4, cursor: 'pointer' }}>
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;