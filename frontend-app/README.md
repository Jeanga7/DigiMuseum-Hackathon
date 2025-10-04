# Musée des Civilisations Noires - Application Frontend

Application web moderne pour la visite virtuelle du Musée des Civilisations Noires, développée avec Next.js et Tailwind CSS.

## 🚀 Prérequis

- Node.js (version 16 ou supérieure)
- npm (version 8 ou supérieure) ou yarn
- Accès à l'API backend (assurez-vous que le backend est en cours d'exécution)

## 🛠 Installation

1. **Cloner le dépôt**
   ```bash
   git clone [URL_DU_REPO]
   cd DigiMuseum-Hackathon/frontend-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuration de l'environnement**
   Créez un fichier `.env.local` à la racine du projet avec les variables d'environnement nécessaires :
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000  # URL de l'API backend
   ```

## 🚦 Démarrage en mode développement

```bash
npm run dev
# ou
yarn dev
```

L'application sera disponible à l'adresse : [http://localhost:3000](http://localhost:3000)

## 🏗 Construction pour la production

Pour créer une version de production optimisée :

```bash
npm run build
# puis
npm start
```

## 🧪 Exécution des tests

```bash
npm test
# ou
yarn test
```

## 🌍 Fonctionnalités

- [ ] Page d'accueil avec vue d'ensemble du musée
- [ ] Galerie d'œuvres d'art avec filtres
- [ ] Visite virtuelle 360°
- [ ] Support multilingue (Français, Anglais, Wolof)
- [ ] Accessibilité (contraste élevé, taille de police ajustable)
- [ ] Scanner de codes QR pour plus d'informations

## 📁 Structure du projet

```
frontend-app/
├── public/             # Fichiers statiques
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── pages/          # Pages de l'application
│   ├── styles/         # Fichiers de style globaux
│   └── utils/          # Utilitaires et helpers
├── .env.local          # Variables d'environnement (à créer)
├── next.config.js      # Configuration Next.js
└── package.json        # Dépendances et scripts
```

## 🤝 Contribution

1. Créez une branche pour votre fonctionnalité : `git checkout -b feature/nouvelle-fonctionnalite`
2. Committez vos changements : `git commit -m 'Ajout d'une nouvelle fonctionnalité'`
3. Poussez vers la branche : `git push origin feature/nouvelle-fonctionnalite`
4. Créez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
