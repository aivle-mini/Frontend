import React, { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { useNavigate, useParams } from 'react-router-dom';

function BookGeneration() {
  const { id } = useParams();  // URL에서 책 ID를 가져옴
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState({
    title: '',
    content: '',
    imageUrl: null,
    userEmail: authService.getCurrentUser()?.email || ''
  });
  const [generating, setGenerating] = useState(false);
  const isEditMode = !!id;  // id가 있으면 수정 모드

  // 수정 모드일 때 기존 책 정보 불러오기
  useEffect(() => {
    if (isEditMode) {
      loadBookData();
    }
  }, [id]);

  const loadBookData = async () => {
    try {
      const book = await bookService.getBookById(id);
      setBookInfo({
        title: book.title,
        content: book.content,
        imageUrl: book.imageUrl,
        userEmail: book.user.email
      });
    } catch (error) {
      console.error('책 정보 로딩 중 오류:', error);
      navigate('/books');  // 에러 시 목록으로 이동
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
      if (isEditMode) {
        await bookService.updateBook(id, bookInfo);
      } else {
        await bookService.saveBook(bookInfo);
      }
      navigate('/books');
    } catch (error) {
      console.error(isEditMode ? '책 수정 중 오류:' : '책 저장 중 오류:', error);
    }
  };

  const coverStyle = {
    width: '100%',
    height: '350px',
    background: isDarkMode ? '#1a1a1a' : '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    border: `1px solid ${isDarkMode ? '#4a5568' : '#bbb'}`,
    borderRadius: '12px',
    overflow: 'hidden',
    color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
    position: 'relative',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
    background: isDarkMode ? '#1a1a1a' : '#fff',
    color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none',
    marginRight: '16px'
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
      background: isDarkMode ? '#0f172a' : '#f8fafc',
      minHeight: 'calc(100vh - 96px)',
      paddingBottom: '40px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ 
        maxWidth: '940px', 
        margin: '40px auto', 
        border: `2px solid ${isDarkMode ? '#334155' : '#357'}`, 
        borderRadius: '20px', 
        padding: 32, 
        background: isDarkMode ? '#1e293b' : '#fff',
        transition: 'all 0.3s ease'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: 32,
          color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
          fontSize: '32px'
        }}>{isEditMode ? '책 수정' : '북 커버 생성'}</h1>
        
        <div style={{ display: 'flex', gap: 32 }}>
          {/* COVER 영역 */}
          <div style={{ flex: 1 }}>
            <div style={coverStyle}>
              {bookInfo.imageUrl ? (
                <img 
                  src={bookInfo.imageUrl} 
                  alt="생성된 책 표지" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  color: isDarkMode ? '#9ca3af' : '#64748b'
                }}>
                  <span style={{ fontSize: '48px' }}>📚</span>
                  <span style={{ fontSize: '18px' }}>커버 이미지 미리보기</span>
                </div>
              )}
            </div>
          </div>

          {/* info 입력 영역 */}
          <div style={{ 
            flex: 1, 
            borderLeft: `2px solid ${isDarkMode ? '#4a5568' : '#eee'}`, 
            paddingLeft: 32,
            paddingRight: 16,
            color: isDarkMode ? '#e5e7eb' : '#1a1a1a'
          }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ 
                display: 'block', 
                fontSize: 16, 
                marginBottom: 8,
                color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
                fontWeight: '600'
              }}>
                책 제목
              </label>
              <input 
                type="text" 
                name="title"
                value={bookInfo.title}
                onChange={handleChange}
                placeholder="책 제목을 입력하세요"
                style={{
                  ...inputStyle,
                  height: '48px'
                }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ 
                display: 'block', 
                fontSize: 16, 
                marginBottom: 8,
                color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
                fontWeight: '600'
              }}>
                책 내용
              </label>
              <textarea 
                name="content"
                value={bookInfo.content}
                onChange={handleChange}
                placeholder="책 내용을 입력하세요."
                style={{
                  ...inputStyle,
                  height: '160px',
                  resize: 'none',
                  lineHeight: '1.5'
                }}
              />
              <p style={{ 
                fontSize: '14px', 
                color: isDarkMode ? '#9ca3af' : '#64748b',
                marginTop: '8px' 
              }}>
                * 제목과 내용을 참고하여 AI 이미지를 생성합니다.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button 
                type="button" 
                onClick={handleGenerate}
                disabled={generating}
                style={{ 
                  flex: 2,
                  padding: '14px', 
                  background: generating ? (isDarkMode ? '#1d4ed8' : '#93c5fd') : (isDarkMode ? '#3b82f6' : '#2563eb'), 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8,
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: generating ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {generating ? (
                  <>
                    <span style={{ fontSize: '18px' }}>🎨</span>
                    생성 중...
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '18px' }}>✨</span>
                    AI 커버 {isEditMode ? '재생성' : '생성'}하기
                  </>
                )}
              </button>
              <button 
                type="button" 
                onClick={handleSave}
                style={{ 
                  flex: 1,
                  padding: '14px',
                  border: `1.5px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
                  borderRadius: 8,
                  background: isDarkMode ? '#2d2d2d' : '#fff',
                  color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {isEditMode ? '수정' : '저장'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookGeneration;
