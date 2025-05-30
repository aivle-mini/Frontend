const API_URL = 'http://localhost:3000/api';

export const authService = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    
    const data = await response.json();
    if (data.accessToken && data.refreshToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  }
};