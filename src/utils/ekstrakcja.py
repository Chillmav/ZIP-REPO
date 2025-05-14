import zipfile
import os
import random
import json

# Ścieżki
extract_path = 'C:\\Users\\Kubus\\Desktop\\zdjecia_oprawek'
# Pobranie listy plików .jpg
image_files = [f for f in os.listdir(extract_path) if f.endswith(".jpg")]

# Funkcja pomocnicza do wyciągania danych z nazwy pliku
def parse_filename(filename):
    name_part = filename[:-4]  # usuń .jpg
    parts = name_part.split("_")
    
    if len(parts) < 4:
        return None  # za mało danych
    
    mark = parts[0]
    color = parts[1]
    shape = parts[2]
    type = parts[3]
    name = name_part
    
    price = random.randint(10000, 100000)  # losuj cenę w groszach (czyli 100-1000 zł)

    return {
        "name": name,
        "price": price,
        "shape": shape,
        "color": color,
        "type": type,
        "img": filename,
        "mark": mark
    }

# Generowanie danych
oprawki_data = [parse_filename(f) for f in image_files if parse_filename(f) is not None]

# Eksport do JSON
json_path = "C:\\Users\\Kubus\\Downloads\\oprawki.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(oprawki_data, f, ensure_ascii=False, indent=2)

json_path  # zwróć ścieżkę do pliku JSON