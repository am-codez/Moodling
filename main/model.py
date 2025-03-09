import os
import json
import uvicorn
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load API key securely
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("⚠️ GEMINI_API_KEY is missing. Add it to your .env file.")

# Configure Gemini AI
genai.configure(api_key=GEMINI_API_KEY)

# Initialize FastAPI
app = FastAPI(title="Mood Predictor API", version="1.0")

# Define input schema
class UserInput(BaseModel):
    gender: str = Field(..., example="male")
    age: int = Field(..., gt=0, example=22)
    caffeine_intake: float = Field(..., ge=0, example=2)
    exercise_time: float = Field(..., ge=0, example=1)
    sleep_time: float = Field(..., ge=0, le=24, example=7)
    screen_time: float = Field(..., ge=0, example=3)

# JSON file for persistence
DATA_FILE = "data.json"

# Ensure JSON file exists
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump({"entries": []}, f)

# Function to load data from JSON
def load_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

# Function to save data to JSON
def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

# Function to get predictions from Gemini AI
def get_predictions(data: UserInput):
    prompt = f"""
    Predict mood, productivity, and stress levels (1-10) based on:

    - Gender: {data.gender}
    - Age: {data.age}
    - Caffeine Intake: {data.caffeine_intake} cups/day
    - Exercise Time: {data.exercise_time} hours/day
    - Sleep Time: {data.sleep_time} hours/night
    - Screen Time Before Bed: {data.screen_time} hours

    Return **ONLY JSON** in this format:
    ```json
    {{
        "mood": 7,
        "productivity": 6,
        "stress": 4
    }}
    ```
    No explanations. No extra text. Just JSON.
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)

        # Debugging: Print raw AI response to the terminal
        print("\n🔍 RAW AI RESPONSE:", response.text.strip(), "\n")

        # Ensure response is valid JSON
        response_text = response.text.strip()

        # Extract JSON manually if needed
        if "{" in response_text and "}" in response_text:
            json_text = response_text[response_text.find("{") : response_text.rfind("}") + 1]
            result = json.loads(json_text)
        else:
            raise ValueError("⚠️ AI response did not contain valid JSON.")

        # Ensure required keys exist
        if not all(key in result for key in ["mood", "productivity", "stress"]):
            raise ValueError("⚠️ Missing expected keys in AI response.")

        return result

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="⚠️ AI response is not valid JSON.")

    except ValueError as e:
        raise HTTPException(status_code=500, detail=f"⚠️ {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"⚠️ Unexpected error: {str(e)}")

# API to process input and save results
@app.post("/predict", summary="Predict Mood, Productivity, and Stress (1-10)")
def predict(user_input: UserInput):
    try:
        prediction = get_predictions(user_input)

        # Load current data
        data = load_data()

        # Save new entry
        entry = {
            "input": user_input.dict(),
            "prediction": prediction
        }
        data["entries"].append(entry)
        save_data(data)

        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# API to fetch stored predictions
@app.get("/data", summary="Get all stored predictions")
def get_stored_data():
    return load_data()

# Run FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
