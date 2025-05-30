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
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;