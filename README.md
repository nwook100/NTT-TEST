# NTT PUBG Clan Hub

PUBG(카카오 배틀그라운드) NTT 클랜의 소개용 랜딩 페이지입니다.
React 19 + TypeScript + Vite로 만들어졌고, 스타일은 Tailwind CSS(CDN), 히어로 배경은 Spline 3D 뷰어를 사용합니다.

## 구성

- `App.tsx` – 페이지 전체 레이아웃(히어로, 통계, 클랜 소개, 강점, 업데이트, FAQ, 푸터)
- `constants.tsx` – 메뉴, 통계, 강점, 업데이트 카드 등 화면에 표시되는 데이터
- `components/` – 각 섹션을 구성하는 UI 컴포넌트
- `components/FAQ.tsx` – 자주 묻는 질문 데이터와 아코디언 UI

문구나 이미지를 바꾸려면 대부분 `constants.tsx`와 `components/FAQ.tsx`, 가입 문의 연락처는 `components/Footer.tsx`를 수정하면 됩니다.

## 로컬 실행

사전 준비: Node.js 20 이상

```bash
npm install
```

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## 기타 명령

```bash
npm run typecheck
```

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성되며, 정적 호스팅(GitHub Pages, Vercel, Netlify 등)에 그대로 올릴 수 있습니다.
