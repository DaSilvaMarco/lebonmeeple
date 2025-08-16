# MADR 003 – Choix de la base de données

## Contexte et problème
Le projet nécessite une base de données robuste et adaptée au stockage des données métiers.  
Le choix de la base de données aura un impact sur la performance, la scalabilité, la flexibilité du modèle de données et la facilité de maintenance.  

## Options considérées
1. **PostgreSQL (relationnel, SQL)**  
2. **MySQL / MariaDB (relationnel, SQL)**  
3. **MongoDB (NoSQL, documents)**  
4. **Redis (NoSQL, clé-valeur, en complément)**  

## Avantages et inconvénients

### 1. PostgreSQL
✅ **Avantages :**
- Très robuste et mature.  
- Supporte les transactions complexes (ACID).  
- Fonctionnalités avancées : JSONB, indexation puissante, géospatiale (PostGIS).  
- Large communauté open-source.  

❌ **Inconvénients :**
- Configuration plus complexe que MySQL pour certains cas.  
- Performances légèrement inférieures à MySQL sur des lectures simples massives.  

---

### 2. MySQL / MariaDB
✅ **Avantages :**
- Très populaire, facile à déployer.  
- Bonne performance sur des lectures simples.  
- Large écosystème et documentation abondante.  
- MariaDB est une version open-source avec des améliorations.  

❌ **Inconvénients :**
- Moins de fonctionnalités avancées que PostgreSQL.  
- Gestion des transactions moins robuste (selon moteurs utilisés).  
- Moins flexible pour des données semi-structurées (JSON).  

---

### 3. MongoDB
✅ **Avantages :**
- Base orientée documents, flexible pour des schémas évolutifs.  
- Adapté aux projets nécessitant des données non structurées.  
- Bon support pour la scalabilité horizontale (sharding).  
- Syntaxe simple pour les développeurs JavaScript.  

❌ **Inconvénients :**
- Pas de support ACID complet sur toutes les opérations (bien que largement amélioré).  
- Moins adapté aux relations complexes.  
- Consommation mémoire plus élevée que SQL classique.  

---

### 4. Redis (en complément)
✅ **Avantages :**
- Base en mémoire extrêmement rapide.  
- Idéal pour cache, sessions, files d’attente.  
- Supporte des structures de données avancées (listes, sets, pub/sub).  

❌ **Inconvénients :**
- Pas une base principale (données volatiles si non persistées).  
- Non adapté pour un stockage relationnel ou documentaire complet.  

---

## Décision
Nous choisissons **PostgreSQL** comme base de données principale.  

## Raisons
- PostgreSQL combine robustesse, support ACID, et flexibilité (relations + JSON).  
- Très adapté pour des applications modernes nécessitant à la fois données relationnelles et semi-structurées.  

## Conséquences
- PostgreSQL devra être correctement configuré pour garantir les performances (index, optimisation des requêtes).  
- L’infrastructure sera plus complexe qu’une seule base, mais plus performante et scalable.  
