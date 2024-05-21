# CORS Preflight Test

이 프로젝트는 CORS Preflight 요청을 테스트하고 브라우저 캐시 동작을 확인하는 예제 애플리케이션입니다.

## 기능

- **Make CORS Request**: CORS 요청을 보내고 Preflight 요청을 확인합니다.
- **Toggle Preflight Cache**: Preflight 캐시 설정을 토글하고, 브라우저 캐시 안내 메시지를 표시합니다.

## 실행 방법

1. **클라이언트 실행**

   - 터미널에서 `client` 폴더에 접근합니다.
     ```bash
     cd client
     ```
   - 필요한 패키지를 설치합니다.
     ```bash
     npm install
     ```
   - 클라이언트 애플리케이션을 실행합니다.
     ```bash
     npm start
     ```

2. **서버 실행**
   - 터미널에서 `server` 폴더에 접근합니다.
     ```bash
     cd server
     ```
   - 필요한 패키지를 설치합니다.
     ```bash
     npm install
     ```
   - 서버 애플리케이션을 실행합니다.
     ```bash
     node server.js
     ```

## 테스트 방법

1. 브라우저에서 클라이언트 애플리케이션이 실행된 페이지(http://localhost:3000)로 이동합니다.
2. 브라우저의 개발자 도구를 엽니다 (예: Chrome에서는 F12 또는 Ctrl+Shift+I).
3. `Make CORS Request` 버튼을 클릭합니다.

- 개발자 도구의 Network 탭에서 OPTIONS 요청이 발생한 후, POST 요청이 발생하는 것을 확인합니다.

4. Toggle Preflight Cache 버튼을 클릭하여 Preflight 캐시 설정을 변경합니다.

- 브라우저 종류에 따라 Chrome과 Firefox의 캐시 유지 시간에 대한 안내 메시지가 표시됩니다.

5. Make CORS Request 버튼을 다시 클릭하여, Preflight 요청이 발생하는지 확인합니다.

- 캐시가 활성화된 경우: 첫 번째 OPTIONS 요청 이후 일정 시간 동안 동일한 요청에서 Preflight 요청이 발생하지 않아야 합니다.
- 캐시가 비활성화된 경우: OPTIONS 요청이 매번 발생해야 합니다.

1. **개발자 도구 열기**

   - 브라우저에서 클라이언트 애플리케이션이 실행된 페이지(`http://localhost:3000`)로 이동합니다.
   - 브라우저의 개발자 도구를 엽니다 (예: Chrome에서는 `F12` 또는 `Ctrl+Shift+I`).

2. **Preflight 요청 확인**

   - "Make CORS Request" 버튼을 클릭합니다.
   - 개발자 도구의 `Network` 탭에서 `OPTIONS` 요청이 발생한 후, `POST` 요청이 발생하는 것을 확인합니다.

3. **Preflight 캐시 토글**
   - "Toggle Preflight Cache" 버튼을 클릭하여 Preflight 캐시 설정을 변경합니다.
   - "Make CORS Request" 버튼을 다시 클릭하여, Preflight 요청이 발생하는지 확인합니다.
     - 캐시가 활성화된 경우: 첫 번째 `OPTIONS` 요청 이후 일정 시간 동안 동일한 요청에서 Preflight 요청이 발생하지 않아야 합니다.
     - 캐시가 비활성화된 경우: `OPTIONS` 요청이 매번 발생해야 합니다.
