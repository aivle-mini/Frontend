import React, { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';

function BookGeneration() {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    content: ''
  });
  const [generating, setGenerating] = useState(false);
  const [bookList, setBookList] = useState([]);

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
      setBookList((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error('책 삭제 중 오류:', error);
    }
  };

  const coverStyle = {
    width: '100%',
    height: '400px',
    background: 'var(--bg-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-secondary)'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const generatedBook = await bookService.generateBook(bookInfo);
      await bookService.saveBook(generatedBook);
      await loadBooks();
    } catch (error) {
      console.error('책 생성 중 오류:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    try {
      await bookService.saveBook(bookInfo);
      await loadBooks();
    } catch (error) {
      console.error('책 저장 중 오류:', error);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ textAlign: 'left', fontSize: 32, fontWeight: 700, marginBottom: 32 }}>북 커버 생성</h1>
      <div className="card">
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ flex: 1.2 }}>
            <div style={coverStyle}>COVER</div>
          </div>
          <div style={{ 
            flex: 1,
            borderLeft: '1px solid var(--border-color)',
            paddingLeft: '2rem'
          }}>
            <div style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '1.25rem', color: 'var(--text-primary)' }}>도서 정보</div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>제목</label>
              <input 
                type="text"
                name="title"
                value={bookInfo.title}
                onChange={handleChange}
                className="input"
                placeholder="책 제목을 입력하세요"
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>설명</label>
              <textarea 
                name="content"
                value={bookInfo.content}
                onChange={handleChange}
                className="input"
                style={{ height: '160px', resize: 'vertical' }}
                placeholder="책에 대한 설명을 입력하세요"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="button" 
                onClick={handleSubmit} 
                className="button"
                disabled={generating}
                style={{ flex: 1 }}
              >
                {generating ? '생성 중...' : '생성하기'}
              </button>
              <button 
                type="button" 
                onClick={handleSave}
                className="button"
                style={{ 
                  flex: 1,
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>생성된 책 목록</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {bookList.map((book) => (
            <div key={book.id} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              margin: 0
            }}>
              <div style={{ 
                aspectRatio: '3/4',
                background: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '1.25rem',
                border: '1px solid var(--border-color)'
              }}>
                COVER
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)'
                }}>
                  {book.title}
                </h3>
                <button 
                  onClick={() => handleDelete(book.id)} 
                  className="button"
                  style={{ 
                    width: '100%',
                    backgroundColor: '#ef4444'
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookGeneration;
