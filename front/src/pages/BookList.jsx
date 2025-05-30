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
      { id: 1, title: '책 제목 1', author: '작가 1' },
      { id: 2, title: '책 제목 2', author: '작가 2' },
    ];
    setBooks(dummyData);
  };

  return (
    <div>
      <h1>책 목록</h1>
      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;