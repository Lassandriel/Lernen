import urllib.request
seiten = ["index.html", "about-me.html", "diary.html", "shortcuts.html"]

for seite in seiten:
    url = f"http://127.0.0.1:5500/HTML/{seite}"
    antwort = urllib.request.urlopen (url)
# ANTWORT
    print(antwort.status)
    if antwort.status == 200:
        print(f"[OK] {seite} läuft!")
    else:
        print(f"[Fehler]{seite} hat ein Problem.")