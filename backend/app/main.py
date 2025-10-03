from fastapi import FastAPI, HTTPException, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional
from .translation import translate_text
from .tts import text_to_speech
import os
import uuid
from pathlib import Path

# Create audio directory if it doesn't exist
AUDIO_DIR = Path("audio")
AUDIO_DIR.mkdir(exist_ok=True)

app = FastAPI(title="Museum Digital Platform API")

# Mount static files directory for audio files
app.mount("/audio", StaticFiles(directory=AUDIO_DIR), name="audio")

class ArtworkRequest(BaseModel):
    description: str
    target_language: str
    format: str = "text"

@app.post("/api/artwork/process")
async def process_artwork(request: ArtworkRequest):
    if request.format not in ["text", "audio"]:
        raise HTTPException(status_code=400, detail="Format must be 'text' or 'audio'")
    
    # Translate the text
    try:
        translated = translate_text(request.description, request.target_language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")
    
    if request.format == "text":
        return {"result": translated, "format": "text"}
    
    # Convert to speech if audio format is requested
    try:
        # Generate unique filename
        audio_id = str(uuid.uuid4())
        audio_path = AUDIO_DIR / f"{audio_id}.mp3"
        
        # Save audio to file
        audio_data = text_to_speech(translated, request.target_language, str(audio_path))
        
        # Get the base URL (for local development)
        base_url = "http://localhost:8000"  # À remplacer par votre URL de production si nécessaire
        
        # Return full URL to access the audio file
        return {
            "audio_url": f"{base_url}/audio/{audio_id}.mp3",
            "format": "audio"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS conversion failed: {str(e)}")

@app.get("/")
async def read_root():
    return {"message": "Museum Digital Platform API is running"}
