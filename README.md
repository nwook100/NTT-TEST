<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/19_TXydqx36lt5QgX1FO9DBEWdioPpEhV

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


---

## 공대장부 (길드 레이드 포인트 장부)

이 저장소에는 NTT 클랜 홈과 함께 **공대장부** 앱이 들어 있습니다.
레이드 참석 포인트, 아이템 분배, 참석률을 기록하는 한국어 모바일 PWA입니다.

- 열기: `npm run dev` 후 `http://localhost:3000/#/ledger`
- 코드: `dkp/`
- 기획·로드맵: [docs/PRODUCT_PLAN.md](docs/PRODUCT_PLAN.md)
