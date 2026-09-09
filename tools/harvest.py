# -*- coding: utf-8 -*-
"""Harvest + oEmbed-validate YouTube lecture videos for the Learn hub.

Usage: python3 tools/harvest.py queries.json out.json
Never hand-write a videoId: everything here comes from a real search result
and is then validated through the oEmbed endpoint (200 = playable,
404 = dead, 401 = embedding blocked -> excluded).
"""
import json, re, sys, time, urllib.parse, subprocess

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120 Safari/537.36")

def curl(url, timeout=30):
    r = subprocess.run(["curl","-sL","--max-time",str(timeout),"-A",UA,
                        "-H","Accept-Language: en-US,en;q=0.9",url],
                       capture_output=True, text=True, errors="ignore")
    return r.stdout

def search(q, want=14):
    url = "https://www.youtube.com/results?search_query=" + urllib.parse.quote(q)
    h = curl(url)
    m = re.search(r'var ytInitialData = (\{.*?\});</script>', h, re.S)
    if not m:
        return []
    data = json.loads(m.group(1))
    out, seen = [], set()
    def walk(o):
        if len(out) >= want: return
        if isinstance(o, dict):
            if "videoRenderer" in o:
                v = o["videoRenderer"]
                vid = v.get("videoId")
                title = "".join(r.get("text","") for r in v.get("title",{}).get("runs",[]))
                ch = ""
                try: ch = v["ownerText"]["runs"][0]["text"]
                except Exception: pass
                # skip shorts / very short clips
                dur = ""
                try: dur = v["lengthText"]["simpleText"]
                except Exception: pass
                if vid and vid not in seen and title:
                    seen.add(vid)
                    out.append({"id": vid, "title": title.strip(), "channel": ch.strip(), "dur": dur})
            for x in o.values(): walk(x)
        elif isinstance(o, list):
            for x in o: walk(x)
    walk(data)
    return out

def oembed_ok(vid):
    url = ("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v="
           + vid + "&format=json")
    r = subprocess.run(["curl","-s","-o","/dev/null","-w","%{http_code}",
                        "--max-time","20", url], capture_output=True, text=True)
    return r.stdout.strip() == "200"

def main():
    queries = json.load(open(sys.argv[1]))
    results = []
    for spec in queries:
        cands = []
        for q in spec["queries"]:
            cands += search(q)
            time.sleep(0.4)
        # dedupe
        uniq, seen = [], set()
        for c in cands:
            if c["id"] not in seen:
                seen.add(c["id"]); uniq.append(c)
        # filter obvious noise: shorts, non-topical
        good = []
        for c in uniq:
            if c["dur"] and c["dur"].count(":") == 1:
                mm = int(c["dur"].split(":")[0])
                if mm < 3:      # skip <3 min clips
                    continue
            good.append(c)
        kept = []
        for c in good:
            if len(kept) >= spec.get("max", 4): break
            if oembed_ok(c["id"]):
                kept.append({"id": c["id"], "title": c["title"][:110], "channel": c["channel"]})
            time.sleep(0.2)
        results.append({**{k: spec[k] for k in ("classLevel","subject","topic")}, "videos": kept})
        print(f'{spec["classLevel"]:5} {spec["subject"]:10} {spec["topic"][:38]:40} -> {len(kept)}', flush=True)
    json.dump(results, open(sys.argv[2],"w"), indent=1, ensure_ascii=False)

main()
