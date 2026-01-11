
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: Could not find root element to mount the application.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error during application initialization:", error);
    rootElement.innerHTML = `<div style="padding: 20px; color: white; background: #050505;">애플리케이션을 로드하는 중 오류가 발생했습니다. 개발자 도구 콘솔을 확인해 주세요.</div>`;
  }
}
