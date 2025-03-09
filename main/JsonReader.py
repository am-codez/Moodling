import json
import os

DATA_FILE = "data.json"

class JsonReader:
    @staticmethod
    def read():
        if not os.path.exists(DATA_FILE):
            return {"entries": []}

        with open(DATA_FILE, "r") as file:
            data = json.load(file)
            return data
