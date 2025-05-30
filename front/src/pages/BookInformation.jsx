import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookService } from '../services/bookService';

function BookInformation() {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    try {
      const bookData = await bookService.getBookById(id);
      setBook(bookData);
    } catch (error) {
      console.error('책 정보 로딩 중 오류:', error);
    }
  };

  const defaultImage = 'https://via.placeholder.com/250x350?text=No+Image';

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

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', border: '2px solid #357', borderRadius: '20px', padding: 24, background: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>BOOK INFORMATION</h1>
      <div style={{ display: 'flex', gap: 24 }}>
        {/* COVER 영역 */}
        <div style={{ flex: 1 }}>
          <img 
            src={book.imageUrl || defaultImage} 
            alt={`${book.title} 표지`}
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              border: '1px solid #bbb',
              borderRadius: '8px',
            }}
          />
        </div>
        {/* info 표시 영역 */}
        <div style={{ flex: 1, borderLeft: '2px solid #eee', paddingLeft: 24 }}>
          <div style={{ marginBottom: 12, fontWeight: 'bold' }}>info</div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>title</label>
            <div style={{ 
              width: '100%', 
              padding: 6, 
              borderRadius: 4, 
              border: '1px solid #ccc',
              minHeight: '30px',
              background: '#fafbfc'
            }}>
              {book.title}
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>content</label>
            <div style={{ 
              width: '100%', 
              padding: 6, 
              borderRadius: 4, 
              border: '1px solid #ccc',
              minHeight: '60px',
              background: '#fafbfc'
            }}>
              {book.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookInformation;