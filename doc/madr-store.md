# MADR 004 – Gestion de l’état global côté Front-end

## Contexte et problème
Dans une application front-end moderne, le partage de données entre composants peut rapidement devenir complexe et entraîner du **props drilling**.
Cela nuit à la maintenabilité et à la clarté du code.  
Nous devons donc sélectionner une solution robuste de **state management** pour centraliser les données et simplifier la communication entre composants.  

## Options considérées
1. **Redux Toolkit**  
2. **Context API (React natif)**  
3. **Zustand**  
4. **Recoil**  

## Avantages et inconvénients

### 1. Redux Toolkit
✅ **Avantages :**
- Standard industriel pour la gestion d’état dans les applications React.  
- Simplifie grandement Redux “classique” (moins de boilerplate).  
- Excellent écosystème : devtools, middlewares, persistance de l’état.  
- Parfait pour les projets de moyenne à grande envergure.  
- Typage TypeScript bien supporté.  

❌ **Inconvénients :**
- Ajoute une couche de complexité par rapport à Context API ou Zustand.  
- Peut sembler “trop lourd” pour de petites applications.  

---

### 2. Context API
✅ **Avantages :**
- Inclus nativement dans React (pas besoin de librairie externe).  
- Simple à mettre en place pour un état global basique.  

❌ **Inconvénients :**
- Mauvaises performances si utilisé à grande échelle (renders multiples).  
- Pas de tooling avancé (debugging, devtools).  
- Devient vite difficile à maintenir si l’état devient complexe.  

---

### 3. Zustand
✅ **Avantages :**
- Syntaxe minimaliste et intuitive.  
- Très performant, basé sur des hooks.  
- Moins de boilerplate que Redux.  

❌ **Inconvénients :**
- Communauté plus petite que Redux.  
- Moins d’écosystème (middlewares, devtools, persistance).  
- Pas le standard industriel → moins de ressources et support.  

---

### 4. Recoil
✅ **Avantages :**
- Intégration fluide avec React.  
- Gestion d’état granulaire (re-render uniquement des composants concernés).  
- Syntaxe plus simple que Redux.  

❌ **Inconvénients :**
- Encore jeune et moins éprouvé en production.  
- Communauté plus restreinte que Redux.  
- Support incertain sur le long terme.  

---

## Décision
**Redux Toolkit** est choisis comme solution de gestion d’état global.  

## Raisons
- Solution éprouvée, largement utilisée dans l’industrie.  
- Réduit fortement le boilerplate comparé à Redux “classique”.  
- Outils avancés (Redux DevTools, persistance, middlewares) facilitent le debugging et la maintenance.  
- Bonne compatibilité avec TypeScript et adoption facile par l’équipe.  
- Évolutif pour de grands projets, contrairement à Context API.  

## Conséquences
- Courbe d’apprentissage un peu plus importante que Context API ou Zustand, mais acceptable. 
- L’application aura une architecture claire et maintenable en évitant le props drilling.  
- Mise en place de conventions de gestion d’état (slices, selectors) nécessaires pour garder une cohérence de code.  
