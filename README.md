# Frontend

## 프로젝트 설치 및 실행 방법

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn

- .env 파일을 작성하셔야 합니다.
  ```bash
VITE_OPENAI_API_KEY=yourkey.
```

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
    │   ├── assets/        # 이미지, 폰트 등 정적 리소스
    │   ├── components/    # 재사용 가능한 컴포넌트
    │   ├── contexts/      # React Context 관련 파일
    │   ├── pages/         # 페이지 컴포넌트
    │   ├── services/      # API 통신 및 서비스 로직
    │   ├── App.jsx        # 메인 App 컴포넌트
    │   ├── App.css        # App 컴포넌트 스타일
    │   ├── index.css      # 전역 스타일
    │   └── main.jsx       # 앱 진입점
    ├── public/            # 정적 파일
    ├── index.html         # HTML 템플릿
    ├── package.json       # 프로젝트 설정 및 의존성
    └── vite.config.js     # Vite 설정
```

## 주요 컴포넌트 구조

- `components/`: 재사용 가능한 UI 컴포넌트들이 위치
- `pages/`: 각 라우트에 해당하는 페이지 컴포넌트
- `contexts/`: 전역 상태 관리를 위한 Context 파일들
- `services/`: API 통신 및 비즈니스 로직 처리

## 리소스 구조

- `assets/`: 프로젝트에서 사용되는 이미지, 폰트 등의 정적 리소스
- `public/`: 빌드 시 그대로 복사되는 정적 파일들
- `index.css`: 전역 스타일 정의
- `App.css`: App 컴포넌트 관련 스타일
