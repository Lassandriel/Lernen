# Lösungen

Bei SQL führen oft mehrere Wege zum Ziel. Wenn deine Abfrage dasselbe
Ergebnis liefert, ist sie richtig - auch wenn sie anders aussieht.

## Lektion 1

```sql
-- 1
SELECT * FROM spieler;
-- 2
SELECT name, land FROM spieler;
-- 3
SELECT name, level FROM charaktere;
-- 4
SELECT name, level AS Stufe FROM charaktere;
-- 5
SELECT name, gold, gold / 2 AS haelfte FROM charaktere;
-- 6  Fehlermeldung: "no such table: spieller"
--    SQLite sagt dir ziemlich genau, was es nicht findet.
```

## Lektion 2

```sql
-- 1
SELECT * FROM charaktere WHERE level < 20;
-- 2
SELECT * FROM items WHERE art = 'Trank';
-- 3
SELECT * FROM items WHERE wert > 1000;
-- 4
SELECT * FROM charaktere WHERE klasse = 'Schurke' AND gold > 1000;
-- 5
SELECT * FROM spieler WHERE land <> 'DE';
-- 6
SELECT * FROM items WHERE name LIKE 'A%';
-- 7
SELECT * FROM charaktere WHERE klasse NOT IN ('Magier', 'Heiler');
--    Geht auch so:
SELECT * FROM charaktere WHERE klasse <> 'Magier' AND klasse <> 'Heiler';
```

## Lektion 3

```sql
-- 1
SELECT * FROM items ORDER BY wert DESC;
-- 2
SELECT name, gold FROM charaktere ORDER BY gold LIMIT 3;
-- 3
SELECT * FROM spieler ORDER BY beitritt;
-- 4
SELECT name, level FROM charaktere WHERE klasse = 'Magier'
ORDER BY level DESC LIMIT 2;
-- 5
SELECT * FROM items WHERE art = 'Krempel' ORDER BY name;
```

## Lektion 4

```sql
-- 1
SELECT COUNT(*) FROM spieler;
-- 2
SELECT SUM(gold) FROM charaktere;
-- 3
SELECT art, COUNT(*) AS anzahl, AVG(wert) AS schnitt FROM items GROUP BY art;
-- 4
SELECT spieler_id, COUNT(*) AS anzahl FROM charaktere GROUP BY spieler_id;
-- 5
SELECT klasse, MAX(level) AS hoechstes FROM charaktere GROUP BY klasse;
```
