import requests
import json
import time

def test_translation():
    """Teste le service de traduction"""
    url = "http://localhost:8000/api/artwork/process"
    
    # Test 1: Traduction en français
    print("\n=== Test 1: Traduction en français ===")
    data = {
        "description": "This is a beautiful painting from the 19th century.",
        "target_language": "fr",
        "format": "text"
    }
    
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print("Response:", json.dumps(response.json(), indent=2, ensure_ascii=False))
    
    # Test 2: Traduction en wolof
    print("\n=== Test 2: Traduction en wolof ===")
    data = {
        "description": "This is a beautiful painting from the 19th century.",
        "target_language": "wo",
        "format": "text"
    }
    
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print("Response:", json.dumps(response.json(), indent=2, ensure_ascii=False))

def test_tts():
    """Teste le service de synthèse vocale"""
    url = "http://localhost:8000/api/artwork/process"
    
    # Test 3: Synthèse vocale en français
    print("\n=== Test 3: Synthèse vocale en français ===")
    data = {
        "description": "Ceci est un tableau du 19ème siècle.",
        "target_language": "fr",
        "format": "audio"
    }
    
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("Audio URL reçue avec succès!")
        print(f"Format audio: {result.get('format')}")
        
        # Sauvegarder l'audio dans un fichier
        audio_data = result.get('audio_url').split(',')[1]
        with open('output_audio.mp3', 'wb') as f:
            f.write(audio_data.encode('latin1'))
        print("Fichier audio enregistré sous 'output_audio.mp3'")
    else:
        print("Erreur:", response.text)

if __name__ == "__main__":
    print("=== Démarrage des tests de l'API ===")
    
    # Attendre que les services soient prêts
    print("\nAttente du démarrage des services (10 secondes)...")
    time.sleep(10)
    
    # Exécuter les tests
    test_translation()
    test_tts()
    
    print("\n=== Tests terminés ===")
