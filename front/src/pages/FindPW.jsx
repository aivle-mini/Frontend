import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindPW() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setResult('');

    const { username, email } = formData;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (u) => u.email === email && u.username === username
    );

    if (user) {
      setResult(`해당 사용자의 비밀번호는: ${user.password}`);
    } else {
      setError('일치하는 사용자가 없습니다.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">비밀번호 찾기</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
          비밀번호 찾기
        </button>
      </form>
      {result && <div className="mt-4 text-green-600 font-semibold">{result}</div>}
      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

      <div className="text-center mt-4">
        <button onClick={() => navigate('/login')} className="text-sm text-blue-600 hover:underline">
          로그인 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default FindPW;
