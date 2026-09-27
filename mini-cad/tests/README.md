# 검사 방법

```bash
pip install ezdxf
npm i -D playwright            # 브라우저는 설치하지 않음 (/opt/pw-browsers/chromium 사용)
python3 mini-cad/tests/make_samples.py
node mini-cad/tests/roundtrip.cjs
python3 -c "import glob,ezdxf.recover as r; [print(f, len(r.readfile(f)[1].errors)) for f in glob.glob('mini-cad/tests/out/re_*.dxf')]"
```
마지막 줄의 숫자가 모두 0이면 통과입니다.
