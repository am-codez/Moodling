import json

import json

class JsonWriter:
    def __init__(self, age, gender, sleep_hours, exercise_hours, caffeine_intake, screen_time):
        self.age = age
        self.gender = gender
        self.sleep_hours = sleep_hours
        self.exercise_hours = exercise_hours
        self.caffeine_intake = caffeine_intake
        self.screen_time = screen_time

    # Return dictionary to json dump 
    def to_dict(self):
        return {
            "age": self.age,
            "gender": self.gender,
            "sleepHours": self.sleep_hours,
            "exerciseHours": self.exercise_hours,
            "caffeineIntake": self.caffeine_intake,
            "screenTime": self.screen_time,
        }

    def to_json(self):
        return json.dumps(self.to_dict(), indent=4)
