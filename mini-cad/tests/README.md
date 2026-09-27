# 검사 방법

```bash
pip install ezdxf
npm i -D playwright            # 브라우저는 설치하지 않음 (/opt/pw-browsers/chromium 사용)
python3 mini-cad/tests/make_samples.py
node mini-cad/tests/roundtrip.cjs
node mini-cad/tests/edit.cjs        # 이동·회전·축척·대칭·복사·되돌리기
python3 -c "import glob,ezdxf.recover as r; [print(f, len(r.readfile(f)[1].errors)) for f in glob.glob('mini-cad/tests/out/re_*.dxf')]"
```
마지막 줄의 숫자가 모두 0이면 통과입니다.
