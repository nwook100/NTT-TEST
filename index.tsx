
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const initApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical: 'root' element not found in DOM.");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("NTT Application initialized successfully.");
  } catch (error) {
    console.error("Failed to render React application:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; color: white; background: #050505; text-align: center; font-family: sans-serif; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="color: #ff6b35; font-size: 2rem; margin-bottom: 20px;">Application Error</h1>
        <p style="color: #888; margin-bottom: 30px;">화면을 로드하는 중 오류가 발생했습니다. 브라우저 콘솔을 확인해 주세요.</p>
        <pre style="text-align: left; background: #111; padding: 20px; border-radius: 12px; overflow: auto; max-width: 90%; border: 1px solid #333; font-size: 0.8rem; color: #ff6b35;">${error instanceof Error ? error.stack || error.message : String(error)}</pre>
        <button onclick="window.location.reload()" style="margin-top: 30px; background: #ff6b35; color: white; border: none; padding: 12px 30px; border-radius: 99px; cursor: pointer; font-weight: bold; transition: opacity 0.2s;">페이지 새로고침</button>
      </div>
    `;
  }
};

// DOM이 완전히 준비된 후 실행되도록 보장
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
