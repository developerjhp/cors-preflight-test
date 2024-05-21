import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cacheStatus, setCacheStatus] = useState('disabled');
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cacheMessage, setCacheMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastRequestTime) {
        const timeElapsed = Date.now() - lastRequestTime;
        const timeRemaining = 5000 - timeElapsed;
        setTimeLeft(Math.max(timeRemaining, 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastRequestTime]);

  const handleCacheStatus = message => {
    setCacheStatus(message.includes('enabled') ? 'enabled' : 'disabled');
  };

  const makeRequest = async () => {
    const now = Date.now();

    setLastRequestTime(now);
    setTimeLeft(5000);

    try {
      const postResponse = await fetch('http://localhost:3001/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 'test' }),
      });
      const postResult = await postResponse.json();
      handleCacheStatus(postResult.message);
      console.log('POST:', postResult);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleCache = async () => {
    try {
      const response = await fetch('http://localhost:3001/toggle-cache', {
        method: 'POST',
      });
      const result = await response.json();
      handleCacheStatus(result.message);
      console.log(result.message);

      // 브라우저 종류 감지 및 메시지 설정
      const userAgent = navigator.userAgent;
      if (userAgent.includes('Chrome')) {
        setCacheMessage('Chrome의 경우 브라우저 캐시는 최대 2시간 유지됩니다.');
      } else if (userAgent.includes('Firefox')) {
        setCacheMessage('Firefox의 경우 브라우저 캐시는 최대 24시간 유지됩니다.');
      } else {
        setCacheMessage('');
      }

      setTimeLeft(0);
      setLastRequestTime(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CORS Preflight Test</h1>
        <p>
          Preflight cache is currently: <strong>{cacheStatus}</strong>
        </p>
        <button onClick={makeRequest}>Make CORS Request</button>
        <button onClick={toggleCache}>Toggle Preflight Cache</button>
        {cacheMessage && <p>{cacheMessage}</p>}
        {timeLeft > 0 && (
          <>
            <p>{Math.ceil(timeLeft / 1000)}초 이내에 다시 요청하면 Preflight 요청이 생략됩니다.</p>
            <p>(브라우저의 기본 캐시 시간은 5초입니다)</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
