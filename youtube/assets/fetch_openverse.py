# Fetches commercially usable photos (CC0 / PDM / CC BY / CC BY-SA) via the Openverse API (Flickr, Wikimedia, ...),
# downsizes them to <=2560 px wide, and appends credits. Resumable: scenes with a .meta file are skipped.
# Usage: python3 fetch_openverse.py [episode_dir ...]   (no args = every episode below)
import json, os, re, subprocess, sys, time, urllib.parse, urllib.request, urllib.error
UA = "PaperTigerFiles-asset-fetch/1.0"   # generic UA: no personal data in requests
OK = {"cc0", "pdm", "by", "by-sa"}

def get(url, tries=4):
    for k in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and k < tries - 1:
                time.sleep(20 * (k + 1)); continue
            raise

def wm_thumb(url, w=1920):
    # Wikimedia now rate-limits original-file downloads hard (HTTP 429) and asks for standard thumbnail sizes instead
    m = re.match(r"https://upload\.wikimedia\.org/wikipedia/commons/(\w)/(\w\w)/([^/?]+)$", url)
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{m[1]}/{m[2]}/{m[3]}/{w}px-{m[3]}" if m else url

def search(q, n, min_w=1000):
    p = {"q": q, "license_type": "commercial,modification", "page_size": 20, "mature": "false"}
    d = json.loads(get("https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(p)))
    out = []
    for r in d.get("results", []):
        if r.get("license") not in OK or (r.get("width") or 0) < min_w or (r.get("width") or 0) < (r.get("height") or 1):
            continue                                     # landscape only
        if (r.get("filetype") or "jpg").lower() not in ("jpg", "jpeg", "png", "webp"):
            continue
        out.append({"title": r.get("title", ""), "url": r["url"], "page": r.get("foreign_landing_url", ""),
                    "creator": r.get("creator") or "unknown", "lic": f"CC {r['license'].upper()} {r.get('license_version') or ''}".strip(),
                    "provider": r.get("provider", "")})
        if len(out) >= n: break
    return out

def run(ep, queries, per=4):
    os.makedirs(os.path.join(ep, ".meta"), exist_ok=True)
    for scene, q in queries:
        mf = os.path.join(ep, ".meta", scene + ".json")
        if os.path.exists(mf):
            continue
        items = search(q, per)
        got = []
        for i, it in enumerate(items, 1):
            fn = os.path.join(ep, f"{scene}_{i}.jpg")
            try:
                try:
                    raw = get(wm_thumb(it["url"]))
                except urllib.error.HTTPError as e:      # e.g. original narrower than the thumb size: take the original
                    if wm_thumb(it["url"]) == it["url"] or e.code == 429: raise
                    raw = get(it["url"])
            except Exception as e:
                print("  skip", it["url"][:70], e); continue
            tmp = fn + ".src"; open(tmp, "wb").write(raw)
            r = subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp, "-vf", "scale='min(2560,iw)':-2", "-q:v", "3", fn])
            os.remove(tmp)
            if r.returncode == 0:
                it["file"] = os.path.basename(fn); got.append(it)
            time.sleep(1)
        json.dump(got, open(mf, "w"), indent=1)
        print(ep, scene, repr(q), "->", len(got), flush=True)
        time.sleep(2)
    # credits for every Openverse-sourced file in this episode folder
    rows = []
    for f in sorted(os.listdir(os.path.join(ep, ".meta"))):
        for it in json.load(open(os.path.join(ep, ".meta", f))):
            if "provider" in it and it.get("file"):
                rows.append(it)
    with open(os.path.join(ep, "CREDITS_openverse.md"), "w") as fh:
        fh.write(f"# {ep} photo credits (via Openverse)\n\nCC BY / BY-SA: copy the lines below into the video description.\n\n```\n")
        for it in rows:
            fh.write(f"\"{it['title'][:80]}\" by {it['creator']} ({it['provider']}), {it['lic']} — {it['page']}\n")
        fh.write("```\n")

