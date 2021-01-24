FROM node:latest

RUN mkdir -p /usr/src/app

# définit le dossier 'app' comme dossier de travail
WORKDIR /usr/src/app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY . .

# installe les dépendances du projet
RUN npm install

EXPOSE 8080

# construit l'app pour la production en la minifiant
CMD ["npm", "run", "serve"]
