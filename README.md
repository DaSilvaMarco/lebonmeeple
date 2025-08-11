# LebonMeeple

Lebonmeeple est une application web dédiée à la communauté des amateurs de jeux de société.
Elle permet de partager des avis, des commentaires et des articles.

L'architecture du projet repose sur un monorepo avec une configuration mutuelle.

## Stack Technique

- **Architecture**:
  - Le back-end et le front-end sont en Domain-Drive Design afin de modéliser l'application autour du métier.

- **Orchestration** :
    - L'ensemble de l'application est orchestrée par docker. Un docker-compose.yml est à la racine du projet afin d'orchestré les trois images différentes (front-end, back-end et base de donées).

- **Front-end** :
  - Application Next.js avec typescript dans `apps/front-end/`.
  - Redux toolkit pour la persistance des données dans un store global à l'application.
  - Les composants graphiques sont gérés par la librairie de composants ChakraUI et un custom thème.

- **Back-end** :
    - API NestJS avec typescript dans `apps/back-end/`.
    - L'ORM Prisma est également installé sur le projet afin de faire le lien entre la base de données et le back-end.
    - Des fixtures peuvent être générées pour aider au développement.

- **Base de données** : 
  - Base de données relationnelle sous le système de gestion de base de données PostgreSQL.

- **Outils de qualité** :
  - Eslint: Analyse de code statique afin de vérifier le respect de nombreuses règles configurées.
  - Huksy: Lance les scripts de qualité de l'application avant le push sur github.
  - Prettier: Formate le code.
  - Vitest: Permet d'écrire et de jouer les tests unitaires côté front-end et back-end.
  - Playwright-bdd: Permet d'écrire des cas de tests et de lancer les tests de bout en bout
  - Intégration continue: Permet de vérifier que les différentes applications sont fonctionnelles et de surveiller la qualité de code

## Prérequis

- [Docker](https://www.docker.com/get-started) et [Docker Compose](https://docs.docker.com/compose/install/) installés sur votre machine.
- [Node.js](https://nodejs.org/) (recommandé pour le développement hors Docker)

## Installation et lancement

1. **Cloner le dépôt**

```bash
git clone https://github.com/DaSilvaMarco/lebonmeeple.git
cd lebonmeeple
```

2. **Configurer les variables d'environnement**

Créez le fichier `.env` à la racine du projet à côté du fichier `.env.local`

3. **Lancer l'application avec Docker**

```bash
docker compose up --build
```

- Cette commande va :
  - Construire les images Docker pour le front-end, le back-end et la base de données.
  - Démarrer les trois containers.

4. **Accéder à l'application**

- **Front-end** : [http://localhost:3001/](http://localhost:3001/)
- **Back-end (API doc)** : [http://localhost:3000/api](http://localhost:3000/api).

## Tests

Des scripts de test sont disponibles pour le front-end et le back-end.
- Pour lancer les tests de l'application front-end:
  - npm run front:test ou npm run front:test:coverage
- Pour lancer les tests de l'application back-end:
  - npm run api:test ou npm run api:test:coverage
- Pour lancer les tests de bout en bout:
  - npm run front:playwright

## Structure du projet

```
lebonmeeple/
├── apps/
│   ├── back-end/                # API NestJS
│   │   └── domains/             # DDD : modules métier (user, post, comment, ...)
│   └── front-end/               # Application Next.js
│       └── domains/             # DDD : modules métier (user, post, comment, ...)
├── docker-compose.yml           # Orchestration des containers
├── package.json                 # Dépendances globales
├── README.md                    # Documentation
└── ...
```

## Ressources utiles

 - [Documentation Next.js](https://nextjs.org/docs)
 - [Documentation NestJS](https://docs.nestjs.com/)
 - [Documentation Docker](https://docs.docker.com/)
 - [Documentation Vitest](https://vitest.dev/guide/)
 - [Documentation Playwright-BDD](https://playwright.dev/docs/test-bdd)

## Contact

Pour toute question ou problème, contactez moi sur l'adresse tdasilva.marco@gmail.com