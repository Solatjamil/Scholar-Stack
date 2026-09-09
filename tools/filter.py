# -*- coding: utf-8 -*-
"""Drop non-Pakistani-curriculum results.

Pakistani board students need PTB/FBISE/KPK/Sindh-aligned lectures. Indian
(CBSE/ICSE) and UK (GCSE) channels teach a different syllabus and different
notation, so they are excluded even though the videos themselves are fine.
"""
BAD_CHANNEL = [
 "icse","cbse","shobhit","nirwan","ritik mishra","sridhar","udaan","physics wallah",
 "pw ","jensen","1st class maths","next toppers","prashant kirad","wayne dyer",
 "magnet brains","vedantu","byju","unacademy","exphub 9 & 10","doubtnut","khan academy",
 "prathibha","adda247","competition wallah","science and fun","dear sir",
]
BAD_TITLE = [
 "icse","cbse","gcse","ncert","one shot 🔥","dighat samikaran","board exam 2024 india",
 "class 10th board","jee","neet","up board","bihar board",
]
GOOD_HINT = [
 "punjab","ptb","fbise","federal","kpk","sindh","urdu","hindi","lahore","pakistan",
 "matric","9th class","10th class","11th class","12th class","1st year","2nd year",
 "allied schools","ilmkidunya","sabaq","waqas nasir","inter part",
]

def is_pakistani(v):
    ch = (v.get("channel") or "").lower()
    ti = (v.get("title") or "").lower()
    for b in BAD_CHANNEL:
        if b in ch: return False
    for b in BAD_TITLE:
        if b in ti: return False
    return True

def score(v):
    """Prefer clearly Pakistani-curriculum videos."""
    s = 0
    blob = ((v.get("title") or "") + " " + (v.get("channel") or "")).lower()
    for g in GOOD_HINT:
        if g in blob: s += 1
    return -s
