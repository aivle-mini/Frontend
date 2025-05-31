import React, { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';
import { useTheme } from '../contexts/ThemeContext';

function BookGeneration() {
  const { isDarkMode } = useTheme();
  const [bookInfo, setBookInfo] = useState({
    title: '',
    content: '',
    imageUrl: null
  });
  const [generating, setGenerating] = useState(false);
  const [descPopup, setDescPopup] = useState({ open: false, desc: '' });
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
        id: Date.now()
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
    background: isDarkMode ? '#1a1a1a' : '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    border: `1px solid ${isDarkMode ? '#4a5568' : '#bbb'}`,
    borderRadius: '8px',
    overflow: 'hidden',
    color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
  };

  const thumbStyle = {
    width: '64px',
    height: '64px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginRight: '12px',
    border: `1px solid ${isDarkMode ? '#4a5568' : '#bbb'}`
  };

  return (
    <div style={{
      background: isDarkMode ? '#1a1a1a' : '#f8fafc',
      minHeight: 'calc(100vh - 96px)',
      paddingBottom: '40px'
    }}>
      <div style={{ 
        maxWidth: '940px', 
        margin: '40px auto', 
        border: `2px solid ${isDarkMode ? '#4a5568' : '#357'}`, 
        borderRadius: '20px', 
        padding: 32, 
        background: isDarkMode ? '#2d2d2d' : '#fff' 
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: 32,
          color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
          fontSize: '32px'
        }}>북 커버 생성</h1>
        <div style={{ display: 'flex', gap: 24 }}>
          {/* COVER 영역 */}
          <div style={{ flex: 1 }}>
            <div style={coverStyle}>
              {bookInfo.imageUrl ? (
                <img 
                  src={bookInfo.imageUrl} 
                  alt="생성된 책 표지" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                'COVER'
              )}
            </div>
          </div>
          {/* info 입력 영역 */}
          <div style={{ 
            flex: 1, 
            borderLeft: `2px solid ${isDarkMode ? '#4a5568' : '#eee'}`, 
            paddingLeft: 24,
            color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
          }}>
            <div style={{ marginBottom: 12, fontWeight: 'bold' }}>도서 정보</div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>제목</label>
              <input 
                type="text" 
                name="title"
                value={bookInfo.title}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: 6, 
                  borderRadius: 4, 
                  border: `1px solid ${isDarkMode ? '#4a5568' : '#ccc'}`,
                  background: isDarkMode ? '#1a1a1a' : '#fff',
                  color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
                }} 
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>설명</label>
              <textarea 
                name="content"
                value={bookInfo.content}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  height: 60, 
                  padding: 6, 
                  borderRadius: 4, 
                  border: `1px solid ${isDarkMode ? '#4a5568' : '#ccc'}`,
                  background: isDarkMode ? '#1a1a1a' : '#fff',
                  color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                type="button" 
                onClick={handleGenerate}
                disabled={generating}
                style={{ 
                  padding: '6px 18px', 
                  background: generating ? (isDarkMode ? '#1d4ed8' : '#ccc') : (isDarkMode ? '#3b82f6' : '#2563eb'), 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 4,
                  cursor: generating ? 'not-allowed' : 'pointer'
                }}
              >
                {generating ? '생성 중...' : '생성하기'}
              </button>
              <button 
                type="button" 
                onClick={handleSave}
                style={{ 
                  padding: '6px 18px',
                  border: `1px solid ${isDarkMode ? '#4a5568' : '#ccc'}`,
                  borderRadius: 4,
                  background: isDarkMode ? '#2d2d2d' : '#fff',
                  color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
                  cursor: 'pointer'
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
        {/* 리스트 헤더 + 리프레시 버튼 */}
        <div style={{ 
          marginTop: 40, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
        }}>
          <button 
            onClick={loadBooks} 
            style={{ 
              fontSize: 12, 
              padding: '4px 10px',
              background: isDarkMode ? '#2d2d2d' : '#fff',
              border: `1px solid ${isDarkMode ? '#4a5568' : '#ccc'}`,
              borderRadius: 4,
              color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
              cursor: 'pointer'
            }}
          >
            🔄 refresh
          </button>
          <div style={{ fontWeight: 'bold' }}>Book List</div>
        </div>
        {/* BOOK LIST 하단 영역 */}
        <div style={{ marginTop: 32 }}>
          {bookList.map((book) => (
            <div 
              key={book.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '12px', 
                border: `1px solid ${isDarkMode ? '#4a5568' : '#bbb'}`, 
                padding: '12px 16px', 
                borderRadius: '8px', 
                background: isDarkMode ? '#1a1a1a' : '#fafbfc',
                color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={book.imageUrl} alt={book.title} style={thumbStyle} />
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{book.title}</div>
                  <div style={{ fontSize: 14, color: isDarkMode ? '#9ca3af' : '#666' }}>{book.content}</div>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(book.id)}
                style={{ 
                  padding: '4px 12px',
                  background: isDarkMode ? '#dc2626' : '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookGeneration;
