# 3D 부품 작성 규약 (three.js r128)

## 파일과 함수
- 파일: `parts/<name>.js` (예: `parts/magazine.js`)
- 내용:
  ```js
  window.PARTS = window.PARTS || {};
  window.PARTS.magazine = function (THREE, MAT, opts) {
    opts = Object.assign({ /* 기본 옵션 */ }, opts || {});
    const g = new THREE.Group();
    // ... 메시를 만들어 g.add(...)
    return g;
  };
  ```
- `THREE`는 r128 전역, `MAT`는 `parts/materials.js`의 재질 팩토리(`MAT.alu()`, `MAT.sus()`, `MAT.aluRed()` …). 색/질감은 반드시 MAT에서 가져온다. 미세 조정이 필요하면 `MAT.alu()` 결과를 수정해서 쓴다(새 재질을 임의 색으로 만들지 않는다).
- 외부 파일(이미지, 모델) 사용 금지. 텍스처가 필요하면 코드에서 CanvasTexture로 생성한다.

## 좌표/단위
- 단위: 1 = 1 mm. 실제 치수에 가깝게 만든다.
- 모델의 바닥이 y = 0 에 닿고, x·z 중심이 0, 정면(사진에서 보이는 열린 면)은 +z 방향.
- 반복되는 요소(슬롯 리브, 핀, 링 적층 등)는 geometry를 재사용하고, 전체 메시 수는 600개 이하로 유지한다. 많으면 InstancedMesh를 쓴다.
- 모든 메시는 하네스가 자동으로 그림자를 켠다. 재질의 side를 바꿀 필요가 있으면 clone 후 설정.

## 검수 렌더
```
node shoot-part.cjs <name>                      # renders/<name>_sheet.png (4방향 2x2 합본)
node shoot-part.cjs <name> '{"finish":"red"}'   # 옵션 전달 → renders/<name>_finishred_sheet.png
node shoot-part.cjs cassette '{}' ring          # parts/ring.js 를 먼저 불러오고 cassette 빌드
```
출력 JSON의 `bbox.size`(mm), `meshCount`, `pageErrors`를 확인한다. 오류가 있으면 코드부터 고친다.
렌더 합본은 Read 도구로 열어 본다. 참고 사진과 나란히 보고 실루엣·비율·부품 수·재질을 맞춘다.

## 흰 배경 하네스에서 보는 시점
v0 정면 3/4(위에서), v1 측면, v2 위에서, v3 뒷면 3/4.
