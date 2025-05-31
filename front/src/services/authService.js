const API_URL = 'http://localhost:8080/api';

export const authService = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          username: username,  // 이메일을 username으로 사용
          passwd: password    // 백엔드는 passwd 필드명 사용
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '로그인에 실패했습니다.');
      }

      const data = await response.json();
      // 백엔드에서 받은 사용자 정보 저장
      const userData = {
        id: data.id,
        email: data.email,
        name: data.name
      };
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
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
        body: JSON.stringify({ 
          email: email,
          passwd: password,  // 백엔드는 passwd 필드명 사용
          name: username    // 백엔드는 name 필드 사용
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '회원가입에 실패했습니다.');
      }
      
      const data = await response.json();
      return {
        id: data.id,
        email: data.email,
        name: data.name
      };
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    const user = localStorage.getItem('user');
    return !!user && JSON.parse(user).id != null;
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('user');
      return null;
    }
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

  // 사용자 정보 가져오기
  getUserInfo: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/v1/users/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는데 실패했습니다.');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      throw error;
    }
  }
};