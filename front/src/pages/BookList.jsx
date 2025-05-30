import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ textAlign: 'left', fontSize: 32, fontWeight: 700, marginBottom: 32 }}>책 목록</h1>
      <div style={{ 
        width: 940, // 4 * 220(card) + 3 * 20(gap)
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
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
              ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div style={{
              width: '100%',
              height: '180px',
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {book.imageUrl ? (
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
                <div style={{ color: '#999' }}>No Image</div>
              )}
            </div>
            <div style={{ padding: '12px 16px' }}>
              <h3 style={{ 
                margin: 0,
                fontSize: '16px',
                fontWeight: 600,
                color: '#333',
                marginBottom: '8px'
              }}>
                {book.title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#666',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {book.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;