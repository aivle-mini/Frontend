import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import BookGeneration from './pages/BookGeneration';
import BookInformation from './pages/BookInformation';
import ForgotPassword from './pages/ForgotPassword';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="App" style={{
      background: isDarkMode ? '#1a1a1a' : '#f8fafc',
      minHeight: '100vh',
      color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
    }}>
      <nav style={{
        width: '940px',
        margin: '32px auto 0 auto',
        background: isDarkMode ? '#2d2d2d' : '#fff',
        borderBottom: `2px solid ${isDarkMode ? '#4a5568' : '#2d4663'}`,
        boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(53,87,119,0.04)',
        padding: '0 40px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 600,
        fontSize: 24,
        letterSpacing: 2,
      }}>
        <div style={{ display: 'flex', gap: 48 }}>
          <a href="/books" style={{ 
            color: isDarkMode ? '#e5e7eb' : '#2d4663', 
            textDecoration: 'none', 
            padding: '8px 0', 
            borderBottom: location.pathname === '/books' ? `2px solid ${isDarkMode ? '#60a5fa' : '#2563eb'}` : '2px solid transparent', 
            transition: 'all 0.2s' 
          }}>책 목록</a>
          <a href="/generate" style={{ 
            color: isDarkMode ? '#e5e7eb' : '#2d4663', 
            textDecoration: 'none', 
            padding: '8px 0', 
            borderBottom: location.pathname === '/generate' ? `2px solid ${isDarkMode ? '#60a5fa' : '#2563eb'}` : '2px solid transparent', 
            transition: 'all 0.2s' 
          }}>책 생성</a>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isDarkMode ? '#e5e7eb' : '#2d4663',
              fontSize: 20
            }}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          <a href="/login" style={{ 
            color: isDarkMode ? '#60a5fa' : '#2563eb', 
            textDecoration: 'none', 
            padding: '8px 0', 
            borderBottom: '2px solid transparent', 
            fontWeight: 700, 
            fontSize: 22 
          }}>로그인</a>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books/:id/edit" element={<BookGeneration />} />
          <Route path="/books/:id" element={<BookInformation />} />
          <Route path="/generate" element={<BookGeneration />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
