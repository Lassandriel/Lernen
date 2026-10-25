print("Hallo! Wie heißt du?")
name = input("")

if name == "Lassandriel":
    print("Willkommen zuhause, Boss!")
else:
    print(f"Hallo, {name}, mein neuer Besucher!")

# LISTE
lieblings_dinge = ["Pizza", "Programmieren", "Tee"]
for ding in lieblings_dinge:
    print(f"Ich liebe {ding}!")