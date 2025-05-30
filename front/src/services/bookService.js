const API_URL = 'http://localhost:3000/api'; // API URL 설정

export const bookService = {
  getBooks: async () => {
    const response = await fetch(`${API_URL}/books`);
    return response.json();
  },

  generateBook: async (bookData) => {
    const response = await fetch(`${API_URL}/books/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData)
    });
    return response.json();
  },

  saveBook: async (bookData) => {
    const response = await fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData)
    });
    return response.json();
  },

  deleteBook: async (id) => {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  getBookById: async (id) => {
    const response = await fetch(`${API_URL}/books/${id}`);
    return response.json();
  }
};