# 🚀 Blog du Passionné (BDP) — L'Excellence Tech 2026

![Tech](https://img.shields.io/badge/Stack-AdonisJS%206-blueviolet?style=for-the-badge)
![UI](https://img.shields.io/badge/UI-Tailwind%20Premium-00A2FF?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge)

Bienvenue sur le dépôt du **Blog du Passionné (BDP)**, un média tech de nouvelle génération conçu pour décoder l'innovation avec une esthétique premium et des performances de pointe.

---

## ✨ Caractéristiques (V1.0)

### 🎨 Design & Expérience Utilisateur

- **UI Premium 2026** : Design moderne avec effets de glassmorphism, flous artistiques et typographies massives.
- **Dark Mode Natif** : Basculez entre un mode clair éclatant et un mode sombre profond.
- **Ultra-Responsive** : Menu mobile type "overlay" sophistiqué et navigation fluide sur tous les terminaux.
- **Transitions Micro-animations** : Expérience vivante avec des effets de fade-in et de montée au scroll.

### 📝 Gestion du Contenu (Admin)

- **Dashboard Puissant** : Statistiques et vue d'ensemble de l'activité.
- **CRUD Articles** : Création, édition et suppression simplifiées.
- **Markdown Support** : Rendu d'articles complexes (code, tableaux, citations) via Markdown.
- **Gestion Média** : Upload d'images de couverture optimisé.

### 🔍 Fonctionnalités Utilisateurs

- **Recherche Instantanée** : Filtrez les articles par mots-clés.
- **Navigation par Catégories** : IA, Web, Mobile, Outils.
- **Sommaire Automatique** : Génération de TOC (Table Of Contents) dynamique sur les articles.
- **Système de Contact** : Formulaire sécurisé avec stockage des messages en base de données.

---

## 🛠 Stack Technique

- **Backend** : [AdonisJS 6](https://docs.adonisjs.com/guides/whats-new) (TypeScript)
- **Frontend** : EdgeJS + [Tailwind CSS](https://tailwindcss.com/)
- **Database** : SQLite (Dev) / PostgreSQL (Prod ready) via Lucid ORM
- **Icons & Assets** : Heroicons & Custom SVG Premium

---

## 🚀 Installation & Lancement

### 1. Prérequis

Assurez-vous d'avoir [Node.js](https://nodejs.org/) (v20+) installé sur votre machine.

### 2. Cloner le projet

```bash
git clone https://github.com/votre-compte/blog_du_passionne_BDP.git
cd blog_du_passionne_BDP
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configuration

Copiez le fichier `.env.example` vers `.env` et configurez vos variables.

```bash
cp .env.example .env
node ace generate:key
```

### 5. Base de données

Exécutez les migrations pour préparer la structure.

```bash
node ace migration:run
```

### 6. Lancer le serveur

```bash
npm run dev
```

Le blog sera accessible sur [http://localhost:3333](http://localhost:3333)

---

## 📂 Structure du Projet

```text
├── app/
│   ├── controllers/    # Logique métier
│   ├── models/         # Modèles Lucid (Article, Message, User)
│   └── exceptions/     # Gestionnaire d'erreurs global
├── config/             # Configuration d'AdonisJS
├── database/           # Migrations et Seeds
├── public/             # Assets statiques & Uploads
├── resources/
│   ├── views/          # Templates EdgeJS (Pages & Composants)
│   └── css/            # Fichiers CSS source
└── start/              # Routes et initialisation
```

---

## 👨‍💻 Auteur

**Blog du Passionné (BDP)** - _L'innovation à portée de main._

---

_Ce projet est sous licence MIT._
