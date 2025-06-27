import zipfile
import os
import random
import json

# Ścieżki
extract_path = '/home/chillmaw/Projects/ZIP-REPO/backend/zdjecia_oprawek'

# Pobranie listy plików .jpg
image_files = [f for f in os.listdir(extract_path) if f.endswith(".jpg")]

# Zbiór unikalnych nazw
unique_names = set()

# Funkcja pomocnicza do wyciągania danych z nazwy pliku
def parse_filename(filename):
    name_part = filename[:-4]  # usuń .jpg
    parts = name_part.split("_")

    if len(parts) < 4:
        return None  # za mało danych

    raw_name = name_part.replace("_", " ").replace("-", "")  # usuń _ i -
    if raw_name in unique_names:
        return None  # pomiń duplikat

    unique_names.add(raw_name)

    mark = parts[0]
    color = parts[1]
    shape = parts[2]
    type = parts[3]

    price = random.randint(10000, 100000)  # cena w groszach (100–1000 zł)

    return {
        "name": raw_name,
        "price": price,
        "shape": shape,
        "color": color,
        "type": type,
        "img": filename,
        "mark": mark
    }

# Generowanie danych bez duplikatów
oprawki_data = []
for f in image_files:
    parsed = parse_filename(f)
    if parsed:
        oprawki_data.append(parsed)

# Eksport do JSON
json_path = "/home/chillmaw/Pobrane/oprawki.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(oprawki_data, f, ensure_ascii=False, indent=2)

print(f"Zapisano {len(oprawki_data)} unikalnych wpisów do: {json_path}")
