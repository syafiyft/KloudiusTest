# KloudiusTest

A React Native mobile app built with Expo featuring user authentication — login, signup, persistent sessions, and a home screen.

---

## Tech Stack

- **React Native** (Expo SDK 54)
- **Context API** — global auth state management
- **AsyncStorage** — local persistence (no backend)
- **React Navigation v7** — native stack navigation
- **@expo/vector-icons** — password visibility toggle icon

---

## Features

- **Sign Up** — name, email, password with inline validation
- **Login** — credential check against locally stored users
- **Persistent session** — user stays logged in across app restarts
- **Logout** — clears session, registered accounts remain intact
- **Password visibility toggle** — eye icon on both login and signup
- **Inline error messages** — field-level feedback in red, no alerts
- **Loading states** — spinner during async operations

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo Go](https://expo.dev/go) app on your iOS or Android device **or** an iOS/Android simulator

---

## Setup

```bash
git clone <repo-url>
cd UserAuthApp
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `i` for iOS simulator / `a` for Android emulator.

---

## Project Structure

```
UserAuthApp/
├── App.js                          # Entry point — providers and navigation container
├── src/
│   ├── context/
│   │   └── AuthContext.js          # Auth state, login, signup, logout, session restore
│   ├── screens/
│   │   ├── LoginScreen.js          # Login form with password toggle
│   │   ├── SignupScreen.js         # Signup form with validation and password toggle
│   │   └── HomeScreen.js          # User info display and logout
│   ├── navigation/
│   │   ├── AuthStack.js            # Unauthenticated stack (Login + Signup)
│   │   ├── AppStack.js             # Authenticated stack (Home)
│   │   └── RootNavigator.js        # Switches stacks based on auth state
│   ├── utils/
│   │   └── validation.js           # Email regex, password length, required field checks
│   └── styles/
│       └── colors.js               # Shared color palette
```

---

## How It Works

### Auth State (`AuthContext`)

All auth logic lives in `AuthContext`. `useState` + React Context.

- `login(email, password)` — validates format, checks credentials against `AsyncStorage`, sets user state on success
- `signup(name, email, password)` — validates inputs, checks for duplicate email, saves user, auto-logs in
- `logout()` — removes the current session from `AsyncStorage`, clears user state
- `initializeAuth()` — called on mount, restores session if one exists

### Storage

Two `AsyncStorage` keys:

| Key                | Value                                                      |
| ------------------ | ---------------------------------------------------------- |
| `registered_users` | `[{ name, email, password }]` — all accounts               |
| `current_session`  | `{ name, email }` — active session, absent when logged out |

### Navigation

Two-stack pattern prevents back-button access after login/logout:

- **AuthStack** — Login and Signup screens (shown when `user` is null)
- **AppStack** — Home screen (shown when `user` exists)
- **RootNavigator** — listens to `user` state and switches stacks

---

## Validation Rules

| Field      | Rule                             |
| ---------- | -------------------------------- |
| Email      | Must match standard email format |
| Password   | Minimum 6 characters             |
| Name       | Cannot be empty                  |
| All fields | Required on submit               |

---

## Video Recording

https://cap.link/vjam36axdvdvhad
