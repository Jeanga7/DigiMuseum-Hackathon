# API de Traduction et Synthèse Vocale

Ce service fournit des fonctionnalités de traduction et de synthèse vocale pour le Musée des Civilisations Noires, permettant une meilleure accessibilité des contenus dans différentes langues.

## Fonctionnalités

- Traduction de texte en plusieurs langues
- Synthèse vocale des textes traduits
- Support multilingue (français, anglais, wolof, etc.)

## Prérequis

- Docker et Docker Compose
- Python 3.9+

## Installation

1. Cloner le dépôt :
   ```bash
   git clone [URL_DU_REPO]
   cd DigiMuseum-Hackathon/backend
   ```

2. Construire et démarrer les conteneurs :
   ```bash
   docker-compose up --build -d
   ```

L'API sera disponible à l'adresse : `http://localhost:8000`

## Utilisation de l'API

L'API est documentée de manière interactive via deux interfaces :

### 1. Swagger UI (recommandé)
Accédez à l'interface Swagger pour tester facilement les endpoints :
```
http://localhost:8000/docs
```

### 2. ReDoc
Pour une documentation plus lisible :
```
http://localhost:8000/redoc
```

### Endpoint principal

**`POST /api/artwork/process`**

Permet de traduire du texte et/ou de le convertir en audio.

#### Comment tester :
1. Ouvrez http://localhost:8000/docs dans votre navigateur
2. Cliquez sur "POST /api/artwork/process"
3. Cliquez sur "Try it out"
4. Remplissez les champs :
   - `description` : Le texte à traduire
   - `target_language` : Code de la langue cible (fr, en, wo, etc.)
   - `format` : 'text' pour du texte, 'audio' pour un fichier audio
5. Cliquez sur "Execute"

#### Exemple de réponse audio :
```json
{
  "audio_url": "http://localhost:8000/audio/95cb3adb-95cb-452d-83f3-ca489b55a9b5.mp3",
  "format": "audio"
}
```

#### Exemple de réponse texte :
```json
{
  "result": "Texte traduit ici",
  "format": "text"
}
```

### Langues supportées

- Français : `fr`
- Anglais : `en`
- Wolof : `wo`
- (Ajoutez d'autres langues selon les besoins)

## Développement

### Structure des dossiers

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # Point d'entrée de l'API
│   ├── translation.py   # Logique de traduction
│   └── tts.py          # Synthèse vocale
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables nécessaires :

```
# Configuration de l'API
PORT=8000
DEBUG=True

# Dossier de stockage des fichiers audio
AUDIO_DIR=/app/audio
```

## Tests

Pour exécuter les tests :

```bash
docker-compose exec backend pytest
```

## Déploiement

Pour le déploiement en production, assurez-vous de :
1. Mettre `DEBUG=False` dans les variables d'environnement
2. Configurer un serveur web comme Nginx en tant que reverse proxy
3. Mettre en place un certificat SSL

## Licence

[À spécifier selon la licence choisie pour le projet]

## Auteurs

- [Liste des contributeurs]

## Remarques

- Les fichiers audio générés sont stockés de manière éphémère dans le conteneur
- Pour une utilisation en production, envisagez d'utiliser un service de stockage externe comme AWS S3 ou Google Cloud Storage
