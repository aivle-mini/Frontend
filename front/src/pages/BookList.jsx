import React, { useState, useEffect } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // TODO: API로 책 목록 가져오기
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    // TODO: 실제 API 구현
    const dummyData = [
      { id: 1, title: '청춘의 독서(특별증보판)', author: '유시민', cover: 'https://image.kyobobook.co.kr/images/book/large/123/l9788934971123.jpg' },
      { id: 2, title: '행복한 철학자', author: '강신주', cover: 'https://image.kyobobook.co.kr/images/book/large/456/l9788934971456.jpg' },
      { id: 3, title: '결국 국민이 합니다', author: '이재명', cover: 'https://image.kyobobook.co.kr/images/book/large/789/l9788934971789.jpg' },
      { id: 4, title: '단 한 번의 삶', author: '김영하', cover: 'https://image.kyobobook.co.kr/images/book/large/012/l9788934972012.jpg' },
    ];
    setBooks(dummyData);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ textAlign: 'left', fontSize: 32, fontWeight: 700, marginBottom: 32 }}>책 목록</h1>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        {books.map(book => (
          <div key={book.id} style={{
            width: 200,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(53,87,119,0.08)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'box-shadow 0.2s',
            border: '1px solid #e3e6ed',
          }}>
            <div style={{ width: 160, height: 220, marginBottom: 16, background: '#f4f4f4', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, textAlign: 'center' }}>{book.title}</div>
            <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>{book.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;