# 📖 Cahier des évolutions de l’application

## Phase 1 – Mise en place du socle technique (mai – juin 2025)
- **14/05/2025** : Initialisation du backend avec **NestJS**.  
- **Début juin 2025** :  
  - Refactorisation des routes et logiques utilisateurs.  
  - Refactorisation de la logique d’update des posts.  
- **30/06/2025** : Ajout du **CRUD des commentaires**.  
- **Début juillet 2025** :  
  - Mise en place des premiers **tests unitaires**.  
  - Ajout d’outils de **linting** et de formatage de code (Prettier, ESLint).  
  - Intégration d’une **CI de base** (tests + build).  
  - Mise en place de **fixtures avec Faker.js** pour peupler la BDD.  
  - Préparation des containers avec **Prisma** et **pre-commit hooks**.  

---

## Phase 2 – Passage au monorepo et ajout du front (juillet 2025)
- **22/07/2025** :  
  - Migration en **monorepo** pour accueillir plusieurs applications.  
  - Ajout du frontend avec **Next.js**.  
  - Correctifs CI liés à la nouvelle structure.  

---

## Phase 3 – Construction des premières fonctionnalités front (août 2025)
- **01/08/2025** :  
  - Ajout d’une **page blog**.  
  - Nettoyage du store Redux et mise en place de Redux Toolkit.  
  - Containerisation du frontend avec Docker.  
  - Mise en place de **stages de qualité dans la CI**.  
- **04/08/2025** :  
  - Développement de la **homepage**.  
  - Création de l’API pour gérer les posts.  
  - Amélioration du refresh utilisateur via Redux.  
- **05/08/2025** :  
  - Ajout de la **création de posts**.  
  - Page de **détails d’un post**.  
  - Amélioration des visuels des posts.  
  - Amélioration de la page de login et ajout de l’avatar utilisateur dans Redux.  
- **07/08/2025** : Correctif du `getServerSideProps` sur l’App Router.  
- **08–09/08/2025** :  
  - Posts en **SSR**.  
  - Changement du **thème graphique** et ajout de la page profil avec ses propres posts.  
  - Ajout/suppression de posts et de commentaires.  
  - Amélioration de la CI et des tests (front et back).  
- **10–11/08/2025** :  
  - Ajout de modales.  
  - Ajout de tests **end-to-end avec Playwright**.  
  - Documentation initiale (README).  

---

## Phase 4 – Administration et montée en fonctionnalités (mi-août 2025)
- **12/08/2025** :  
  - Ajout des **pages d’administration** et gestion des rôles utilisateurs.  
  - Nettoyage du backend et du frontend.  
- **13/08/2025** : Ajout de la **pagination**.  
- **15/08/2025** :  
  - Ajout de la **catégorisation des posts**.  
  - Changement de la structure de la BDD.  
  - Nettoyage du Dockerfile et de docker-compose.  
- **16/08/2025** :  
  - Amélioration de l’accessibilité (**RGAA**).  
  - Ajout de la documentation **MADR**.  
  - Intégration de **Dependabot**.  
  - Mise à jour de l’UI et ajout d’un loader sur le login.  
  - Début de la partie **jeux** avec une première liste.  
- **17/08/2025** :  
  - Ajout de la **vue d’un jeu** et association aux posts.  
  - Ajout d’une **barre de recherche pour les jeux**.  
  - Correctifs de responsive design.  
- **18/08/2025** : Mise en place des **fixtures pour articles et jeux**.  

---

## 🚀 Synthèse
1. **Socle backend** : mise en place de NestJS, Prisma, tests et CI.  
2. **Ajout du frontend** avec Next.js et passage en monorepo.  
3. **Développement des fonctionnalités utilisateur** (posts, commentaires, profil, UI).  
4. **Montée en qualité** avec tests E2E, CI/CD renforcée et documentation.  
5. **Administration & organisation** : rôles, catégories, pagination.  
6. **Nouvelles fonctionnalités** avec l’introduction des jeux.  
