# SebVueMovies

https://sebvuemovies.herokuapp.com
Sébastien Gaya / sebastien.gaya@etu.u-bordeaux.fr

Application Node.JS + VueJS + MongoDB à base de films, réalisée dans le cadre du module "JS Avancé" en LP DAWIN.

## OMDb

Recherche de poster gérée par un bouton dans le formulaire

## MongoDB

Les films et les notes sont stockés dans une base de données MongoDB.

### Installation

- Téléchargez MongoDB Community Edition juste [ici](https://www.mongodb.com/download-center/community).
- Les tutoriels d'installation :
  - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
  - [macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
  - [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

### Démarrage

    $ mkdir -p data/db
    $ mongod --dbpath data/db

### Import du dump

    $ mongorestore -h localhost:27017 -d svm-db dump/svm-db

## Configuration

    $ npm install

Pour la configuration des variables d'environnement du `.env`, reportez-vous au fichier d'exemple [`.env.example`](https://github.com/SebouChu/SebVueMovies/blob/master/.env.example).

## Démarrage

- Terminal 1
  ```
  $ mongod
  ```

- Terminal 2
  ```
  $ node_modules/.bin/webpack --progress --hide-modules --watch
  ```

- Terminal 3
  ```
  $ node src/node/app.js
  ```