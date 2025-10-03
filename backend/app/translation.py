from googletrans import Translator

translator = Translator()

def translate_text(text: str, target_lang: str) -> str:
    """
    Translate text to the target language
    
    Args:
        text: The text to translate
        target_lang: Target language code (e.g., 'fr' for French, 'en' for English)
        
    Returns:
        Translated text
    """
    try:
        translation = translator.translate(text, dest=target_lang)
        return translation.text
    except Exception as e:
        raise Exception(f"Translation error: {str(e)}")
