const express = require('express');
const cors = require('cors');

const app = express();

// Preflight 캐시를 활성화하거나 비활성화하는 플래그
// 아래 값을 변경하고, node server/server.js를 실행하여 테스트
const isPreflightCacheEnabled = false;

const getCorsOptions = () => ({
  origin: 'http://localhost:3000', // 클라이언트 도메인
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
  optionsSuccessStatus: 204,
  preflightContinue: false,
  /* 플래그에 따라 Preflight 캐시 설정
    파이어폭스는 최대 24시간 크롬은 최대 2시간 캐싱
    기본값은 5
    */
  maxAge: isPreflightCacheEnabled ? 86400 : 5,
});

app.use((req, res, next) => {
  cors(getCorsOptions())(req, res, next);
});

app.use(express.json());

app.options('*', cors(getCorsOptions())); // Preflight 요청 처리

app.get('/api/test', (req, res) => {
  res.json({ message: 'GET request successful' });
});

app.post('/api/test', (req, res) => {
  res.json({ message: 'POST request successful' });
});

// 캐시 설정을 변경할 수 있는 엔드포인트
app.post('/toggle-cache', (req, res) => {
  res.json({ message: `Preflight cache is now ${!isPreflightCacheEnabled ? 'enabled' : 'disabled'}` });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
