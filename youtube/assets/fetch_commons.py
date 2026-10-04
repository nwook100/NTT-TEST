# Downloads commercially usable images (CC0 / public domain / CC BY / CC BY-SA, no NC/ND) from Wikimedia Commons
# and writes a CREDITS.md with author/license/source for every file.
# Usage: python3 fetch_commons.py [episode_dir ...]   (no args = every episode below)
import json, re, sys, os, urllib.request, urllib.error, urllib.parse, html, time
UA = "PaperTigerFiles-asset-fetch/1.0"   # generic UA: no personal data in requests
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

def wm_thumb(url, w):
    # Wikimedia blocks original-file downloads (429); ask for a standard thumbnail size instead (https://w.wiki/GHai)
    m = re.match(r"https://upload\.wikimedia\.org/wikipedia/commons/(\w)/(\w\w)/([^/?]+)$", url)
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{m[1]}/{m[2]}/{m[3]}/{w}px-{m[3]}" if m else url

def get_image(url):
    if "/thumb/" in url:
        return get(url)
    for w in (1280, 960):
        try:
            return get(wm_thumb(url, w), tries=1)
        except urllib.error.HTTPError:
            continue
    return get(url)

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
        url = (ii.get("thumburl") or ii["url"]).split("?")[0].replace("://thumb.wikimedia.org/", "://upload.wikimedia.org/")
        out.append(dict(title=pg["title"], url=url, page=ii["descriptionurl"], lic=lic, artist=artist))
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
            it["url"] = it["url"].split("?")[0].replace("://thumb.wikimedia.org/", "://upload.wikimedia.org/")
            ext = os.path.splitext(it["url"])[1].lower() or ".jpg"
            fn = f"{scene}_{i}{ext}"
            if not os.path.exists(os.path.join(ep, fn)):
                data = get_image(it["url"])
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
 "ep05_1mdb": [
  ("s01_kl_skyline", "Kuala Lumpur skyline"), ("s01_petronas", "Petronas Twin Towers"),
  ("s01_trx", "Tun Razak Exchange"), ("s01_putrajaya", "Perdana Putra Putrajaya"),
  ("s00_ziegfeld", "Ziegfeld Theatre New York"), ("s04_equanimity", "Equanimity yacht"),
  ("s04_beverly_hills", "Beverly Hills mansion"), ("s03_ringgit", "Malaysian ringgit banknotes"),
  ("s06_singapore_cbd", "Singapore Raffles Place financial district"), ("s06_zurich_paradeplatz", "Paradeplatz Zurich banks"),
  ("s06_bersih", "Bersih 4 rally Kuala Lumpur"), ("s07_parliament", "Parliament of Malaysia building"),
  ("s08_kl_courts", "Kuala Lumpur Courts Complex"), ("s08_palace_of_justice", "Palace of Justice Putrajaya"),
  ("s08_kajang_prison", "Kajang Prison"), ("s08_brooklyn_court", "United States Courthouse Eastern District of New York Brooklyn"),
 ],
 "ep04_ezubao": [
  ("s00_hefei_skyline", "Skylines of Hefei at Tianehu"), ("s00_hefei", "Hefei city skyline"),
  ("s01_bengbu", "Bengbu Zhanggong Mountain Lake"), ("s01_bengbu_street", "Bengbu Railway Station Fengyangdong Street"),
  ("s01_bengbu_city", "Bengbu city"), ("s01_beijing_cbd", "Beijing CBD night"), ("s01_chaoyang", "Chaoyang District Beijing skyline"),
  ("s03_cctv_hq", "China Central Television Headquarters"), ("s03_crh_train", "CRH high speed train China"),
  ("s03_shanghai_lujiazui", "Shanghai Lujiazui night skyline"), ("s04_yuan", "Renminbi banknotes 100 yuan"),
  ("s05_world_trade_center", "China World Trade Center III Beijing"), ("s05_public_security", "public security bureau building China"),
  ("s06_beijing_court", "Beijing No. 1 Intermediate People's Court"), ("s06_beijing_high_court", "Beijing Higher People's Court"),
 ],
 "ep03_truong_my_lan": [
  ("s07_hcmc_court", "Tòa án nhân dân Thành phố Hồ Chí Minh"), ("s01_times_square_saigon", "Saigon Times Square Nguyen Hue"),
  ("s01_windsor_plaza", "Windsor Plaza Hotel Saigon"), ("s01_ben_thanh", "Ben Thanh Market"),
  ("s01_nguyen_hue", "Nguyen Hue Street Ho Chi Minh City"), ("s01_hcmc_skyline", "Ho Chi Minh City skyline"),
  ("s01_district1", "District 1 Ho Chi Minh City"), ("s04_state_bank", "State Bank of Vietnam building"),
  ("s08_national_assembly", "National Assembly building Hanoi Ba Dinh"), ("s03_dong_500000", "500000 dong banknote"),
  ("s08_hanoi_skyline", "Hanoi skyline"), ("s06_saigon_motorbikes", "Ho Chi Minh City motorbikes traffic"),
 ],
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
    if len(sys.argv) > 1 and ep not in sys.argv[1:]:
        continue
    run(ep, qs)
