# 🛒 React E-Commerce

> Modern e-commerce platform built with React, TypeScript, Firebase, and Tailwind CSS

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=flat-square)](https://react-ecommerce-firebase.netlify.app/)

**[🚀 View Live Demo](https://react-ecommerce-firebase.netlify.app/)**

---

## ✨ Features

- 🔐 Firebase Authentication (Email/Password + Google Sign-In)
- 🛒 Persistent shopping cart (localStorage + Firestore sync)
- ❤️ Favorites/Wishlist functionality
- 🔍 Product search with debouncing
- 📦 Order management and history
- 📱 Fully responsive design
- ⚡ Optimized data fetching with React Query

---

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Tailwind CSS, Vite  
**Backend:** Firebase (Authentication + Firestore)  
**State Management:** React Query, Context API  
**Deployment:** Netlify

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/atabakgp/react-ecommerce.git
cd react-ecommerce

# Install dependencies
npm install

# Create .env file with Firebase config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Run development server
npm run dev
```

### 🔥 Firebase Emulator (Optional for Local Testing)

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Start Firebase emulators (Authentication & Firestore)
firebase emulators:start

# In another terminal, run the app
npm run dev
```

**Benefits of using emulators:**

- Test without affecting production data
- Faster development cycle
- No Firebase quota usage during development
- Automatic connection when running in dev mode

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── contexts/        # React Context providers (Cart, Auth)
├── firebase/        # Firebase configuration
├── hooks/           # Custom React hooks
├── interfaces/      # TypeScript interfaces
├── layouts/         # Layout components (Main, Dashboard)
├── pages/           # Page components
├── routes/          # Route configuration (Public, Private)
├── services/        # API and business logic layer
└── types/           # TypeScript type definitions
```

---

## 🔑 Key Implementations

- **Strategy Pattern** - Flexible authentication service
- **Provider Pattern** - Global state management (Cart, Favorites, User, Toast, Loading)
- **Service Layer** - Separation of concerns with dedicated API services
- **Custom Hooks** - Reusable logic with React Query
- **Route Protection** - Public and private route configuration
- **Type Safety** - Full TypeScript coverage with interfaces and types

---

## 🔒 Security

- Firestore security rules ensuring user data isolation
- Environment variables for sensitive config
- Firebase Authentication

**Firestore Rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

**Netlify Setup:**

- Build command: `npm run build`
- Publish directory: `dist`
- Add `public/_redirects` with: `/*    /index.html   200`

---

## 👤 Author

**[@atabakgp](https://github.com/atabakgp)**

---

⭐ **Star this repo if you found it helpful!**
