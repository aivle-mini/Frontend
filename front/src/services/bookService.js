const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // OpenAI API Key

export const bookService = {
  getBooks: async () => {
    return JSON.parse(localStorage.getItem("books") || "[]");
  },

  generateBook: async (bookData, options = { useLocalAI: true }) => {
    // OpenAI 직접 호출
    const prompt = `${bookData.title}. ${bookData.content}`;
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

    const data = await response.json();
    const imageUrl = data?.data?.[0]?.url || null;

    return {
      id: Date.now(),
      ...bookData,
      imageUrl
    };
  },

  saveBook: async (bookData) => {
    const saved = JSON.parse(localStorage.getItem("books") || "[]");
    saved.push(bookData);
    localStorage.setItem("books", JSON.stringify(saved));
    return bookData;
  },

  deleteBook: async (id) => {
    const saved = JSON.parse(localStorage.getItem("books") || "[]");
    const filtered = saved.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(filtered));
  },

  getBookById: async (id) => {
    const saved = JSON.parse(localStorage.getItem("books") || "[]");
    return saved.find((book) => book.id === id);
  }
};
