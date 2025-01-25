# Utilise une image officielle de Node.js
FROM node:16

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier uniquement les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Exposer le port utilisé par le frontend
EXPOSE 4200

# Commande pour démarrer le serveur Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4200"]
