# AIVLE mini project
## 🖥️ 프로젝트 소개

책의 내용에 따라 책의 표지를 자동으로 생성하여 책을 기록하는 도서 관리 시스템입니다

## 프로젝트 설치 및 실행 방법

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn
- 권장 IDE: Visual Studio Code
- 프로젝트 폴더의 최상단 .env(VITE_OPENAI_API_KEY=sk-0000) 추가

### 개발 환경
- React 19.1.0
- Vite 6.3.5
- Material-UI 7.1.0
- ESLint 9.25.0
- React Router 7.6.1

### 설치 방법

1. 프로젝트 클론
```bash
git clone [repository-url]
```

2. 프로젝트 디렉토리로 이동
```bash
cd Frontend/front
```

3. 의존성 패키지 설치
```bash
npm install
# 또는
yarn install
```

### 실행 방법

개발 서버 실행:
```bash
npm run dev
# 또는
yarn dev
```

빌드:
```bash
npm run build
# 또는
yarn build
```

## 프로젝트 구조

```
Frontend/
├── front/
│   ├── node_modules/             # 설치된 외부 패키지들 (자동 생성)
│   ├── public/                   # 정적 파일
│   │   ├── favicon.ico           # 파비콘
│   │   └── robots.txt            # 검색엔진 크롤링 설정
│   ├── src/                      # 소스 코드 루트
│   │   ├── assets/               # 이미지, 폰트 등 정적 리소스
│   │   ├── components/           # 재사용 가능한 컴포넌트
│   │   │   └── PrivateRoute.jsx  # 인증된 사용자만 접근 가능한 라우트
│   │   ├── contexts/             # React Context 관련 파일
│   │   │   ├── AuthContext.jsx       # 인증 상태 전역 관리
│   │   │   └── ThemeContext.jsx      # 다크모드 등 테마 전역 관리
│   │   ├── pages/                # 주요 페이지 컴포넌트들
│   │   │   ├── BookGeneration.jsx    # 책 생성 페이지
│   │   │   ├── BookInformation.jsx   # 책 상세 정보 페이지
│   │   │   ├── BookList.jsx         # 책 리스트 페이지
│   │   │   ├── ForgotPassword.jsx   # 비밀번호 재설정 페이지
│   │   │   ├── Login.jsx            # 로그인 페이지
│   │   │   └── Register.jsx         # 회원가입 페이지
│   │   ├── services/             # API 서비스 및 유틸리티
│   │   │   ├── authService.js        # 로그인, 회원가입 등 인증 관련 API
│   │   │   └── bookService.js        # 책 관련 API 서비스
│   │   ├── App.css               # App 컴포넌트 스타일
│   │   ├── App.jsx               # 루트 App 컴포넌트
│   │   ├── index.css             # 전역 CSS
│   │   └── main.jsx              # React 앱의 진입점
│   ├── .env                      # 환경 변수 파일 (예: OpenAI API 키)
│   ├── .eslint.config.js         # ESLint 설정
│   ├── index.html               # HTML 템플릿
│   ├── package-lock.json        # 의존성 잠금 파일
│   ├── package.json             # 프로젝트 의존성 및 스크립트
│   ├── README.md                # 프로젝트 소개 문서
│   ├── vite.config.js           # Vite 설정 파일
│   └── .gitignore               # Git에서 무시할 파일 목록

```
# 📌 세부 구현 사항

### authService.js
- 사용자 인증 및 계정 관련 기능을 담당합니다.
- 로그인 시 사용자 정보를 `localStorage`에 저장하며, 인증 여부 확인 및 로그아웃 기능도 제공합니다.
- 주요 메서드:
  - `login(username, password)`: 사용자 로그인 요청 (백엔드의 `/v1/users/login` 엔드포인트와 통신)
  - `register(email, username, password)`: 사용자 회원가입 요청
  - `logout()`: 저장된 사용자 정보 제거
  - `isAuthenticated()`: 로그인 여부 확인
  - `getCurrentUser()`: 현재 로그인된 사용자 정보 반환
  - `findPassword(username, email)`: (임시 구현) 저장된 사용자 목록에서 일치하는 사용자 확인
  - `getUserInfo(userId)`: 특정 사용자 정보 조회
 

<details>
<summary> 코드 보기 (authService.js)</summary>

```js
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
          username: username,
          passwd: password
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '로그인에 실패했습니다.');
      }

      const data = await response.json();
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
          passwd: password,
          name: username
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

    return {
      message: '임시 비밀번호가 이메일로 전송되었습니다.'
    };
  },

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
```
</details>

---

