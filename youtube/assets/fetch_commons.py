# Downloads commercially usable images (CC0 / public domain / CC BY / CC BY-SA, no NC/ND) from Wikimedia Commons
# and writes a CREDITS.md with author/license/source for every file.
import json, re, sys, os, urllib.request, urllib.error, urllib.parse, html, time
UA = "PaperTigerFiles-asset-fetch/1.0 (https://github.com/nwook100/NTT-TEST)"
OK = re.compile(r"^(CC0|Public domain|PD|CC BY(-SA)? [0-9.]+)", re.I)
BAD = re.compile(r"NC|ND", re.I)

def get(url, tries=6):
    for k in range(tries):
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                time.sleep(1.5)
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code != 429 or k == tries - 1: raise
            wait = int(e.headers.get("Retry-After") or 0) or 10 * (k + 1)
            print("  429, waiting", wait, "s", flush=True); time.sleep(wait)

def search(q, n):
    p = {"action": "query", "format": "json", "generator": "search", "gsrsearch": q + " filetype:bitmap",
         "gsrnamespace": 6, "gsrlimit": 12, "prop": "imageinfo", "iiprop": "url|extmetadata|size", "iiurlwidth": 1920}
    d = json.loads(get("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(p)))
    pages = sorted(d.get("query", {}).get("pages", {}).values(), key=lambda x: x.get("index", 99))
    out = []
    for pg in pages:
        ii = pg["imageinfo"][0]; m = ii.get("extmetadata", {})
        lic = m.get("LicenseShortName", {}).get("value", "")
        if not OK.match(lic) or BAD.search(lic) or ii.get("width", 0) < 1000:
            continue
        artist = re.sub("<[^>]+>", "", html.unescape(m.get("Artist", {}).get("value", "unknown"))).strip()
        out.append(dict(title=pg["title"], url=ii.get("thumburl") or ii["url"], page=ii["descriptionurl"], lic=lic, artist=artist))
        if len(out) >= n: break
    return out

def run(ep, queries, per=3):
    os.makedirs(ep, exist_ok=True)
    rows = []
    os.makedirs(os.path.join(ep, ".meta"), exist_ok=True)
    for scene, q in queries:
        mf = os.path.join(ep, ".meta", scene + ".json")
        items = json.load(open(mf)) if os.path.exists(mf) else search(q, per)
        json.dump(items, open(mf, "w"))
        for i, it in enumerate(items, 1):
            ext = os.path.splitext(it["url"].split("?")[0])[1].lower() or ".jpg"
            fn = f"{scene}_{i}{ext}"
            if not os.path.exists(os.path.join(ep, fn)):
                data = get(it["url"])
                open(os.path.join(ep, fn), "wb").write(data)
            rows.append((fn, scene, it))
        print(ep, scene, q, "->", sum(1 for r in rows if r[1] == scene), flush=True)
    with open(os.path.join(ep, "CREDITS.md"), "w") as f:
        f.write(f"# {ep} image credits (Wikimedia Commons)\n\n")
        f.write("CC BY / CC BY-SA 이미지는 영상 설명란에 아래 표기를 그대로 넣어야 합니다. CC0·퍼블릭 도메인은 표기 의무가 없지만 넣어 두면 좋습니다.\n\n")
        f.write("| File | Scene | Author | License | Source |\n|---|---|---|---|---|\n")
        for fn, scene, it in rows:
            f.write(f"| {fn} | {scene} | {it['artist'][:80].replace('|','/')} | {it['lic']} | {it['page']} |\n")
        f.write("\n## Description-box credit lines (copy)\n\n```\n")
        for fn, scene, it in rows:
            f.write(f"\"{it['title'][5:]}\" by {it['artist'][:80]}, {it['lic']}, via Wikimedia Commons ({it['page']})\n")
        f.write("```\n")

EP = {
 "ep01_terra_luna": [
  ("s01_seoul_skyline", "Seoul skyline night"), ("s01_gangnam", "Gangnam Teheran-ro"),
  ("s01_stanford", "Stanford University Main Quad"), ("s04_nationals_park", "Nationals Park Washington"),
  ("s06_bitcoin", "Bitcoin coins"), ("s07_trading_screens", "stock exchange screens"),
  ("s11_singapore", "Singapore Marina Bay night"), ("s11_podgorica_airport", "Podgorica Airport"),
  ("s11_podgorica_city", "Podgorica Montenegro city"), ("s11_interpol", "Interpol headquarters Lyon"),
  ("s12_courthouse_ny", "Thurgood Marshall United States Courthouse"), ("s12_sec_building", "SEC headquarters Washington"),
  ("s13_yeouido", "Yeouido Seoul"), ("s13_seoul_court", "Seoul Southern District Court"),
  ("s13_apartments", "Seoul apartment complex"),
 ],
 "ep02_cho_hee_pal": [
  ("s01_daegu_skyline", "Daegu skyline"), ("s01_daegu_street", "Daegu downtown street"),
  ("s03_busan", "Busan city skyline"), ("s05_taean", "Taean coast Korea"), ("s05_anmyeondo", "Anmyeondo"),
  ("s05_yellow_sea", "Yellow Sea fishing boat"), ("s06_police_agency", "Korean National Police Agency"),
  ("s06_prosecutors", "Supreme Prosecutors Office Korea"), ("s07_weihai", "Weihai city"),
  ("s07_qingdao", "Qingdao skyline"), ("s08_gimhae_airport", "Gimhae International Airport"),
  ("s08_daegu_court", "Daegu District Court"), ("s08_supreme_court", "Supreme Court of Korea"),
  ("s10_seoul_court", "Seoul Central District Court"),
 ],
}
for ep, qs in EP.items():
    run(ep, qs)
