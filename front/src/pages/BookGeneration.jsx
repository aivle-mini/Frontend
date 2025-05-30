import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box 
} from '@mui/material';

function BookGeneration() {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    content: ''
  });
  const [generating, setGenerating] = useState(false);
  const [bookList, setBookList] = useState([
    { id: 1, title: 'BOOK LIST 1' },
    { id: 2, title: 'BOOK LIST 2' },
    { id: 3, title: 'BOOK LIST 3' },
  ]);

  const handleDelete = (id) => {
    setBookList((prev) => prev.filter((book) => book.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      // TODO: API 연동
      console.log('책 생성 요청:', bookInfo);
    } catch (error) {
      console.error('책 생성 중 오류:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        BOOK COVER GENERATE
      </Typography>
      
      <Grid container spacing={4}>
        {/* 왼쪽 커버 미리보기 */}
        <Grid item xs={12} md={8} lg={7}>
          <Paper
            sx={{
              p: 4,
              height: 700,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#f5f5f5'
            }}
          >
            <Typography variant="h2" component="h2" gutterBottom>
              COVER
            </Typography>
            <Typography variant="h4">
              {bookInfo.title || '제목을 입력하세요'}
            </Typography>
          </Paper>
        </Grid>

        {/* 오른쪽 입력 폼 */}
        <Grid item xs={12} md={4} lg={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              책 정보 입력
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="제목"
                name="title"
                value={bookInfo.title}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="내용"
                name="content"
                value={bookInfo.content}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={generating}
                >
                  {generating ? '생성 중...' : '생성하기'}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={generating}
                >
                  저장하기
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* 하단 책 목록 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom align="center">
          생성된 책 목록
        </Typography>
        <Grid container spacing={2} sx={{ maxWidth: 800, mx: 'auto' }}>
          {bookList.map((book) => (
            <Grid item xs={12} key={book.id}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography>{book.title}</Typography>
                <Button 
                  variant="outlined" 
                  color="error" 
                  size="small"
                  onClick={() => handleDelete(book.id)}
                >
                  삭제
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default BookGeneration;
