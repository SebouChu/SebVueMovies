# SebVueMovies

https://sebvuemovies.herokuapp.com


Application Node.JS + VueJS à base de films, réalisée dans le cadre du module "JS Avancé" en LP DAWIN.

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

    $ mkdir -p /data/db
    $ mongod

### Import du dump

    $ mongorestore -h localhost:27017 -d svm-db dump/svm-db

## Configuration

Pour la configuration des variables d'environnement du `.env`, reportez-vous au fichier d'exemple [`.env.example`](https://github.com/SebouChu/SebVueMovies/blob/master/.env.example).