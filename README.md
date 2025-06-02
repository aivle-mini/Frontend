# AIVLE mini project
## 🖥️ 프로젝트 소개

책의 내용에 따라 책의 표지를 자동으로 생성하여 책을 기록하는 도서 관리 시스템입니다

## 프로젝트 설치 및 실행 방법

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn
- 권장 IDE: Visual Studio Code

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
    ├── src/
    │   ├── assets/            # 이미지, 폰트 등 정적 리소스
    │   │   ├── images/        # 이미지 파일들
    │   │   └── styles/        # 공통 스타일 파일들
    │   ├── components/        # 재사용 가능한 컴포넌트
    │   │   ├── common/        # 공통 컴포넌트 (버튼, 입력창 등)
    │   │   ├── layout/        # 레이아웃 관련 컴포넌트
    │   │   └── features/      # 특정 기능과 관련된 컴포넌트
    │   ├── contexts/          # React Context 관련 파일
    │   │   ├── AuthContext.js     # 인증 관련 컨텍스트
    │   │   └── ThemeContext.js    # 테마 관련 컨텍스트
    │   ├── pages/             # 페이지 컴포넌트
    │   │   ├── Home/             # 홈 페이지 관련 파일
    │   │   ├── Auth/             # 로그인/회원가입 페이지
    │   │   └── Profile/          # 프로필 페이지
    │   ├── services/          # API 통신 및 서비스 로직
    │   │   ├── api/             # API 호출 관련 파일
    │   │   └── utils/           # 유틸리티 함수들
    │   ├── hooks/             # 커스텀 훅
    │   │   ├── useAuth.js       # 인증 관련 훅
    │   │   └── useForm.js       # 폼 관련 훅
    │   ├── App.jsx           # 메인 App 컴포넌트
    │   ├── App.css           # App 컴포넌트 스타일
    │   ├── index.css         # 전역 스타일
    │   └── main.jsx          # 앱 진입점
    ├── public/               # 정적 파일
    │   ├── favicon.ico        # 파비콘
    │   └── robots.txt         # 검색엔진 크롤링 설정
    ├── index.html            # HTML 템플릿
    ├── package.json          # 프로젝트 설정 및 의존성
    ├── .eslintrc.json        # ESLint 설정
    ├── .env                  # open ai api key가 담긴 파일일
    └── vite.config.js        # Vite 설정
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
