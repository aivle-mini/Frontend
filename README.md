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
