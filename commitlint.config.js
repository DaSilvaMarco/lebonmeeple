module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nouvelle fonctionnalité
        "fix", // Correction de bug
        "docs", // Documentation
        "style", // Formatage, points-virgules manquants, etc.
        "refactor", // Refactorisation du code
        "perf", // Amélioration des performances
        "test", // Tests
        "build", // Système de build
        "ci", // Configuration CI
        "chore", // Maintenance
        "revert", // Annulation d'un commit précédent
      ],
    ],
    "subject-max-length": [2, "always", 72],
    "subject-min-length": [2, "always", 10],
    "subject-case": [2, "always", "lower-case"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
  },
};
