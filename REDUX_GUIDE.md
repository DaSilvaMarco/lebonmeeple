# 🔐 Redux Toolkit - Gestion d'Authentification

Ce projet utilise Redux Toolkit pour gérer l'état global de l'application, notamment l'authentification des utilisateurs.

## 📦 Installation

Les packages suivants ont été installés :

- `@reduxjs/toolkit` : Pour la gestion d'état
- `react-redux` : Pour l'intégration React

## 🏗️ Structure

```
src/
├── store/
│   ├── index.ts          # Configuration du store principal
│   └── authSlice.ts      # Slice pour l'authentification
├── hooks/
│   └── useAuth.ts        # Hooks personnalisés pour l'auth
├── components/
│   ├── ReduxProvider.tsx # Provider Redux
│   └── UserProfile.tsx   # Composant profil utilisateur
└── ui/
    └── Provider.tsx      # Provider global (Chakra + Redux)
```

## 🔧 Fonctionnalités

### AuthSlice Actions

- `loginStart()` : Démarre le processus de connexion
- `loginSuccess({ user, token })` : Connexion réussie
- `loginFailure()` : Échec de connexion
- `logout()` : Déconnexion
- `restoreSession()` : Restaure la session depuis localStorage
- `updateUser(userData)` : Met à jour les infos utilisateur

### Sélecteurs

- `selectUser` : Données de l'utilisateur connecté
- `selectToken` : Token d'authentification
- `selectIsAuthenticated` : État de connexion
- `selectIsLoading` : État de chargement

## 💻 Utilisation

### Dans un composant

```tsx
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store';
import { logout } from '../store/authSlice';

function MonComposant() {
  const { user, isAuthenticated, token } = useAuth();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <div>Veuillez vous connecter</div>;
  }

  return (
    <div>
      <h1>Bonjour {user?.username}</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}
```

### Pour les appels API authentifiés

```tsx
import { useAuthHeaders } from '../hooks/useAuth';

function MonAPI() {
  const { getAuthHeaders } = useAuthHeaders();

  const fetchData = async () => {
    const response = await fetch('/api/data', {
      method: 'GET',
      headers: getAuthHeaders(), // Inclut automatiquement le Bearer token
    });
    return response.json();
  };
}
```

### Dans la page de connexion

```tsx
import { useAppDispatch } from '../store';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';

function LoginPage() {
  const dispatch = useAppDispatch();

  const handleLogin = async (credentials) => {
    dispatch(loginStart());

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      dispatch(
        loginSuccess({
          user: result.user,
          token: result.token,
        }),
      );
    } catch (error) {
      dispatch(loginFailure());
    }
  };
}
```

## 💾 Persistence

Le store automatiquement :

- **Sauvegarde** le token et les données utilisateur dans `localStorage`
- **Restaure** la session au démarrage de l'application
- **Nettoie** les données lors de la déconnexion

## 🔐 Sécurité

- Le token est stocké de manière sécurisée
- La session est automatiquement restaurée
- Les erreurs sont gérées proprement
- Les données sensibles sont nettoyées à la déconnexion

## 🎯 Pages impactées

- ✅ **Login** (`/login`) : Connexion avec Redux
- ✅ **Signup** (`/signup`) : Prêt pour Redux (à connecter)
- ✅ **Home** (`/`) : Affichage conditionnel selon l'auth
- ✅ **Blog Create** (`/blog/create`) : Prêt pour l'auth
- ✅ **Blog Detail** (`/blog/[id]`) : Prêt pour l'auth

## 🚀 Prochaines étapes

1. Connecter la page d'inscription à Redux
2. Ajouter la protection des routes privées
3. Implémenter le refresh token
4. Ajouter la gestion des rôles utilisateur
