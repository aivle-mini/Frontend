const API_URL = 'http://localhost:3000/api';

export const authService = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '로그인에 실패했습니다.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      }
      throw error;
    }
  },

  register: async (email, username, password) => {
    try {
      const response = await fetch(`${API_URL}/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, username, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '회원가입에 실패했습니다.');
      }
      
      return await response.json();
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      }
      throw error;
    }
  },

  logout: () => {
    // 로그아웃 시 클라이언트 상태 정리
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  findPassword: async (username, email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.email === email);
    
    if (!user) {
      throw new Error('일치하는 사용자 정보를 찾을 수 없습니다.');
    }

    // 실제 구현에서는 이메일로 임시 비밀번호를 보내거나 재설정 링크를 보내야 합니다.
    // 현재는 임시로 비밀번호를 보여주는 것으로 구현합니다.
    return {
      message: '임시 비밀번호가 이메일로 전송되었습니다.',
      // email: user.email // 실제 구현시 이메일 전송 로직 추가
    };
  },
};