import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const loadedBooks = await bookService.getBooks();
      setBooks(loadedBooks);
    } catch (error) {
      console.error('책 목록 로딩 중 오류:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 책을 삭제하시겠습니까?')) {
      try {
        await bookService.deleteBook(id);
        await loadBooks();
      } catch (error) {
        console.error('책 삭제 중 오류:', error);
      }
    }
  };

  return (
    <div style={{ 
      maxWidth: 1100, 
      margin: '40px auto', 
      padding: '0 16px',
      background: isDarkMode ? '#0f172a' : '#f8fafc',
      minHeight: 'calc(100vh - 96px)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32
      }}>
        <h1 style={{ 
          fontSize: 32, 
          fontWeight: 700, 
          color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
        }}>책 목록</h1>
        <button
          onClick={loadBooks}
          style={{ 
            padding: '8px 16px',
            background: isDarkMode ? '#374151' : '#f1f5f9',
            border: 'none',
            borderRadius: 8,
            color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            ':hover': {
              background: isDarkMode ? '#4b5563' : '#e2e8f0'
            }
          }}
        >
          <span>🔄</span>
          새로고침
        </button>
      </div>
      <div style={{ 
        width: 940,
        margin: '40px auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
      }}>
        {books.map((book) => (
          <div 
            key={book.id}
            onClick={() => navigate(`/books/${book.id}`)}
            style={{
              cursor: 'pointer',
              background: isDarkMode ? '#1e293b' : '#fff',
              border: `1px solid ${isDarkMode ? '#334155' : '#ddd'}`,
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'all 0.2s ease',
              ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: isDarkMode 
                  ? '0 4px 12px rgba(0,0,0,0.2)' 
                  : '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div style={{
              width: '100%',
              height: '180px',
              background: isDarkMode ? '#0f172a' : '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {book.imageUrl && !book.isDeleted ? (
                <img 
                  src={book.imageUrl} 
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {book.isDeleted ? '삭제된 이미지' : '이미지 없음'}
                </div>
              )}
            </div>
            <div style={{ padding: '12px 16px' }}>
              <h3 style={{ 
                margin: 0,
                fontSize: '16px',
                fontWeight: 600,
                color: isDarkMode ? '#e5e7eb' : '#333',
                marginBottom: '8px'
              }}>
                {book.title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: isDarkMode ? '#9ca3af' : '#666',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {book.content}
              </p>
              <div style={{
                fontSize: '13px',
                color: isDarkMode ? '#6b7280' : '#94a3b8',
                marginTop: '8px',
                marginBottom: '16px'
              }}>
                <p style={{ margin: '0 0 4px 0' }}>
                  작성자: {book.user?.name || '알 수 없음'}
                </p>
                <p style={{ margin: 0, fontSize: '12px' }}>
                  작성일: {new Date(book.createdAt).toLocaleDateString()}
                </p>
              </div>
              {!book.isDeleted && user && user.id === book.user?.id && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/books/${book.id}/edit`);
                    }}
                    style={{ 
                      flex: 1,
                      padding: '8px',
                      background: isDarkMode ? '#374151' : '#f1f5f9',
                      color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    편집
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(book.id);
                    }}
                    style={{ 
                      flex: 1,
                      padding: '8px',
                      background: isDarkMode ? '#dc2626' : '#fee2e2',
                      color: isDarkMode ? '#fff' : '#dc2626',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;