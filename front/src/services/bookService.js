const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // OpenAI API Key
const API_URL = 'http://localhost:8080/api/v1/books';  // URL 경로 수정

// 백엔드 응답을 프론트엔드 형식으로 변환하는 헬퍼 함수
const transformBookData = (book) => ({
  id: book.id,
  title: book.title,
  content: book.content,
  imageUrl: book.image_url,
  isDeleted: book.is_deleted,
  createdAt: book.created_at,
  updatedAt: book.updated_at,
  user: book.user
});

export const bookService = {
  getBooks: async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const error = await response.json();
        
        throw new Error(error.message || '책 목록을 불러오는데 실패했습니다.');
      }

      const books = await response.json();
      console.log(books);
      return books.map(transformBookData);
    } catch (error) {
      console.error('책 목록 조회 중 오류:', error);
      throw error;
    }
  },

  generateBook: async (bookData, options = { useLocalAI: true }) => {
    // OpenAI 직접 호출
    const prompt = `Title: ${bookData.title}. Content: ${bookData.content}` + " Please refer to what you posted and see the image for the book cover";
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "512x512"
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'AI 이미지 생성에 실패했습니다.');
    }

    const data = await response.json();
    const imageUrl = data?.data?.[0]?.url || null;

    return {
      ...bookData,
      imageUrl
    };
  },

  saveBook: async (bookData) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`${API_URL}`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: bookData.title,
          content: bookData.content,
          image_url: bookData.imageUrl,
          userId: currentUser.id
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '책 저장에 실패했습니다.');
      }

      const savedBook = await response.json();
      return transformBookData(savedBook);
    } catch (error) {
      console.error('책 저장 중 오류:', error);
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '책 삭제에 실패했습니다.');
      }

      const deletedBook = await response.json();
      return transformBookData(deletedBook);
    } catch (error) {
      console.error('책 삭제 중 오류:', error);
      throw error;
    }
  },

  getBookById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '책 정보를 불러오는데 실패했습니다.');
      }

      const book = await response.json();
      return transformBookData(book);
    } catch (error) {
      console.error('책 조회 중 오류:', error);
      throw error;
    }
  },

  updateBook: async (id, bookData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: bookData.title,
          content: bookData.content,
          image_url: bookData.imageUrl
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '책 수정에 실패했습니다.');
      }

      const updatedBook = await response.json();
      return transformBookData(updatedBook);
    } catch (error) {
      console.error('책 수정 중 오류:', error);
      throw error;
    }
  }
};
