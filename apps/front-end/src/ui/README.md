# UI System - LeBonMeeple

## Overview

Ce dossier contient les éléments de base du système de design de l'application LeBonMeeple, incluant les hooks pour la gestion des couleurs, les composants réutilisables et la configuration du thème.

## Structure

```
src/ui/
├── hooks/              # Hooks personnalisés pour l'UI
│   ├── useThemeColors.ts  # Hook principal pour les couleurs du thème
│   └── index.ts
├── components/         # Composants UI réutilisables
│   ├── Card.tsx          # Composant carte de base
│   └── index.ts
├── theme.ts           # Configuration Chakra UI
├── Provider.tsx       # Provider du thème
└── index.ts          # Point d'entrée principal
```

## Hooks

### useThemeColors()

Hook principal qui centralise toutes les couleurs en fonction du mode clair/sombre.

```tsx
import { useThemeColors } from '@/ui/hooks';

const MyComponent = () => {
  const {
    bgGradient, // Gradient de fond principal
    cardBg, // Fond des cartes
    textColor, // Couleur de texte secondaire
    textColorPrimary, // Couleur de texte principal
    borderColor, // Couleur des bordures
  } = useThemeColors();

  return (
    <Box bg={cardBg} borderColor={borderColor}>
      <Text color={textColorPrimary}>Titre</Text>
      <Text color={textColor}>Description</Text>
    </Box>
  );
};
```

### useHomePageColors()

Hook spécialisé pour la page d'accueil, étend `useThemeColors()`.

```tsx
import { useHomePageColors } from '@/ui/hooks';

const HomePage = () => {
  const { bgGradient, featuresBg, testimonialsBg, cardBg, textColor } =
    useHomePageColors();

  return (
    <Box bgGradient={bgGradient}>
      <Box bg={featuresBg}>Features</Box>
      <Box bgGradient={testimonialsBg}>Testimonials</Box>
    </Box>
  );
};
```

## Composants

### Card

Composant de carte réutilisable qui utilise automatiquement les couleurs du thème.

```tsx
import { Card } from '@/ui/components';

const Example = () => (
  <Card title="Mon titre" description="Ma description">
    <Button>Action</Button>
  </Card>
);
```

## Avantages

1. **Centralisation** : Toutes les couleurs sont définies en un seul endroit
2. **Cohérence** : Garantit l'utilisation cohérente des couleurs dans toute l'app
3. **Maintenance** : Facilite les modifications globales du thème
4. **Réutilisabilité** : Les hooks peuvent être utilisés dans n'importe quel composant
5. **Type Safety** : TypeScript garantit que les couleurs sont utilisées correctement
6. **Performance** : Les hooks sont optimisés avec `useColorModeValue`

## Usage dans d'autres composants

Pour utiliser ces couleurs dans vos composants :

1. Importez le hook approprié
2. Destructurez les couleurs dont vous avez besoin
3. Utilisez-les dans vos propriétés de style

```tsx
// Avant (répétitif et non centralisé)
const cardBg = useColorModeValue('white', 'gray.800');
const textColor = useColorModeValue('gray.600', 'gray.300');

// Après (centralisé et réutilisable)
const { cardBg, textColor } = useThemeColors();
```

## Extensibilité

Pour ajouter de nouvelles couleurs ou hooks spécialisés :

1. Ajoutez les couleurs dans `useThemeColors.ts`
2. Créez des hooks spécialisés si nécessaire (comme `useHomePageColors`)
3. Exportez-les dans `hooks/index.ts`

Exemple d'extension :

```tsx
export const useBlogPageColors = () => {
  const baseColors = useThemeColors();

  const articleBg = useColorModeValue('white', 'gray.750');
  const codeBg = useColorModeValue('gray.100', 'gray.700');

  return {
    ...baseColors,
    articleBg,
    codeBg,
  };
};
```
