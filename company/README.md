# 회사 홈페이지 (company/)

파일 하나(`index.html`)로 된 홈페이지입니다. 설치 없이 더블클릭하면 브라우저에서 열립니다.

## 1. 글자 고치기
`index.html`에서 `✏️` 표시가 있는 곳을 찾아 바꿉니다.
- 회사명: `우리회사` → 실제 회사명 (찾기·바꾸기로 한 번에)
- 숫자(경력, 정밀도 등), 연락처, 주소, 사업자번호

## 2. Magnific으로 이미지 넣기
아래 이름으로 `images/` 폴더에 저장하면 자동으로 표시됩니다.
이미지가 없으면 파란 그라데이션 배경이 대신 보입니다.

| 파일명 | 비율 | Magnific 프롬프트 예시 |
| --- | --- | --- |
| `factory.jpg` | 4:3 | clean modern CNC machining factory, semiconductor equipment parts, blue cinematic lighting, photorealistic |
| `magazine.jpg` | 1:1 | aluminum semiconductor lead frame magazine with many slots, product photo, dark background, studio lighting |
| `cassette.jpg` | 1:1 | 12 inch wafer cassette carrier, precision engineering, dark background, blue rim light, product shot |
| `ring.jpg` | 1:1 | stainless steel wafer dicing ring frame, top view, dark background, reflective metal, product shot |
| `pinboat.jpg` | 1:1 | semiconductor reflow pin boat jig with precision pins, dark background, macro product photo |

팁: 실제 제품 사진이 있으면 그 사진을 Magnific **Upscaler**로 선명하게 만든 뒤 넣는 게
AI로 새로 만든 이미지보다 영업용으로 더 신뢰를 줍니다.

## 3. 3D 배경 바꾸기 (선택)
첫 화면 배경은 Spline 3D 장면입니다. spline.design에서 장면을 만들고
Export → Code → Viewer 주소를 `<spline-viewer url="...">`에 넣으면 바뀝니다.
