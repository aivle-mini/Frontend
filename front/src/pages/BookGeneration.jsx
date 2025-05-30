import React, { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';

function BookGeneration() {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    content: '',
    imageUrl: null // 이미지도 bookInfo에 포함
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookGeneration;
