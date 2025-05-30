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

  return (
    <div style={{ maxWidth: 360, margin: '0 auto' }}>
      <h1>로그인</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="아이디(또는 이메일)"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">로그인</button>
      </form>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  );
}

export default Login;