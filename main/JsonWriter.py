import json
import os

DATA_FILE = "data.json"

class JsonWriter:
    def __init__(self, age, sleep_hours, exercise_hours, caffeine_intake, screen_time):
        self.age = age
        self.sleep_hours = sleep_hours
        self.exercise_hours = exercise_hours
        self.caffeine_intake = caffeine_intake
        self.screen_time = screen_time

    # Return dictionary format for JSON
    def to_dict(self):
        return {
            "age": self.age,
            "caffeine_intake": self.caffeine_intake,
            "exercise_time": self.exercise_hours,
            "sleep_time": self.sleep_hours,
            "screen_time": self.screen_time
        }

    # Save new entry to data.json
    def save_to_json(self):
        # Ensure file exists
        if not os.path.exists(DATA_FILE):
            with open(DATA_FILE, "w") as f:
                json.dump({"entries": []}, f)

        # Load existing data
        with open(DATA_FILE, "r") as file:
            data = json.load(file)

        # Append new entry
        data["entries"].append({"input": self.to_dict()})

        # Save back to file
        with open(DATA_FILE, "w") as file:
            json.dump(data, file, indent=4)
