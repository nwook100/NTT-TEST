# 3D 제품 모델 (three.js)

`parts/` 안의 파일 하나가 제품 하나입니다. 제품 사진(카탈로그)을 보고 실제 형상에 맞게 만든 절차적(코드) 모델입니다.

| 파일 | 제품 | 옵션 |
|------|------|------|
| `parts/ring.js` | 웨이퍼 링 (SUS 420 J2) | `size: 6/8/12`, `plastic: true` |
| `parts/magazine.js` | 엔드 커버 매거진 | `finish: 'silver'/'red'`, `endCover`, `strips` |
| `parts/cassette.js` | 8" 웨이퍼 카세트 & 링 | `rings`, `wafer`, `finish: 'alu'/'plastic'` |
| `parts/pinboat.js` | 핀 보트 | `withStrip` |
| `parts/materials.js` | 공용 재질(알루미늄, SUS, 아노다이징 색, 구리 등) | |

규약은 `PARTS_API.md`에 있습니다. 단위는 mm, 바닥이 y=0, 정면이 +z 입니다.

## 보기

- `index.html`: 네 제품을 어두운 스튜디오에 놓고 카메라가 도는 8초 장면. `node shoot.cjs clip out.mp4` 로 MP4 추출.
- `harness.html?part=ring`: 흰 배경에서 부품 하나를 4방향으로 확인하는 검수용 페이지. `node shoot-part.cjs ring` 으로 합본 이미지 생성.
- 상위 폴더의 `index.html`(45초 홍보 영상)은 제품 장면에서 이 부품들을 불러와 3D로 보여 줍니다. three.js 를 불러오지 못하면 2D 선화로 자동 대체됩니다.

## 수정하기

형상을 바꾸려면 해당 `parts/*.js` 를 고친 뒤 `node shoot-part.cjs <이름>` 으로 렌더해 `renders/<이름>_sheet.png` 를 확인하세요.
제품 CAD(STEP/STL)가 있으면 glTF로 변환해 불러오는 쪽이 더 정확합니다. 그때는 `parts/<이름>.js` 가 GLTFLoader 로 파일을 읽어 그룹을 돌려주면 됩니다.
