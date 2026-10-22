"""Kleine SQL-Spielwiese. Starten mit:  python start.py

Tippe SQL, beende jeden Befehl mit einem Semikolon.
Punkt-Befehle (.hilfe) sind Extras von diesem Programm, kein SQL.
"""
import os
import sqlite3
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

HIER = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(HIER, "uebung.db")
AUFBAU = os.path.join(HIER, "aufbau.sql")


def baue_neu(con):
    with open(AUFBAU, encoding="utf-8") as f:
        con.executescript(f.read())
    con.commit()
    print("Datenbank neu aufgebaut aus aufbau.sql.")


def breite(text):
    return len(str(text))


def tabelle_drucken(spalten, zeilen):
    if not spalten:
        return
    werte = [[("NULL" if z is None else str(z)) for z in zeile] for zeile in zeilen]
    breiten = [breite(s) for s in spalten]
    for zeile in werte:
        for i, z in enumerate(zeile):
            breiten[i] = max(breiten[i], breite(z))

    def linie(zeichen="-"):
        return "+" + "+".join(zeichen * (b + 2) for b in breiten) + "+"

    def reihe(felder):
        return "| " + " | ".join(str(f).ljust(breiten[i]) for i, f in enumerate(felder)) + " |"

    print(linie())
    print(reihe(spalten))
    print(linie("="))
    for zeile in werte:
        print(reihe(zeile))
    print(linie())
    print(f"{len(werte)} Zeile(n)")


HILFE = """
Punkt-Befehle (kein SQL, nur Werkzeug):
  .tabellen        welche Tabellen gibt es?
  .schema          wie sind alle Tabellen gebaut?
  .schema spieler  wie ist eine bestimmte Tabelle gebaut?
  .zeig spieler    alles aus einer Tabelle (max. 50 Zeilen)
  .neu             Datenbank zuruecksetzen - kaputtgemachtes ist egal!
  .hilfe           dieser Text
  .ende            raus (oder Strg+C)

SQL: alles andere. Mit Semikolon abschliessen, darf ueber mehrere Zeilen gehen.
  SELECT * FROM charaktere;
"""


def main():
    neu = not os.path.exists(DB)
    con = sqlite3.connect(DB)
    con.execute("PRAGMA foreign_keys = ON")
    if neu:
        baue_neu(con)

    print("SQL-Spielwiese auf uebung.db.  .hilfe fuer Befehle, .ende zum Beenden.")
    puffer = ""
    while True:
        try:
            zeile = input("sql> " if not puffer else "...> ")
        except (EOFError, KeyboardInterrupt):
            print()
            break

        roh = zeile.strip()
        if not puffer and roh.startswith("."):
            teile = roh.split()
            befehl, arg = teile[0], (teile[1] if len(teile) > 1 else None)
            if befehl in (".ende", ".exit", ".quit"):
                break
            elif befehl == ".hilfe":
                print(HILFE)
            elif befehl == ".tabellen":
                namen = [r[0] for r in con.execute(
                    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")]
                print("  " + "  ".join(namen))
            elif befehl == ".schema":
                frage = "SELECT sql FROM sqlite_master WHERE type='table'"
                rows = con.execute(frage + (" AND name=?" if arg else ""),
                                   (arg,) if arg else ())
                gefunden = False
                for (s,) in rows:
                    print(s + ";\n")
                    gefunden = True
                if not gefunden:
                    print("Keine solche Tabelle. .tabellen zeigt, was es gibt.")
            elif befehl == ".zeig":
                if not arg:
                    print("So:  .zeig spieler")
                else:
                    try:
                        cur = con.execute(f'SELECT * FROM "{arg}" LIMIT 50')
                        tabelle_drucken([d[0] for d in cur.description], cur.fetchall())
                    except sqlite3.Error as e:
                        print("Fehler:", e)
            elif befehl == ".neu":
                baue_neu(con)
            else:
                print("Kenne ich nicht. .hilfe zeigt die Punkt-Befehle.")
            continue

        puffer += zeile + "\n"
        if ";" not in puffer:
            continue

        sql = puffer.strip()
        puffer = ""
        if not sql.rstrip(";").strip():
            continue
        try:
            cur = con.execute(sql)
            if cur.description:
                tabelle_drucken([d[0] for d in cur.description], cur.fetchall())
            else:
                con.commit()
                print(f"OK, {cur.rowcount if cur.rowcount >= 0 else 0} Zeile(n) betroffen.")
        except sqlite3.Error as e:
            print("Fehler:", e)
            print("(Nichts kaputt. Nochmal probieren, oder .neu zum Zuruecksetzen.)")

    con.close()
    print("Bis dann.")


if __name__ == "__main__":
    main()
