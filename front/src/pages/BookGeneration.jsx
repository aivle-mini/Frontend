import React, { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';

function BookGeneration() {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    content: '',
    imageUrl: null // 이미지도 bookInfo에 포함
  });
  const [generating, setGenerating] = useState(false);
<<<<<<< HEAD
  const [descPopup, setDescPopup] = useState({ open: false, desc: '' });
  // [임시] 책 리스트와 삭제 핸들러 추가 (실제 API 연동 전용)
  const [bookList, setBookList] = useState([
    { id: 1, title: 'BOOK LIST 1' },
    { id: 2, title: 'BOOK LIST 2' },
    { id: 3, title: 'BOOK LIST 3' },
  ]);
=======
  const [bookList, setBookList] = useState([]);
>>>>>>> cover-image

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const books = await bookService.getBooks();
      setBookList(books);
    } catch (error) {
      console.error('책 목록 로딩 중 오류:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await bookService.deleteBook(id);
      await loadBooks();
    } catch (error) {
      console.error('책 삭제 중 오류:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      // DALL E 직접 호출 옵션 활성화
      const generated = await bookService.generateBook(bookInfo, { useLocalAI: true });
      setBookInfo(prev => ({
        ...prev,
        imageUrl: generated.imageUrl
      }));
    } catch (error) {
      console.error('책 생성 중 오류:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    try {
      const bookToSave = {
        ...bookInfo,
        id: Date.now() // 로컬 식별자
      };
      await bookService.saveBook(bookToSave);
      await loadBooks();
    } catch (error) {
      console.error('책 저장 중 오류:', error);
    }
  };

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
    overflow: 'hidden'
  };

  const thumbStyle = {
    width: '64px',
    height: '64px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginRight: '12px'
  };

  return (
<<<<<<< HEAD
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
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setDescPopup({ open: true, desc: book.desc || '책 설명이 없습니다.' })} style={{ padding: '4px 16px', background: '#fff', border: '1px solid #2563eb', color: '#2563eb', borderRadius: 4, cursor: 'pointer' }}>책 설명</button>
                <button onClick={() => handleDelete(book.id)} style={{ padding: '4px 16px' }}>삭제</button>
              </div>
            </div>
          ))}
        </div>
        {/* 책 설명 팝업 */}
        {descPopup.open && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 4px 24px rgba(53,87,119,0.13)', textAlign: 'center' }}>
              <h3 style={{ marginBottom: 16, color: '#2d4663' }}>책 설명</h3>
              <div style={{ marginBottom: 24, color: '#333', fontSize: 16 }}>{descPopup.desc}</div>
              <button onClick={() => setDescPopup({ open: false, desc: '' })} style={{ padding: '8px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>닫기</button>
            </div>
=======
    <div style={{ maxWidth: 700, margin: '40px auto', border: '2px solid #357', borderRadius: '20px', padding: 24, background: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>BOOK COVER GENERATE</h1>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* COVER 영역 */}
        <div style={{ flex: 1 }}>
          <div style={coverStyle}>
            {bookInfo.imageUrl ? (
              <img src={bookInfo.imageUrl} alt="book cover" style={{ maxHeight: '100%' }} />
            ) : (
              'COVER'
            )}
          </div>
        </div>

        {/* info 입력 영역 */}
        <div style={{ flex: 1, borderLeft: '2px solid #eee', paddingLeft: 24 }}>
          <div style={{ marginBottom: 12, fontWeight: 'bold' }}>info</div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>title</label>
            <input
              type="text"
              name="title"
              value={bookInfo.title}
              onChange={handleChange}
              style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>content</label>
            <textarea
              name="content"
              value={bookInfo.content}
              onChange={handleChange}
              style={{ width: '100%', height: 60, padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={handleGenerate}
              style={{ padding: '6px 18px' }}
              disabled={generating}
            >
              {generating ? 'generating...' : 'generate'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              style={{ padding: '6px 18px' }}
            >
              save
            </button>
          </div>
        </div>
      </div>

      {/* 리스트 헤더 + 리프레시 버튼 */}
      <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={loadBooks} style={{ fontSize: 12, padding: '4px 10px' }}>🔄 refresh</button>
        <div style={{ fontWeight: 'bold' }}>Book List</div>
      </div>

      {/* BOOK LIST */}
      <div style={{ marginTop: 16 }}>
        {bookList.map((book) => (
          <div key={book.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
            border: '1px solid #bbb',
            padding: '12px 16px',
            borderRadius: '8px',
            background: '#fafbfc'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {book.imageUrl && <img src={book.imageUrl} alt="thumb" style={thumbStyle} />}
              <span style={{ fontWeight: 500 }}>{book.title}</span>
            </div>
            <button onClick={() => handleDelete(book.id)} style={{ padding: '4px 16px' }}>
              delete
            </button>
>>>>>>> cover-image
          </div>
        )}
      </div>
    </div>
  );
}

export default BookGeneration;
