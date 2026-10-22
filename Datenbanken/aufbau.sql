-- Die Übungsdatenbank: eine kleine Gildenverwaltung.

DROP TABLE IF EXISTS inventar;
DROP TABLE IF EXISTS charaktere;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS spieler;

CREATE TABLE spieler (
    id        INTEGER PRIMARY KEY,
    name      TEXT NOT NULL,
    beitritt  DATE,
    land      TEXT
);

CREATE TABLE charaktere (
    id         INTEGER PRIMARY KEY,
    spieler_id INTEGER REFERENCES spieler(id),
    name       TEXT NOT NULL,
    klasse     TEXT,
    level      INTEGER,
    gold       INTEGER
);

CREATE TABLE items (
    id       INTEGER PRIMARY KEY,
    name     TEXT NOT NULL,
    art      TEXT,
    wert     INTEGER,
    selten   TEXT
);

CREATE TABLE inventar (
    charakter_id INTEGER REFERENCES charaktere(id),
    item_id      INTEGER REFERENCES items(id),
    anzahl       INTEGER
);

INSERT INTO spieler (id, name, beitritt, land) VALUES
 (1, 'Alex',    '2023-01-14', 'DE'),
 (2, 'Tom', '2023-02-02', 'DE'),
 (3, 'Mira',    '2024-06-30', 'AT'),
 (4, 'Tobias',  '2022-11-05', 'DE'),
 (5, 'Yuki',    '2025-03-21', 'JP'),
 (6, 'Sam',     '2024-01-09', 'US');

INSERT INTO charaktere (id, spieler_id, name, klasse, level, gold) VALUES
 (1,  1, 'Thalor',    'Magier',   42, 1200),
 (2,  1, 'Brenna',    'Kriegerin',17,   80),
 (3,  2, 'Nep',       'Schurke',  55, 9400),
 (4,  2, 'Kleinvieh', 'Heiler',    8,   15),
 (5,  3, 'Elowen',    'Magier',   31,  640),
 (6,  4, 'Grimmbart', 'Kriegerin',60, 15000),
 (7,  4, 'Pip',       'Schurke',  23,  300),
 (8,  5, 'Hoshi',     'Heiler',   44, 2100),
 (9,  5, 'Ren',       'Magier',   12,   50),
 (10, 6, 'Dusty',     'Kriegerin',37,  880),
 (11, 1, 'Nebel',     'Schurke',   1,    0);

INSERT INTO items (id, name, art, wert, selten) VALUES
 (1, 'Rostiges Schwert',   'Waffe',   10,  'gewöhnlich'),
 (2, 'Flammenklinge',      'Waffe', 2400,  'episch'),
 (3, 'Heiltrank',          'Trank',   25,  'gewöhnlich'),
 (4, 'Elixier der Weisen', 'Trank',  800,  'selten'),
 (5, 'Lederwams',          'Rüstung', 60,  'gewöhnlich'),
 (6, 'Drachenplatte',      'Rüstung',5000, 'legendär'),
 (7, 'Alter Stiefel',      'Krempel',  1,  'gewöhnlich'),
 (8, 'Mondsplitter',       'Krempel',1500, 'selten');

INSERT INTO inventar (charakter_id, item_id, anzahl) VALUES
 (1, 3, 12), (1, 4, 2), (1, 8, 1),
 (2, 1, 1),  (2, 5, 1), (2, 3, 3),
 (3, 2, 1),  (3, 6, 1), (3, 8, 4), (3, 4, 9),
 (4, 3, 1),
 (5, 4, 1),  (5, 3, 5),
 (6, 6, 2),  (6, 2, 3), (6, 1, 1),
 (7, 7, 7),  (7, 3, 2),
 (8, 3, 20), (8, 4, 4),
 (9, 1, 1),
 (10, 5, 2), (10, 3, 6), (10, 7, 1);
