import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import FindPW from './pages/FindPW'; // ✅ 추가
import BookList from './pages/BookList';
import BookGeneration from './pages/BookGeneration';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><a href="/books">책 목록</a></li>
              <li><a href="/generate">책 생성</a></li>
              <li><a href="/login">로그인</a></li>
              <li><a href="/register">회원가입</a></li> {/* ✅ 추가 */}
              <li><a href="/findpw">비밀번호 찾기</a></li> {/* ✅ 추가 */}
            </ul>
          </nav>
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> {/* ✅ 추가 */}
              <Route path="/findpw" element={<FindPW />} /> {/* ✅ 추가 */}
              <Route path="/books" element={<BookList />} />
              <Route path="/generate" element={<BookGeneration />} />
              <Route path="/" element={<Navigate to="/books" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
