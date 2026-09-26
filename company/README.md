# 신성테크놀로지 홈페이지 (company/)

`index.html`을 더블클릭하면 설치 없이 브라우저에서 바로 열립니다.

## 파일 구성
| 파일 | 역할 | 언제 고치나 |
| --- | --- | --- |
| `index.html` | 글자와 화면 구조 | 문구 · 연락처 수정 (`✏️` 표시) |
| `site.css` | 색 · 글꼴 · 배치 | 맨 위 `:root`의 `--accent`를 바꾸면 강조색이 전부 바뀜 |
| `src/main.js` | 3D 웨이퍼링 · 스크롤 애니메이션 원본 코드 | 움직임을 바꿀 때 |
| `app.js` | `src/main.js`를 묶은 결과물 | 직접 고치지 않음 |

`src/main.js`를 고쳤다면 이 폴더에서 아래를 실행해 `app.js`를 다시 만듭니다.
```
npm install
npm run build
```

## 화면 구성
1. 로딩 화면: 0→100% 카운터. 같은 방문 중에는 한 번만 보입니다.
2. 첫 화면: 3D 웨이퍼링 + 웨이퍼. 스크롤하면 웨이퍼 · 다이싱 테이프 · 링으로 분해되고 부품 설명이 붙습니다.
3. 흐르는 제품명 띠
4. 회사 소개 한 문장: 스크롤에 따라 단어가 하나씩 켜집니다.
5. 제품 4종: PC에서는 화면이 멈추고 가로로 넘어갑니다.
6. 숫자: 300mm · Ra 0.1μm · 생산성 30% · 전수검사 100%
7. 웨이퍼링 공정 8단계 (드라이브 `NEW 12in Wafer RING` PPT 기준)
8. 문의

## Magnific으로 제품 이미지 넣기
아래 이름으로 `images/` 폴더에 저장하면 제품 패널에 자동으로 표시됩니다.
이미지가 없으면 파란 그라데이션과 큰 제품명 글자가 대신 보입니다.

| 파일명 | 권장 비율 | Magnific 프롬프트 예시 |
| --- | --- | --- |
| `magazine.jpg` | 1:1 | aluminum semiconductor lead frame magazine with many slots, product photo, black background, blue rim light |
| `ring.jpg` | 1:1 | 12 inch stainless steel wafer ring frame, product photo, black background, reflective metal, blue rim light |
| `cassette.jpg` | 1:1 | 12 inch wafer ring frame cassette carrier, precision engineering, black background, blue rim light |
| `pinboat.jpg` | 1:1 | semiconductor reflow pin boat jig with precision pins, black background, macro product photo |

팁: 실제 제품 사진을 Magnific **Upscaler**로 선명하게 만든 뒤 넣으면 AI로 새로 만든 이미지보다 고객사에 신뢰를 줍니다.
배경을 검정으로 맞추면 사이트 분위기와 잘 어울립니다.
