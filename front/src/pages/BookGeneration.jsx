import React, { useState } from 'react';

function BookGeneration() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      // TODO: API 연동
      console.log('책 생성 요청:', prompt);
    } catch (error) {
      console.error('책 생성 중 오류:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <h1>AI 책 생성</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="어떤 책을 생성하고 싶으신가요? (주제, 장르, 분위기 등을 자세히 설명해주세요)"
          rows={5}
        />
        <button type="submit" disabled={generating}>
          {generating ? '생성 중...' : '책 생성하기'}
        </button>
      </form>
    </div>
  );
}

export default BookGeneration;