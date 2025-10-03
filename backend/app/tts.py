from gtts import gTTS
import os

def text_to_speech(text: str, lang: str, output_path: str) -> str:
    """
    Convert text to speech and save to the specified path
    
    Args:
        text: Text to convert to speech
        lang: Language code (e.g., 'fr' for French, 'en' for English)
        output_path: Path where to save the audio file
        
    Returns:
        Path to the saved audio file
    """
    try:
        tts = gTTS(text=text, lang=lang, slow=False)
        tts.save(output_path)
        return output_path
    except Exception as e:
        # Clean up the file if it was partially created
        if os.path.exists(output_path):
            try:
                os.unlink(output_path)
            except:
                pass
        raise Exception(f"TTS error: {str(e)}")
