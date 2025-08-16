# MADR 002 – Choix du framework Front-end

## Contexte et problème
Dans le cadre du projet, sélectionner un framework front-end est nécessaire, il doit être moderne, maintenable et performant pour développer une interface utilisateur réactive et scalable.  
Le choix du framework influencera la productivité, la qualité de l’expérience utilisateur et la pérennité du projet.  

## Options considérées
1. **Next (JavaScript / TypeScript)**  
2. **Angular (TypeScript)**  
3. **Vue.js (JavaScript / TypeScript)**  
4. **Svelte (JavaScript / TypeScript)**  

## Avantages et inconvénients

### 1. Next (JavaScript / TypeScript)
✅ **Avantages :**
- Énorme communauté et écosystème riche.  
- Très flexible (possibilité de choisir ses librairies et outils).  
- Supporté par Facebook/Meta et largement adopté dans l’industrie.  

❌ **Inconvénients :**
- Nécessite de nombreux choix d’outils (state management).  
- Courbe d’apprentissage parfois confuse pour les débutants.  
- Moins structuré qu’Angular.  

---

### 2. Angular (TypeScript)
✅ **Avantages :**
- Framework complet avec batteries incluses (routing, services, DI, testing).  
- Structure claire et architecture solide pour grandes applications.  
- Maintenu par Google et utilisé dans des projets d’entreprise.  
- Très bon support TypeScript natif.  

❌ **Inconvénients :**
- Plus complexe et verbeux que React ou Vue.js.  
- Courbe d’apprentissage plus longue.  
- Moins populaire pour des projets légers/startups.  

---

### 3. Vue.js (JavaScript / TypeScript)
✅ **Avantages :**
- Facile à apprendre et très intuitif.  
- Bon compromis entre la flexibilité de React et la structure d’Angular.  
- Documentation claire et communauté active.  
- Excellentes performances.  

❌ **Inconvénients :**
- Moins adopté que React/Angular dans les grandes entreprises.  
- Ecosystème plus restreint, surtout pour les solutions avancées.  
- Risque de dépendance à une plus petite communauté open-source.  

---

### 4. Svelte (JavaScript / TypeScript)
✅ **Avantages :**
- Très performant grâce à la compilation en code natif JS (pas de runtime lourd).  
- Syntaxe simple et intuitive (idéal pour petits/moyens projets).  
- Fichiers légers et rapidité d’exécution.  

❌ **Inconvénients :**
- Communauté beaucoup plus petite que React/Angular/Vue.  
- Moins de support et d’outils tiers.  
- Encore jeune et moins éprouvé en production à grande échelle.  

---

## Décision
Nous choisissons **Next (JavaScript / TypeScript)** comme framework.  

## Raisons
- Très largement adopté et documenté, ce qui facilite la montée en compétences.  
- Grande flexibilité dans le choix des outils (Redux, Zustand...).  
- JavaScript/TypeScript est connu, ce qui réduit la courbe d’apprentissage.  

## Conséquences
- Il faudra définir une architecture claire et choisir des outils (state management, routing, tests).  
- Le manque de structure native comparé à Angular demandera des bonnes pratiques strictes.  
- La communauté et l’écosystème ga
