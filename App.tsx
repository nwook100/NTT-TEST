import React, { useState } from 'react';

// App은 이 웹페이지 전체를 그리는 "설계도" 함수입니다.
// 화면에 보이는 모든 내용은 이 함수 안에서 결정됩니다.
const App: React.FC = () => {
  // useState는 "화면이 기억해야 할 값"을 만듭니다.
  // count: 현재 값 / setCount: 그 값을 바꾸는 함수
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-10 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          안녕하세요! 👋
        </h1>
        <p className="text-gray-600 leading-relaxed">
          이 페이지는 클로드와 함께 만든 첫 번째 웹페이지입니다.
          아래 버튼을 눌러서 숫자가 바뀌는 걸 확인해 보세요.
        </p>

        <div className="text-5xl font-bold text-blue-600">
          {count}
        </div>

        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          버튼 누르기
        </button>
      </div>
    </div>
  );
};

export default App;