### bookService.js
- 도서 생성, 조회, 수정, 삭제 및 OpenAI API를 활용한 커버 이미지 생성 기능을 포함합니다.
- RESTful 방식으로 백엔드 API와 통신하며, 프론트에서 사용하는 형식으로 응답 데이터를 변환합니다.
- 주요 메서드:
  - `getBooks()`: 모든 도서 목록 조회
  - `getBookById(id)`: 특정 ID의 도서 조회
  - `generateBook(bookData)`: OpenAI DALL·E 3 모델을 사용해 책 커버 이미지 생성
  - `saveBook(bookData)`: 도서 생성 및 저장
  - `updateBook(id, bookData)`: 도서 정보 수정
  - `deleteBook(id)`: 도서 삭제
- 내부적으로 `transformBookData()` 함수를 사용해 백엔드의 snake_case 응답을 camelCase로 변환합니다.

<details> <summary> 코드 보기 (bookService.js)</summary>

```js
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'http://localhost:8080/api/v1/books';

const transformBookData = (book) => ({
  id: book.id,
  title: book.title,
  content: book.content,
  imageUrl: book.image_url,
  isDeleted: book.is_deleted,
  createdAt: book.created_at,
  updatedAt: book.updated_at,
  user: book.user
});

export const bookService = {
  getBooks: async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '책 목록을 불러오는데 실패했습니다.');
      }

      const books = await response.json();
      return books.map(transformBookData);
    } catch (error) {
      console.error('책 목록 조회 중 오류:', error);
      throw error;
    }
  },

  generateBook: async (bookData, options = { useLocalAI: true }) => {
    const prompt = `Title: ${bookData.title}. Content: ${bookData.content}` +
      " Please refer to what you posted and see the image for the book cover";

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard"
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'AI 이미지 생성에 실패했습니다.');
    }

    const data = await response.json();
    const imageUrl = data?.data?.[0]?.url || null;

    return {
      ...bookData,
      imageUrl
    };
  },

  saveBook: async (bookData) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: bookData.title,
          content: bookData.content,
          image_url: bookData.imageUrl,
          userId: currentUser.id
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '책 저장에 실패했습니다.');
      }

      const savedBook = await response.json();
      return transformBookData(savedBook);
    } catch (error) {
      console.error('책 저장 중 오류:', error);
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '책 삭제에 실패했습니다.');
      }

      const deletedBook = await response.json();
      return transformBookData(deletedBook);
    } catch (error) {
      console.error('책 삭제 중 오류:', error);
      throw error;
    }
  },

  getBookById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '책 정보를 불러오는데 실패했습니다.');
      }

      const book = await response.json();
      return transformBookData(book);
    } catch (error) {
      console.error('책 조회 중 오류:', error);
      throw error;
    }
  },

  updateBook: async (id, bookData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: bookData.title,
          content: bookData.content,
          image_url: bookData.imageUrl
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '책 수정에 실패했습니다.');
      }

      const updatedBook = await response.json();
      return transformBookData(updatedBook);
    } catch (error) {
      console.error('책 수정 중 오류:', error);
      throw error;
    }
  }
};
```
</details> 
  
## 📌 주요 기능 스크린샷
### 로그인
- 이메일, 아이디, 비밀번호를 통해 회원가입합니다.
<p float="left">
  <img src="https://github.com/user-attachments/assets/785e2b60-5b0d-49fc-8890-818128931e08" width="500" height="400"/>
  <img src="https://github.com/user-attachments/assets/be2b1dd9-975d-4e96-a665-58836cc369cb" width="500" height="400"/>
</p>


### 도서 목록 확인
- 도서 목록과 특정 도서의 상세 내용을 확인하고 수정할 수 있습니다.
<p float="left">
  <img src="https://github.com/user-attachments/assets/db95de7b-2f25-4ae8-9f17-8e0375b678a8" width="500" height="400"/>
  <img src="https://github.com/user-attachments/assets/43a5e597-042f-40e8-b6cf-1e3eec0b6404" width="500" height="400"/>
</p>

### 내용 수정
- 제목, 내용, 커버를 수정할 수 있습니다. 생성 버튼을 여러번 클릭하여 새로운 표지를 만들 수 있습니다.
<p><img src="https://github.com/user-attachments/assets/7d3c8c01-dc3a-4b29-bea8-462b9b202b85" width="500" height="400"/></p>

### 북 커버 생성
- 제목과 내용을 입력한 후 생성 버튼으로 생성합니다.
<p float="left">
  <img src="https://github.com/user-attachments/assets/101ee0c4-0e58-4df2-be66-6af565f76ce0" width="500" height="400"/>
  <img src="https://github.com/user-attachments/assets/98a5c14c-a0d0-4f65-9147-7671f847bbd5" width="500" height="400"/>
</p>
