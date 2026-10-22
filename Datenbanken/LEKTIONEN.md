# Datenbanken lernen

## So arbeitest du

Alles passiert in **abfragen.sql**. Dort schreibst du eine Abfrage,
setzt den Cursor hinein und drückst **Strg+E Strg+E**. Rechts kommt
das Ergebnis als Tabelle.

Mehr Bedienung gibt es nicht. Immer dasselbe, bei jeder Aufgabe.

Schreib deine Versuche einfach untereinander und lass sie stehen.
Ausgeführt wird nur die Abfrage, in der dein Cursor gerade steht.
Zeilen mit `--` davor sind Notizen für dich, die führt niemand aus.

**Du kannst nichts kaputtmachen.** Alles in diesen Lektionen zeigt nur
an, es verändert nichts. Tipp ruhig Unsinn ein und guck, was passiert.

---

## Lektion 1 - Angucken

Jede Abfrage hat zwei Teile: **welche Spalten** und **aus welcher Tabelle**.

```sql
SELECT * FROM items;
```

`*` heißt "alle Spalten". Statt des Sterns kannst du Spalten aufzählen:

```sql
SELECT name, wert FROM items;
```

Welche Spalten es gibt, musst du nicht raten. Links im Zylinder:
**Uebungsdatenbank → Tables → items** aufklappen, da stehen sie.
Vier Tabellen gibt es: `spieler`, `charaktere`, `items`, `inventar`.

Eine Spalte kann in der Anzeige anders heißen:

```sql
SELECT name AS Gegenstand, wert AS Preis FROM items;
```

Und rechnen geht auch:

```sql
SELECT name, wert, wert * 2 AS doppelt FROM items;
```

### Probier mal
1. Alle Spalten aus `spieler`.
2. Nur `name` und `land` aus `spieler`.
3. Aus `charaktere` nur `name` und `level`.
4. Dasselbe, aber die Level-Spalte soll `Stufe` heißen.
5. Aus `charaktere`: `name`, `gold`, und eine Spalte `haelfte` mit dem
   halben Gold.
6. Schreib absichtlich `FROM spieller` (mit zwei l) und guck dir die
   Fehlermeldung an. Sowas passiert dauernd, ist harmlos.

---

## Lektion 2 - Aussortieren mit WHERE

Bisher kam immer die ganze Tabelle. `WHERE` sagt, **welche Zeilen** du willst:

```sql
SELECT name, level FROM charaktere WHERE level > 40;
```

Vergleichen kannst du mit `>` `<` `>=` `<=` `=` und `<>` (ungleich).

Text braucht einfache Anführungszeichen, Zahlen nicht:

```sql
SELECT * FROM charaktere WHERE klasse = 'Magier';
```

Zwei Bedingungen: `AND` (beides muss stimmen), `OR` (eines genügt).

```sql
SELECT * FROM charaktere WHERE klasse = 'Magier' AND level > 20;
```

Zwei Abkürzungen, die man ständig braucht:

```sql
SELECT * FROM charaktere WHERE klasse IN ('Magier', 'Heiler');
SELECT * FROM items WHERE name LIKE '%trank%';
```

`IN` ist kürzer als mehrfaches `OR`. Bei `LIKE` steht `%` für
"hier darf beliebig viel stehen" - oben also: Name enthält "trank".

### Probier mal
1. Alle Charaktere unter Level 20.
2. Alle Items der Art `Trank`.
3. Alle Items, die mehr als 1000 wert sind.
4. Alle Schurken mit mehr als 1000 Gold.
5. Alle Spieler, die nicht aus `DE` kommen.
6. Alle Items, deren Name mit `A` anfängt.
7. Alle Charaktere, die weder Magier noch Heiler sind.

---

## Lektion 3 - Sortieren

```sql
SELECT name, level FROM charaktere ORDER BY level;
```

Das sortiert aufsteigend. Andersherum mit `DESC` dahinter:

```sql
SELECT name, level FROM charaktere ORDER BY level DESC;
```

Und nur die ersten paar Zeilen mit `LIMIT`:

```sql
SELECT name, gold FROM charaktere ORDER BY gold DESC LIMIT 3;
```

Die Reihenfolge der Wörter ist fest:
**SELECT → FROM → WHERE → ORDER BY → LIMIT**.
Vertauscht gibt es einen Fehler. Probier das ruhig einmal aus.

### Probier mal
1. Alle Items, das teuerste zuerst.
2. Die drei ärmsten Charaktere.
3. Alle Spieler nach `beitritt` sortiert, der älteste zuerst.
4. Die zwei stärksten Magier.
5. Alle Items der Art `Krempel`, alphabetisch.

---

## Lektion 4 - Zählen und Rechnen

Bis jetzt kam pro Zeile eine Zeile raus. Jetzt rechnen wir über
**viele** Zeilen auf einmal:

```sql
SELECT COUNT(*) FROM charaktere;      -- wie viele Zeilen?
SELECT SUM(gold) FROM charaktere;     -- alles zusammenzählen
SELECT AVG(level) FROM charaktere;    -- Durchschnitt
SELECT MIN(level), MAX(level) FROM charaktere;
```

Und jetzt der eigentliche Trick. `GROUP BY` macht aus einer grossen
Rechnung viele kleine - eine pro Gruppe:

```sql
SELECT klasse, COUNT(*) AS anzahl
FROM charaktere
GROUP BY klasse;
```

"Pro Klasse: zähl die Zeilen." Du bekommst eine Zeile je Klasse.
Das ist der Punkt, an dem SQL anfängt, richtig nützlich zu sein.

Mehrere Rechnungen gleichzeitig gehen auch:

```sql
SELECT klasse, COUNT(*) AS anzahl, AVG(level) AS schnitt
FROM charaktere
GROUP BY klasse;
```

### Probier mal
1. Wie viele Spieler gibt es?
2. Wie viel Gold haben alle Charaktere zusammen?
3. Pro `art` in `items`: wie viele, und was ist der Durchschnittswert?
4. Pro `spieler_id` in `charaktere`: wie viele Charaktere hat jeder?
5. Höchstes Level pro Klasse.

---

## Wenn mal etwas klemmt

Ergebnis kommt nicht? Meistens eins von dreien:

- Semikolon am Ende vergessen
- Cursor steht nicht in der Abfrage, die du ausführen wolltest
- Tippfehler im Tabellen- oder Spaltennamen (guck links im Zylinder nach)

Datenbank zurücksetzen (brauchst du erst, wenn wir später Daten ändern):
`aufbau.sql` öffnen, **Strg+A** (alles markieren), dann **Strg+E Strg+E**.

---

## Später

Wenn Lektion 1-4 sitzen, kommt **JOIN**: zwei Tabellen verbinden, um
Fragen zu stellen wie "welcher Spieler besitzt die Flammenklinge?".
Danach Daten ändern und eigene Tabellen bauen.

Lösungen stehen in `LOESUNGEN.md`. Erst selbst probieren - frag lieber
mich, meistens fehlt nur ein Wort.
