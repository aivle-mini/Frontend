// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import Login from './pages/Login';
// import BookList from './pages/BookList';
// import BookGeneration from './pages/BookGeneration';

// import './App.css';

// function App() {
//   const location = useLocation();
//   const isBookGenerationPage = location.pathname === '/generate';
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           {!isBookGenerationPage && (
//           <nav>
//             <ul>
//               <li><a href="/books">책 목록</a></li>
//               <li><a href="/generate">책 생성</a></li>
//               <li><a href="/login">로그인</a></li>
//             </ul>
//           </nav>
//           )}
//           <main>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/books" element={<BookList />} />
//               <Route path="/generate" element={<BookGeneration />} />
//               <Route path="/" element={<Navigate to="/login" replace />} />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookGeneration from './pages/BookGeneration';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isBookGenerationPage = location.pathname === '/generate';

  return (
    <div className="App">
      {!isBookGenerationPage && (
        <nav style={{
          width: 940, // 4 * 220(card) + 3 * 20(gap) + padding
          margin: '32px auto 0 auto',
          background: '#fff',
          borderBottom: '2px solid #2d4663',
          boxShadow: '0 2px 8px rgba(53,87,119,0.04)',
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
            <a href="/books" style={{ color: '#2d4663', textDecoration: 'none', padding: '8px 0', borderBottom: '2px solid transparent', transition: 'border 0.2s' }}>책 목록</a>
            <a href="/generate" style={{ color: '#2d4663', textDecoration: 'none', padding: '8px 0', borderBottom: '2px solid transparent', transition: 'border 0.2s' }}>책 생성</a>
          </div>
          <a href="/login" style={{ color: '#2563eb', textDecoration: 'none', padding: '8px 0', borderBottom: '2px solid transparent', fontWeight: 700, fontSize: 22 }}>로그인</a>
        </nav>
      )}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/generate" element={<BookGeneration />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
