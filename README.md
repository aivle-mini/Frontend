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

### 주요 디렉토리 설명
- `components/common`: 버튼, 입력창, 카드 등 재사용 가능한 UI 컴포넌트
- `components/layout`: 헤더, 푸터, 사이드바 등 레이아웃 관련 컴포넌트
- `components/features`: 특정 기능이나 도메인과 관련된 복잡한 컴포넌트
- `contexts`: 전역 상태 관리를 위한 Context API 관련 파일들
- `hooks`: 재사용 가능한 로직을 분리한 커스텀 훅들
- `services/api`: axios 인스턴스 설정 및 API 엔드포인트 호출 함수들
- `services/utils`: 날짜 포맷팅, 데이터 변환 등 유틸리티 함수

## 리소스 구조

- `assets/`: 프로젝트에서 사용되는 이미지, 폰트 등의 정적 리소스
- `public/`: 빌드 시 그대로 복사되는 정적 파일들
- `index.css`: 전역 스타일 정의
- `App.css`: App 컴포넌트 관련 스타일

### 주요 파일 설명
- `vite.config.js`: Vite 빌드 도구 설정 파일, 프로젝트의 개발 서버 및 빌드 설정 관리
- `package.json`: 프로젝트 의존성 및 스크립트 정의
- `index.html`: 애플리케이션의 진입점, React 앱이 마운트되는 기본 HTML 템플릿
- `src/main.jsx`: React 애플리케이션의 실제 진입점, 루트 컴포넌트 렌더링
- `src/App.jsx`: 라우팅 설정 및 전역 레이아웃 관리
- `src/services/api.js`: 백엔드 API 통신을 위한 설정 및 인터페이스

  
## 📌 주요 기능 스크린샷
### 로그인
- 이메일, 아이디, 비밀번호를 통해 회원가입합니다.
<p float="left">
  <img src="https://github.com/user-attachments/assets/2d1c7650-b314-4ef6-9c0d-2d8adb2dff54" width="500" height="400"/>
  <img src="https://github.com/user-attachments/assets/be2b1dd9-975d-4e96-a665-58836cc369cb" width="500" height="400"/>
</p>


### 도서 목록 확인
- 도서 목록과 특정 도서의 상세 내용을 확인하고 수정할 수 있습니다.
<p float="left">
  <img src="https://github.com/user-attachments/assets/cc79275e-7416-4e9f-a9de-c286db703954" width="500" height="400"/>
  <img src="https://github.com/user-attachments/assets/6bf2644d-b1d1-4b00-a7e6-9a3b17430cce" width="500" height="400"/>
</p>

### 내용 수정
- 제목, 내용, 커버를 수정할 수 있습니다. 생성 버튼을 여러번 클릭하여 새로운 표지를 만들 수 있습니다.
<p><img src="https://github.com/user-attachments/assets/5ccce512-30d3-4828-9e10-aee048607c24" width="500" height="400"/></p>

### 북 커버 생성
- 제목과 내용을 입력한 후 생성 버튼으로 생성합니다.
<p float="left">
  <img src="https://github.com/user-attachments/assets/a78287a7-18a8-4cdf-9c26-99f7127f1764" width="500" height="400"/>
  <img src="https://github.com/user-attachments/assets/d0ac5f1e-791e-4724-bf7e-f1178d0ca64c" width="500" height="400"/>
</p>
