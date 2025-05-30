import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box 
} from '@mui/material';

function BookGeneration() {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    content: ''
  });
  const [generating, setGenerating] = useState(false);
  // [임시] 책 리스트와 삭제 핸들러 추가 (실제 API 연동 전용)
  const [bookList, setBookList] = useState([
    { id: 1, title: 'BOOK LIST 1' },
    { id: 2, title: 'BOOK LIST 2' },
    { id: 3, title: 'BOOK LIST 3' },
  ]);

  const handleDelete = (id) => {
    setBookList((prev) => prev.filter((book) => book.id !== id));
  };

  // COVER 이미지(임시)
  const coverStyle = {
    width: '100%',
    height: '250px',
    background: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    border: '1px solid #bbb',
    borderRadius: '8px',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      // TODO: API 연동
      console.log('책 생성 요청:', bookInfo);
    } catch (error) {
      console.error('책 생성 중 오류:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      {/* 상단 네비게이션 바 - 가로 정렬, 그림자, 여백, 심플 스타일 */}
      <nav style={{
        width: 700,
        margin: '0 auto',
        background: '#fff',
        borderBottom: '1.5px solid #357',
        boxShadow: '0 2px 8px rgba(53,87,119,0.06)',
        padding: '0 40px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 600,
        fontSize: 18,
        letterSpacing: 1,
        marginBottom: 36
      }}>
        <div style={{ display: 'flex', gap: 36 }}>
          <a href="/books" style={{ color: '#357', textDecoration: 'none', padding: '8px 0', borderBottom: '2px solid transparent' }}>책 목록</a>
          <a href="/generate" style={{ color: '#357', textDecoration: 'none', padding: '8px 0', borderBottom: '2px solid transparent' }}>책 생성</a>
        </div>
        <a href="/login" style={{ color: '#2563eb', textDecoration: 'none', padding: '8px 0', borderBottom: '2px solid transparent' }}>로그인</a>
      </nav>
      <div style={{ maxWidth: 700, margin: '40px auto', border: '2px solid #357', borderRadius: '20px', padding: 24, background: '#fff' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>북 커버 생성</h1>
        <div style={{ display: 'flex', gap: 24 }}>
          {/* COVER 영역 */}
          <div style={{ flex: 1 }}>
            <div style={coverStyle}>COVER</div>
          </div>
          {/* info 입력 영역 */}
          <div style={{ flex: 1, borderLeft: '2px solid #eee', paddingLeft: 24 }}>
            <div style={{ marginBottom: 12, fontWeight: 'bold' }}>도서 정보</div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>제목</label>
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc' }} 
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>설명</label>
              <textarea style={{ width: '100%', height: 60, padding: 6, borderRadius: 4, border: '1px solid #ccc' }}></textarea>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={handleSubmit} style={{ padding: '6px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4 }}>생성하기</button>
              <button type="button" style={{ padding: '6px 18px' }}>저장</button>
            </div>
          </div>
        </div>
        {/* BOOK LIST 하단 영역 */}
        <div style={{ marginTop: 32 }}>
          {bookList.map((book) => (
            <div key={book.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', border: '1px solid #bbb', padding: '12px 16px', borderRadius: '8px', background: '#fafbfc' }}>
              <span style={{ fontWeight: 500 }}>{book.title}</span>
              <button onClick={() => handleDelete(book.id)} style={{ padding: '4px 16px' }}>삭제</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookGeneration;