EP = {
 "ep05_1mdb": [
  ("s01_kl_skyline_ov", "Kuala Lumpur skyline night"), ("s01_kl_city_ov", "Kuala Lumpur city"),
  ("s01_petronas_ov", "Petronas Towers night"), ("s01_putrajaya_ov", "Putrajaya"),
  ("s03_ringgit_ov", "Malaysian ringgit"), ("s04_superyacht_ov", "superyacht"),
  ("s04_beverly_hills_ov", "Beverly Hills"), ("s04_manhattan_ov", "Manhattan skyline night"),
  ("s06_singapore_ov", "Singapore Marina Bay financial district"), ("s06_geneva_ov", "Geneva bank"),
  ("s06_zurich_ov", "Zurich Bahnhofstrasse"), ("s07_kl_night_ov", "Kuala Lumpur night street"),
 ],
 "ep04_ezubao": [
  ("s00_hefei_ov", "Hefei skyline"), ("s01_bengbu_ov", "Bengbu Anhui"), ("s01_beijing_cbd_ov", "Beijing CBD skyline"),
  ("s01_beijing_night_ov", "Beijing night city"), ("s01_smartphone_ov", "smartphone screen hand"),
  ("s01_online_banking_ov", "mobile banking app phone"), ("s03_bullet_train_ov", "China high speed train CRH"),
  ("s03_beijing_subway_ov", "Beijing subway station"), ("s03_airport_china_ov", "Beijing airport terminal"),
  ("s04_yuan_banknotes_ov", "Chinese yuan banknotes"), ("s04_renminbi_ov", "renminbi 100 yuan"),
  ("s05_shenzhen_ov", "Shenzhen skyline night"), ("s05_police_china_ov", "Chinese police car"),
  ("s06_chinese_court_ov", "Chinese court building"), ("s07_rural_china_ov", "rural China village houses"),
  ("s07_gold_ov", "gold bars"), ("s08_china_city_night_ov", "Chinese city night aerial"),
  ("s08_chongqing_night_ov", "Chongqing night skyline"),
 ],
 "ep02_cho_hee_pal": [
  ("s01_daegu_skyline", "Daegu skyline"), ("s01_daegu_night", "Daegu night city"), ("s01_daegu_street", "Daegu downtown street"),
  ("s01_massage_device", "massage chair"), ("s02_office_seminar", "seminar room chairs"), ("s03_busan", "Busan skyline"),
  ("s03_korea_apartments", "Korean apartment complex"), ("s03_market_korea", "Korean traditional market"),
  ("s04_police_korea", "Korean police car"), ("s05_taean_harbor", "Taean harbor"), ("s05_fishing_boat_night", "fishing boat night harbor"),
  ("s05_yellow_sea", "Yellow Sea coast Korea"), ("s06_hotel_lobby_cafe", "hotel lobby coffee shop"), ("s06_cheques", "bank cheque"),
  ("s07_weihai", "Weihai"), ("s07_qingdao", "Qingdao skyline"), ("s07_funeral_flowers", "funeral flowers white chrysanthemum"),
  ("s08_courtroom", "empty courtroom"), ("s08_gimhae_airport", "Gimhae airport"), ("s08_daegu_court", "Daegu court building"),
  ("s10_seoul_city", "Seoul city hall"), ("s11_banknotes_won", "Korean won banknotes"),
 ],
 "ep03_truong_my_lan": [
  ("s01_hcmc_skyline_ov", "Ho Chi Minh City skyline"), ("s01_district1_ov", "Saigon District 1 street"),
  ("s01_nguyen_hue_ov", "Nguyen Hue walking street Saigon"), ("s01_ben_thanh_ov", "Ben Thanh market"),
  ("s01_hcmc_towers_ov", "Ho Chi Minh City office tower"), ("s03_dong_banknotes_ov", "Vietnamese dong banknotes"),
  ("s03_cash_stack_ov", "stack of banknotes cash"), ("s05_bank_interior_ov", "bank interior counter"),
  ("s06_saigon_motorbikes_ov", "Saigon motorbikes traffic"), ("s06_saigon_rain_ov", "Saigon rain street"),
  ("s07_courtroom_ov", "empty courtroom"), ("s08_hanoi_ov", "Hanoi city"),
  ("s09_gold_ov", "gold bars"), ("s11_saigon_night_ov", "Saigon night skyline"),
 ],
 "ep01_terra_luna": [
  ("s07_stock_screens_ov", "stock market screen red"), ("s07_trading_monitors_ov", "trading monitors"),
  ("s04_nationals_park_ov", "Nationals Park Washington stadium"), ("s12_sec_building_ov", "Securities and Exchange Commission building"),
  ("s13_seoul_apartments_ov", "Seoul apartment complex"), ("s13_yeouido_ov", "Yeouido skyline"),
  ("s02_cafe_payment_ov", "contactless payment terminal"), ("s02_smartphone_ov", "smartphone screen dark"),
  ("s08_crowd_night_ov", "crowd night city"), ("s09_server_room_ov", "server room"),
 ],
}
for ep, qs in EP.items():
    if len(sys.argv) > 1 and ep not in sys.argv[1:]:
        continue
    run(ep, qs)
