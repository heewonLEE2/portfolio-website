# SpringBoard React 프로젝트

## 프로젝트 개요
SpringBoard를 React로 구현한 게시판 사이트입니다. 원본 이미지를 바탕으로 UI를 재구성하고, Spring 백엔드와 연동할 수 있도록 구조를 설계했습니다.

## 기술 스택
- **Frontend**: React 18 + Vite
- **Router**: React Router DOM
- **Styling**: CSS3 (Gradient, Flexbox, Grid)
- **HTTP Client**: Axios
- **Backend 연동**: Spring Boot (http://localhost:8889)

## 프로젝트 구조
```
react_board/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── HomePage.jsx      # 메인 대시보드
│   │   ├── HomePage.css
│   │   ├── PostsPage.jsx     # 게시글 목록
│   │   ├── PostsPage.css
│   │   ├── MembersPage.jsx   # 회원 목록
│   │   ├── MembersPage.css
│   │   ├── SignupPage.jsx    # 회원가입
│   │   ├── SignupPage.css
│   │   ├── LoginPage.jsx     # 로그인
│   │   ├── LoginPage.css
│   │   ├── BoardsPage.jsx    # 개시판 목록
│   │   └── BoardsPage.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
└── project_img/              # 참고 이미지들
    ├── project_1.png
    ├── project_2.png
    ├── project_3.png
    ├── project_4.png
    ├── project_5.png
    └── project_6.png
```

## 구현된 기능

### 🧭 네비게이션 (Navbar.jsx)
- SpringBoard 브랜드 로고
- 메뉴: 개시판목록, 게시글목록, 회원목록
- 로그인 상태 관리 (로그인/로그아웃 버튼)
- 반응형 디자인

### 📄 페이지별 기능

#### 1. HomePage (메인 대시보드)
- Hero 섹션 (SpringBoard V0.1 소개)
- 통계 카드들:
  - 등록된 게시판 목록
  - 최근 게시물(10건)
  - 최근 등록 사진(14건)
  - 최근 가입 회원(10건)

#### 2. PostsPage (게시글 목록)
- **검색 기능**:
  - 다중 필드 검색 (제목, 내용, 작성자)
  - 카테고리별 검색 (게시판 선택)
  - 게시판만 선택하여 해당 게시판 글만 필터링 가능
  - 검색 초기화 버튼
- **페이징 기능**: 10개씩 페이지 분할, 동적 페이지네이션
- **게시글 테이블**: 번호, 등록 게시판, 제목, 작성자, 등록일시, 댓글수, 첨부파일수
- **실시간 데이터**: Spring 백엔드 API 연동 완료

#### 3. MembersPage (회원 목록)
- **회원 관리 테이블**: 아이디, 이름, 등록일시, 삭제여부, 액션
- **회원 등록**: 회원가입 페이지로 연결
- **삭제/복원 기능**: 실시간 회원 상태 관리
- **상태 표시**: 활성(N)/삭제됨(Y) 상태 표시
- **실시간 데이터**: Spring 백엔드 API 연동 완료 (GET, DELETE)

#### 4. SignupPage (회원가입)
- 폼 검증 (아이디, 비밀번호, 이름)
- 실시간 에러 메시지
- 가입하기/돌으로 버튼

#### 5. LoginPage (로그인)
- 로그인 폼 (아이디, 비밀번호)
- 폼 검증
- 회원가입 링크

#### 6. BoardsPage (개시판 목록)
- 게시판 통계 정보
- 게시판 관리 테이블
- 게시판 등록 기능

## 실행 방법

### 개발 서버 시작
\`\`\`bash
npm run dev
\`\`\`
- 브라우저에서 http://localhost:5173 접속

### 빌드
\`\`\`bash
npm run build
\`\`\`

## Spring 백엔드 연동 상태

### ✅ 연동 완료된 API
1. **게시글 관련 (PostsPage.jsx)**:
   - `GET http://localhost:8889/article/` - 게시글 목록 조회 ✅
   - 응답 데이터: `{ articleList: [], boardList: [] }`

2. **회원 관련 (MembersPage.jsx)**:
   - `GET http://localhost:8889/member/` - 회원 목록 조회 ✅
   - `DELETE http://localhost:8889/member/{id}` - 회원 삭제 ✅

### 🔄 연동 대기 중인 API
\`\`\`javascript
// SignupPage.jsx에서
// POST /api/auth/signup - 회원가입

// LoginPage.jsx에서
// POST /api/auth/login - 로그인

// BoardsPage.jsx에서
// GET /api/boards - 게시판 목록 조회
// POST /api/boards - 게시판 생성
// DELETE /api/boards/{id} - 게시판 삭제
\`\`\`

### API 연동 패턴
\`\`\`javascript
// Axios 사용 패턴
const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8889/endpoint/");
    setData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
\`\`\`

## 스타일 특징

### 디자인 시스템
- **Primary Colors**: `#667eea`, `#764ba2` (보라색 그라디언트)
- **Secondary Colors**: `#48bb78`, `#4299e1` (초록, 파랑)
- **Background**: `#f8fafc` (연한 회색)
- **Text**: `#2d3748` (진한 회색)

### 반응형 디자인
- 768px 이하에서 모바일 최적화
- Flexbox, Grid 레이아웃 사용
- 터치 친화적 버튼 크기

### 애니메이션 효과
- 호버 시 `translateY(-2px)` 효과
- 그라디언트 배경 애니메이션
- 부드러운 전환 효과 (`transition: all 0.2s ease`)

## 추가 개발 예정 사항

1. **인증 관리**: Context API 또는 Redux로 로그인 상태 관리
2. **에러 처리**: 전역 에러 핸들링
3. **로딩 상태**: 더 세련된 로딩 컴포넌트
4. **게시글 상세**: 게시글 상세 페이지 및 수정/삭제 기능
5. **파일 업로드**: 이미지 및 첨부파일 업로드 기능
6. **테스트**: Jest + React Testing Library 도입
7. **나머지 API 연동**: 로그인, 회원가입, 게시판 관리 API

## ✅ 완료된 개발 사항 (2025-09-19)

1. **PostsPage 페이징**: 10개씩 페이지 분할, 동적 페이지네이션
2. **PostsPage 검색**: 다중 필드 검색, 카테고리별 필터링, 검색 초기화
3. **MembersPage API 연동**: 실제 백엔드 연동 완료
4. **PostsPage API 연동**: 실제 백엔드 연동 완료

## 개발자 노트

- 모든 컴포넌트는 함수형 컴포넌트로 작성
- CSS는 모듈화되어 각 컴포넌트별로 분리
- Axios를 사용한 HTTP 통신
- Spring 백엔드 API 연동 진행 중 (일부 완료)
- 반응형 디자인으로 모바일/데스크톱 모두 지원
- 페이징과 검색 기능이 통합된 사용자 친화적 UI

## 개발 일정
- **초기 개발**: 2025-09-18
- **페이징 & 검색 기능 추가**: 2025-09-19
- **백엔드 연동 시작**: 2025-09-19