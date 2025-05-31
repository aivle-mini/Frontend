import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import BookGeneration from './pages/BookGeneration';
import './App.css';

function Header() {
  return (
    <nav className="header">
      <div className="header-content">
        <div className="nav-links">
          <Link to="/books">책 목록</Link>
          <Link to="/generate">책 생성</Link>
        </div>
        <div className="auth-links">
          <Link to="/login">로그인</Link>
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
