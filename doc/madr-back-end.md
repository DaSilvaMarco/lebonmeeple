# MADR 001 – Choix du framework Back-end

## Contexte et problème
Dans le cadre du projet, il est nécessaire de sélectionner un framework back-end robuste, maintenable et adapté à une architecture web moderne.
Le choix du framework aura un impact direct sur la productivité, les performances de l’application, la facilité de maintenance et la disponibilité des compétences.  

## Options considérées
1. **NestJS (Node.js / TypeScript)**  
2. **Spring Boot (Java)**  
3. **Django (Python)**  
4. **.NET Core (C#)**  

## Avantages et inconvénients

### 1. NestJS (Node.js / TypeScript)
✅ **Avantages :**
- Écosystème JavaScript/TypeScript très populaire.  
- Architecture modulaire et inspirée d’Angular (clarté et maintenabilité).  
- Support natif de GraphQL, WebSockets, microservices.  
- Grande communauté open-source.  

❌ **Inconvénients :**
- Moins performant que Java/.NET sur des traitements très intensifs.  
- Gestion de la concurrence limitée au modèle **event-loop** (Node.js single-threaded).  
- Encore jeune comparé à Spring ou .NET (moins de maturité).  

---

### 2. Spring Boot (Java)
✅ **Avantages :**
- Très mature et largement utilisé en entreprise.  
- Outils robustes pour la sécurité (Spring Security), la persistance (Spring Data JPA).  
- Fort support pour microservices via Spring Cloud.  
- Hautes performances pour les applications à forte charge.  

❌ **Inconvénients :**
- Courbe d’apprentissage plus élevée (Java + écosystème Spring).  
- Configuration parfois complexe malgré Spring Boot.  
- Consommation mémoire plus élevée que Node.js ou Python.  

---

### 3. Django (Python)
✅ **Avantages :**
- Développement rapide (idéal pour prototypage/startups).  
- Batteries incluses : ORM, admin, sécurité, authentification déjà intégrés.  
- Large communauté et beaucoup de ressources pédagogiques.  
- Idéal pour applications data-driven (Python est fort en data science).  

❌ **Inconvénients :**
- Moins performant que Java ou .NET sur de grosses charges.  
- Moins adapté aux architectures microservices.  
- Typage dynamique peut réduire la robustesse pour de grands projets.  

---

### 4. .NET Core (C#)
✅ **Avantages :**
- Très performant et optimisé (notamment sur Windows et Linux).  
- Supporte API REST, gRPC, microservices.  
- Bon tooling avec Visual Studio et Azure DevOps.  
- Multiplateforme (Linux, Windows, Mac).  

❌ **Inconvénients :**
- Courbe d’apprentissage si l’équipe n’a pas d’expérience en C#.  
- Communauté open-source plus petite que Node.js ou Python (même si en croissance).  
- Ecosystème souvent plus tourné vers Microsoft Azure (moins neutre).  

---

## Décision
**NestJS (Node.js / TypeScript)** est choisis comme framework back-end.  

## Raisons
- Familiarité avec TypeScript.  
- NestJS offre une bonne productivité et une architecture claire.  
- L’écosystème Node.js permet d’utiliser de nombreuses bibliothèques modernes.  
- La scalabilité est suffisante pour le contexte du projet.  

## Conséquences
- La performance brute sera moindre qu’un back-end Java ou .NET, mais acceptable compte tenu du contexte.  
- Habitudes à certains patterns inspirés d’Angular.  
- L’architecture restera modulable et pourra évoluer vers une approche microservices si nécessaire.  
